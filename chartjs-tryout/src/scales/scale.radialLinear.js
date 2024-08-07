import defaults from '../core/core.defaults'
import { _longestText } from '../helpers/helpers.canvas'
import { isNumber, toDegrees, toRadians, _normalizeAngle } from '../helpers/helpers.math'
import LinearScaleBase from './scale.linearbase'
import Ticks from '../core/core.ticks'
import { valueOrDefault, isArray, isFinite, callback as callCallback, isNullOrUndef } from '../helpers/helpers.core'
import { toFont, resolve } from '../helpers/helpers.options'

function getTickBackdropHeight(opts) {
  const tickOpts = opts.ticks

  if (tickOpts.display && opts.display) {
    return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + tickOpts.backdropPaddingY * 2
  }
  return 0
}

function measureLabelSize(ctx, lineHeight, label) {
  if (isArray(label)) {
    return {
      w: _longestText(ctx, ctx.font, label),
      h: label.length * lineHeight,
    }
  }

  return {
    w: ctx.measureText(label).width,
    h: lineHeight,
  }
}

function determineLimits(angle, pos, size, min, max) {
  if (angle === min || angle === max) {
    return {
      start: pos - size / 2,
      end: pos + size / 2,
    }
  } else if (angle < min || angle > max) {
    return {
      start: pos - size,
      end: pos,
    }
  }

  return {
    start: pos,
    end: pos + size,
  }
}

/**
 * Helper function to fit a radial linear scale with point labels
 */
function fitWithPointLabels(scale) {
  // Right, this is really confusing and there is a lot of maths going on here
  // The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
  //
  // Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
  //
  // Solution:
  //
  // We assume the radius of the polygon is half the size of the canvas at first
  // at each index we check if the text overlaps.
  //
  // Where it does, we store that angle and that index.
  //
  // After finding the largest index and angle we calculate how much we need to remove
  // from the shape radius to move the point inwards by that x.
  //
  // We average the left and right distances to get the maximum shape radius that can fit in the box
  // along with labels.
  //
  // Once we have that, we can find the centre point for the chart, by taking the x text protrusion
  // on each side, removing that from the size, halving it and adding the left x protrusion width.
  //
  // This will mean we have a shape fitted to the canvas, as large as it can be with the labels
  // and position it in the most space efficient manner
  //
  // https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif

  // Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
  // Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
  const furthestLimits = {
    l: 0,
    r: scale.width,
    t: 0,
    b: scale.height - scale.paddingTop,
  }
  const furthestAngles = {}
  let i, textSize, pointPosition

  scale._pointLabelSizes = []

  const valueCount = scale.chart.data.labels.length
  for (i = 0; i < valueCount; i++) {
    pointPosition = scale.getPointPosition(i, scale.drawingArea + 5)

    const context = {
      chart: scale.chart,
      scale,
      index: i,
      label: scale.pointLabels[i],
    }
    const plFont = toFont(resolve([scale.options.pointLabels.font], context, i), scale.chart.options.font)
    scale.ctx.font = plFont.string
    textSize = measureLabelSize(scale.ctx, plFont.lineHeight, scale.pointLabels[i])
    scale._pointLabelSizes[i] = textSize

    // Add quarter circle to make degree 0 mean top of circle
    const angleRadians = scale.getIndexAngle(i)
    const angle = toDegrees(angleRadians)
    const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180)
    const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270)

    if (hLimits.start < furthestLimits.l) {
      furthestLimits.l = hLimits.start
      furthestAngles.l = angleRadians
    }

    if (hLimits.end > furthestLimits.r) {
      furthestLimits.r = hLimits.end
      furthestAngles.r = angleRadians
    }

    if (vLimits.start < furthestLimits.t) {
      furthestLimits.t = vLimits.start
      furthestAngles.t = angleRadians
    }

    if (vLimits.end > furthestLimits.b) {
      furthestLimits.b = vLimits.end
      furthestAngles.b = angleRadians
    }
  }

  scale._setReductions(scale.drawingArea, furthestLimits, furthestAngles)
}

function getTextAlignForAngle(angle) {
  if (angle === 0 || angle === 180) {
    return 'center'
  } else if (angle < 180) {
    return 'left'
  }

  return 'right'
}

