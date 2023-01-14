import defaults from '../core/core.defaults'
import { isArray, isObject, valueOrDefault } from './helpers.core'
import { toFontString } from './helpers.canvas'

/**
 * @alias Chart.helpers.options
 * @namespace
 */
/**
 * Converts the given line height `value` in pixels for a specific font `size`.
 * @param {number|string} value - The lineHeight to parse (eg. 1.6, '14px', '75%', '1.6em').
 * @param {number} size - The font size (in pixels) used to resolve relative `value`.
 * @returns {number} The effective line height in pixels (size * 1.2 if value is invalid).
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/line-height
 * @since 2.7.0
 */
export function toLineHeight(value, size) {
  const matches = ('' + value).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/)
  if (!matches || matches[1] === 'normal') {
    return size * 1.2
  }

  value = +matches[2]

  switch (matches[3]) {
    case 'px':
      return value
    case '%':
      value /= 100
      break
    default:
      break
  }

  return size * value
}

/**
 * Converts the given value into a padding object with pre-computed width/height.
 * @param {number|object} value - If a number, set the value to all TRBL component,
 *  else, if an object, use defined properties and sets undefined ones to 0.
 * @returns {object} The padding values (top, right, bottom, left, width, height)
 * @since 2.7.0
 */
export function toPadding(value) {
  let t, r, b, l

  if (isObject(value)) {
    t = +value.top || 0
    r = +value.right || 0
    b = +value.bottom || 0
    l = +value.left || 0
  } else {
    t = r = b = l = +value || 0
  }

  return {
    top: t,
    right: r,
    bottom: b,
    left: l,
    height: t + b,
    width: l + r,
  }
}

/**
 * Parses font options and returns the font object.
 * @param {object} options - A object that contains font options to be parsed.
 * @param {object} [fallback] - A object that contains fallback font options.
 * @return {object} The font object.
 * @private
 */
export function toFont(options, fallback) {
  options = options || {}
  fallback = fallback || defaults.font

  let size = valueOrDefault(options.size, fallback.size)

  if (typeof size === 'string') {
    size = parseInt(size, 10)
  }

  const font = {
    color: valueOrDefault(options.color, fallback.color),
    family: valueOrDefault(options.family, fallback.family),
    lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
    lineWidth: valueOrDefault(options.lineWidth, fallback.lineWidth),
    size,
    style: valueOrDefault(options.style, fallback.style),
    weight: valueOrDefault(options.weight, fallback.weight),
    strokeStyle: valueOrDefault(options.strokeStyle, fallback.strokeStyle),
    string: '',
  }

  font.string = toFontString(font)
  return font
}

/**
 * Evaluates the given `inputs` sequentially and returns the first defined value.
 * @param {Array} inputs - An array of values, falling back to the last value.
 * @param {object} [context] - If defined and the current value is a function, the value
 * is called with `context` as first argument and the result becomes the new input.
 * @param {number} [index] - If defined and the current value is an array, the value
 * at `index` become the new input.
 * @param {object} [info] - object to return information about resolution in
 * @param {boolean} [info.cacheable] - Will be set to `false` if option is not cacheable.
 * @since 2.7.0
 */
export function resolve(inputs, context, index, info) {
  let cacheable = true
  let i, ilen, value

  for (i = 0, ilen = inputs.length; i < ilen; ++i) {
    value = inputs[i]
    if (value === undefined) {
      continue
    }
    if (context !== undefined && typeof value === 'function') {
      value = value(context)
      cacheable = false
    }
    if (index !== undefined && isArray(value)) {
      value = value[index % value.length]
      cacheable = false
    }
    if (value !== undefined) {
      if (info && !cacheable) {
        info.cacheable = false
      }
      return value
    }
  }
}
