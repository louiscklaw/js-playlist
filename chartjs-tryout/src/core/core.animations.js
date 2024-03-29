import animator from './core.animator'
import Animation from './core.animation'
import defaults from './core.defaults'
import { noop, isObject } from '../helpers/helpers.core'

const numbers = ['x', 'y', 'borderWidth', 'radius', 'tension']
const colors = ['borderColor', 'backgroundColor']

defaults.set('animation', {
  // Plain properties can be overridden in each object
  duration: 1000,
  easing: 'easeOutQuart',
  onProgress: noop,
  onComplete: noop,

  // Property sets
  colors: {
    type: 'color',
    properties: colors,
  },
  numbers: {
    type: 'number',
    properties: numbers,
  },

  // Update modes. These are overrides / additions to the above animations.
  active: {
    duration: 400,
  },
  resize: {
    duration: 0,
  },
  show: {
    colors: {
      type: 'color',
      properties: colors,
      from: 'transparent',
    },
    visible: {
      type: 'boolean',
      duration: 0, // show immediately
    },
  },
  hide: {
    colors: {
      type: 'color',
      properties: colors,
      to: 'transparent',
    },
    visible: {
      type: 'boolean',
      easing: 'easeInExpo', // for keeping the dataset visible almost all the way through the animation
    },
  },
})

function copyOptions(target, values) {
  const oldOpts = target.options
  const newOpts = values.options
  if (!oldOpts || !newOpts || newOpts.$shared) {
    return
  }
  if (oldOpts.$shared) {
    target.options = Object.assign({}, oldOpts, newOpts, { $shared: false })
  } else {
    Object.assign(oldOpts, newOpts)
  }
  delete values.options
}

function extensibleConfig(animations) {
  const result = {}
  Object.keys(animations).forEach(key => {
    const value = animations[key]
    if (!isObject(value)) {
      result[key] = value
    }
  })
  return result
}

export default class Animations {
  constructor(chart, animations) {
    this._chart = chart
    this._properties = new Map()
    this.configure(animations)
  }

  configure(animations) {
    if (!isObject(animations)) {
      return
    }

    const animatedProps = this._properties
    const animDefaults = extensibleConfig(animations)

    Object.keys(animations).forEach(key => {
      const cfg = animations[key]
      if (!isObject(cfg)) {
        return
      }
      ;(cfg.properties || [key]).forEach(prop => {
        // Can have only one config per animation.
        if (!animatedProps.has(prop)) {
          animatedProps.set(prop, Object.assign({}, animDefaults, cfg))
        } else if (prop === key) {
          // Single property targetting config wins over multi-targetting.
          animatedProps.set(prop, Object.assign({}, animatedProps.get(prop), cfg))
        }
      })
    })
  }

  /**
   * Utility to handle animation of `options`.
   * This should not be called, when animating $shared options to $shared new options.
   * @private
   * @todo if new options are $shared, target.options should be replaced with those new shared
   *  options after all animations have completed
   */
  _animateOptions(target, values) {
    const newOptions = values.options
    let animations = []

    if (!newOptions) {
      return animations
    }
    let options = target.options
    if (options) {
      if (options.$shared) {
        // If the current / old options are $shared, meaning other elements are
        // using the same options, we need to clone to become unique.
        target.options = options = Object.assign({}, options, { $shared: false, $animations: {} })
      }
      animations = this._createAnimations(options, newOptions)
    } else {
      target.options = newOptions
    }
    return animations
  }

  /**
   * @private
   */
  _createAnimations(target, values) {
    const animatedProps = this._properties
    const animations = []
    const running = target.$animations || (target.$animations = {})
    const props = Object.keys(values)
    const date = Date.now()
    let i

    for (i = props.length - 1; i >= 0; --i) {
      const prop = props[i]
      if (prop.charAt(0) === '$') {
        continue
      }

      if (prop === 'options') {
        animations.push(...this._animateOptions(target, values))
        continue
      }
      const value = values[prop]
      let animation = running[prop]
      const cfg = animatedProps.get(prop)

      if (animation) {
        if (cfg && animation.active()) {
          // There is an existing active animation, let's update that
          animation.update(cfg, value, date)
          continue
        } else {
          animation.cancel()
        }
      }
      if (!cfg || !cfg.duration) {
        // not animated, set directly to new value
        target[prop] = value
        continue
      }

      running[prop] = animation = new Animation(cfg, target, prop, value)
      animations.push(animation)
    }
    return animations
  }

  /**
   * Update `target` properties to new values, using configured animations
   * @param {object} target - object to update
   * @param {object} values - new target properties
   * @returns {boolean|undefined} - `true` if animations were started
   **/
  update(target, values) {
    if (this._properties.size === 0) {
      // Nothing is animated, just apply the new values.
      // Options can be shared, need to account for that.
      copyOptions(target, values)
      // copyOptions removes the `options` from `values`,
      // unless it can be directly assigned.
      Object.assign(target, values)
      return
    }

    const animations = this._createAnimations(target, values)

    if (animations.length) {
      animator.add(this._chart, animations)
      return true
    }
  }
}