function fillText(ctx, text, position, lineHeight) {
  let y = position.y + lineHeight / 2
  let i, ilen

  if (isArray(text)) {
    for (i = 0, ilen = text.length; i < ilen; ++i) {
      ctx.fillText(text[i], position.x, y)
      y += lineHeight
    }
  } else {
    ctx.fillText(text, position.x, y)
  }
}

function adjustPointPositionForLabelHeight(angle, textSize, position) {
  if (angle === 90 || angle === 270) {
    position.y -= textSize.h / 2
  } else if (angle > 270 || angle < 90) {
    position.y -= textSize.h
  }
}

function drawPointLabels(scale) {
  const ctx = scale.ctx
  const opts = scale.options
  const pointLabelOpts = opts.pointLabels
  const tickBackdropHeight = getTickBackdropHeight(opts)
  const outerDistance = scale.getDistanceFromCenterForValue(opts.ticks.reverse ? scale.min : scale.max)

  ctx.save()

  ctx.textBaseline = 'middle'

  for (let i = scale.chart.data.labels.length - 1; i >= 0; i--) {
    // Extra pixels out for some label spacing
    const extra = i === 0 ? tickBackdropHeight / 2 : 0
    const pointLabelPosition = scale.getPointPosition(i, outerDistance + extra + 5)

    const context = {
      chart: scale.chart,
      scale,
      index: i,
      label: scale.pointLabels[i],
    }
    const plFont = toFont(resolve([pointLabelOpts.font], context, i), scale.chart.options.font)
    ctx.font = plFont.string
    ctx.fillStyle = plFont.color

    const angle = toDegrees(scale.getIndexAngle(i))
    ctx.textAlign = getTextAlignForAngle(angle)
    adjustPointPositionForLabelHeight(angle, scale._pointLabelSizes[i], pointLabelPosition)
    fillText(ctx, scale.pointLabels[i], pointLabelPosition, plFont.lineHeight)
  }
  ctx.restore()
}

function drawRadiusLine(scale, gridLineOpts, radius, index) {
  const ctx = scale.ctx
  const circular = gridLineOpts.circular
  const valueCount = scale.chart.data.labels.length

  const context = {
    chart: scale.chart,
    scale,
    index,
    tick: scale.ticks[index],
  }
  const lineColor = resolve([gridLineOpts.color], context, index - 1)
  const lineWidth = resolve([gridLineOpts.lineWidth], context, index - 1)
  let pointPosition

  if ((!circular && !valueCount) || !lineColor || !lineWidth) {
    return
  }

  ctx.save()
  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth
  if (ctx.setLineDash) {
    ctx.setLineDash(resolve([gridLineOpts.borderDash, []], context))
    ctx.lineDashOffset = resolve([gridLineOpts.borderDashOffset], context, index - 1)
  }

  ctx.beginPath()
  if (circular) {
    // Draw circular arcs between the points
    ctx.arc(scale.xCenter, scale.yCenter, radius, 0, Math.PI * 2)
  } else {
    // Draw straight lines connecting each index
    pointPosition = scale.getPointPosition(0, radius)
    ctx.moveTo(pointPosition.x, pointPosition.y)

    for (let i = 1; i < valueCount; i++) {
      pointPosition = scale.getPointPosition(i, radius)
      ctx.lineTo(pointPosition.x, pointPosition.y)
    }
  }
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}

function numberOrZero(param) {
  return isNumber(param) ? param : 0
}

export default class RadialLinearScale extends LinearScaleBase {
  constructor(cfg) {
    super(cfg)

    /** @type {number} */
    this.xCenter = undefined
    /** @type {number} */
    this.yCenter = undefined
    /** @type {number} */
    this.drawingArea = undefined
    /** @type {string[]} */
    this.pointLabels = []
  }

  init(options) {
    super.init(options)
    this.axis = 'r'
  }

  setDimensions() {
    const me = this

    // Set the unconstrained dimension before label rotation
    me.width = me.maxWidth
    me.height = me.maxHeight
    me.paddingTop = getTickBackdropHeight(me.options) / 2
    me.xCenter = Math.floor(me.width / 2)
    me.yCenter = Math.floor((me.height - me.paddingTop) / 2)
    me.drawingArea = Math.min(me.height - me.paddingTop, me.width) / 2
  }

  determineDataLimits() {
    const me = this
    const { min, max } = me.getMinMax(false)

    me.min = isFinite(min) && !isNaN(min) ? min : 0
    me.max = isFinite(max) && !isNaN(max) ? max : 0

    // Common base implementation to handle min, max, beginAtZero
    me.handleTickRangeOptions()
  }

  /**
   * Returns the maximum number of ticks based on the scale dimension
   * @protected
   */
  computeTickLimit() {
    return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options))
  }

  generateTickLabels(ticks) {
    const me = this

    LinearScaleBase.prototype.generateTickLabels.call(me, ticks)

    // Point labels
    me.pointLabels = me.chart.data.labels.map((value, index) => {
      const label = callCallback(me.options.pointLabels.callback, [value, index], me)
      return label || label === 0 ? label : ''
    })
  }

  fit() {
    const me = this
    const opts = me.options

    if (opts.display && opts.pointLabels.display) {
      fitWithPointLabels(me)
    } else {
      me.setCenterPoint(0, 0, 0, 0)
    }
  }

  /**
   * Set radius reductions and determine new radius and center point
   * @private
   */
  _setReductions(largestPossibleRadius, furthestLimits, furthestAngles) {
    const me = this
    let radiusReductionLeft = furthestLimits.l / Math.sin(furthestAngles.l)
    let radiusReductionRight = Math.max(furthestLimits.r - me.width, 0) / Math.sin(furthestAngles.r)
    let radiusReductionTop = -furthestLimits.t / Math.cos(furthestAngles.t)
    let radiusReductionBottom = -Math.max(furthestLimits.b - (me.height - me.paddingTop), 0) / Math.cos(furthestAngles.b)

    radiusReductionLeft = numberOrZero(radiusReductionLeft)
    radiusReductionRight = numberOrZero(radiusReductionRight)
    radiusReductionTop = numberOrZero(radiusReductionTop)
    radiusReductionBottom = numberOrZero(radiusReductionBottom)

    me.drawingArea = Math.min(
      Math.floor(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2),
      Math.floor(largestPossibleRadius - (radiusReductionTop + radiusReductionBottom) / 2),
    )
    me.setCenterPoint(radiusReductionLeft, radiusReductionRight, radiusReductionTop, radiusReductionBottom)
  }

  setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
    const me = this
    const maxRight = me.width - rightMovement - me.drawingArea
    const maxLeft = leftMovement + me.drawingArea
    const maxTop = topMovement + me.drawingArea
    const maxBottom = me.height - me.paddingTop - bottomMovement - me.drawingArea

    me.xCenter = Math.floor((maxLeft + maxRight) / 2 + me.left)
    me.yCenter = Math.floor((maxTop + maxBottom) / 2 + me.top + me.paddingTop)
  }

  getIndexAngle(index) {
    const chart = this.chart
    const angleMultiplier = (Math.PI * 2) / chart.data.labels.length
    const options = chart.options || {}
    const startAngle = options.startAngle || 0

    return _normalizeAngle(index * angleMultiplier + toRadians(startAngle))
  }

  getDistanceFromCenterForValue(value) {
    const me = this

    if (isNullOrUndef(value)) {
      return NaN
    }

    // Take into account half font size + the yPadding of the top value
    const scalingFactor = me.drawingArea / (me.max - me.min)
    if (me.options.reverse) {
      return (me.max - value) * scalingFactor
    }
    return (value - me.min) * scalingFactor
  }

  getValueForDistanceFromCenter(distance) {
    if (isNullOrUndef(distance)) {
      return NaN
    }

    const me = this
    const scaledDistance = distance / (me.drawingArea / (me.max - me.min))
    return me.options.reverse ? me.max - scaledDistance : me.min + scaledDistance
  }

  getPointPosition(index, distanceFromCenter) {
    const me = this
    const angle = me.getIndexAngle(index) - Math.PI / 2
    return {
      x: Math.cos(angle) * distanceFromCenter + me.xCenter,
      y: Math.sin(angle) * distanceFromCenter + me.yCenter,
      angle,
    }
  }

  getPointPositionForValue(index, value) {
    return this.getPointPosition(index, this.getDistanceFromCenterForValue(value))
  }

  getBasePosition(index) {
    return this.getPointPositionForValue(index || 0, this.getBaseValue())
  }

  /**
   * @protected
   */
  drawGrid() {
    const me = this
    const ctx = me.ctx
    const opts = me.options
    const gridLineOpts = opts.gridLines
    const angleLineOpts = opts.angleLines
    let i, offset, position

    if (opts.pointLabels.display) {
      drawPointLabels(me)
    }

    if (gridLineOpts.display) {
      me.ticks.forEach((tick, index) => {
        if (index !== 0) {
          offset = me.getDistanceFromCenterForValue(me.ticks[index].value)
          drawRadiusLine(me, gridLineOpts, offset, index)
        }
      })
    }

    if (angleLineOpts.display) {
      ctx.save()

      for (i = me.chart.data.labels.length - 1; i >= 0; i--) {
        const context = {
          chart: me.chart,
          scale: me,
          index: i,
          label: me.pointLabels[i],
        }
        const lineWidth = resolve([angleLineOpts.lineWidth, gridLineOpts.lineWidth], context, i)
        const color = resolve([angleLineOpts.color, gridLineOpts.color], context, i)

        if (!lineWidth || !color) {
          continue
        }

        ctx.lineWidth = lineWidth
        ctx.strokeStyle = color

        if (ctx.setLineDash) {
          ctx.setLineDash(resolve([angleLineOpts.borderDash, gridLineOpts.borderDash, []], context))
          ctx.lineDashOffset = resolve([angleLineOpts.borderDashOffset, gridLineOpts.borderDashOffset, 0.0], context, i)
        }

        offset = me.getDistanceFromCenterForValue(opts.ticks.reverse ? me.min : me.max)
        position = me.getPointPosition(i, offset)
        ctx.beginPath()
        ctx.moveTo(me.xCenter, me.yCenter)
        ctx.lineTo(position.x, position.y)
        ctx.stroke()
      }

      ctx.restore()
    }
  }

  /**
   * @protected
   */
  drawLabels() {
    const me = this
    const ctx = me.ctx
    const opts = me.options
    const tickOpts = opts.ticks

    if (!tickOpts.display) {
      return
    }

    const startAngle = me.getIndexAngle(0)
    let offset, width

    ctx.save()
    ctx.translate(me.xCenter, me.yCenter)
    ctx.rotate(startAngle)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    me.ticks.forEach((tick, index) => {
      const context = {
        chart: me.chart,
        scale: me,
        index,
        tick,
      }

      if (index === 0 && !opts.reverse) {
        return
      }

      const tickFont = me._resolveTickFontOptions(index)
      ctx.font = tickFont.string
      offset = me.getDistanceFromCenterForValue(me.ticks[index].value)

      const showLabelBackdrop = resolve([tickOpts.showLabelBackdrop], context, index)

      if (showLabelBackdrop) {
        width = ctx.measureText(tick.label).width
        ctx.fillStyle = resolve([tickOpts.backdropColor], context, index)

        ctx.fillRect(
          -width / 2 - tickOpts.backdropPaddingX,
          -offset - tickFont.size / 2 - tickOpts.backdropPaddingY,
          width + tickOpts.backdropPaddingX * 2,
          tickFont.size + tickOpts.backdropPaddingY * 2,
        )
      }

      ctx.fillStyle = tickFont.color
      ctx.fillText(tick.label, 0, -offset)
    })

    ctx.restore()
  }

  /**
   * @protected
   */
  drawTitle() {}
}

RadialLinearScale.id = 'radialLinear'

/**
 * @type {any}
 */
RadialLinearScale.defaults = {
  display: true,

  // Boolean - Whether to animate scaling the chart from the centre
  animate: true,
  position: 'chartArea',

  angleLines: {
    display: true,
    color: 'rgba(0,0,0,0.1)',
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0.0,
  },

  gridLines: {
    circular: false,
  },

  // label settings
  ticks: {
    // Boolean - Show a backdrop to the scale label
    showLabelBackdrop: true,

    // String - The colour of the label backdrop
    backdropColor: 'rgba(255,255,255,0.75)',

    // Number - The backdrop padding above & below the label in pixels
    backdropPaddingY: 2,

    // Number - The backdrop padding to the side of the label in pixels
    backdropPaddingX: 2,

    callback: Ticks.formatters.numeric,
  },

  pointLabels: {
    // Boolean - if true, show point labels
    display: true,

    // Number - Point label font size in pixels
    font: {
      size: 10,
    },

    // Function - Used to convert point labels
    callback(label) {
      return label
    },
  },
}
