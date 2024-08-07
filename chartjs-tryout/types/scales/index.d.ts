import { ScriptAbleScale, IScaleOptions, ITick, Scale } from '../core'
import { Color, IChartComponent, IFontSpec, TimeUnit } from '../core/interfaces'
import { DeepPartial } from '../interfaces'

export interface IGridLineOptions {
  /**
   * @default true
   */
  display: boolean
  borderColor: Color
  borderWidth: number
  /**
   * @default false
   */
  circular: boolean
  /**
   * @default 'rgba(0, 0, 0, 0.1)'
   */
  color: ScriptAbleScale<Color> | readonly Color[]
  /**
   * @default []
   */
  borderDash: number[]
  /**
   * @default 0
   */
  borderDashOffset: ScriptAbleScale<number>
  /**
   * @default 1
   */
  lineWidth: ScriptAbleScale<number> | readonly number[]

  /**
   * @default true
   */
  drawBorder: boolean
  /**
   * @default true
   */
  drawOnChartArea: boolean
  /**
   * @default true
   */
  drawTicks: boolean
  /**
   * @default 10
   */
  tickMarkLength: number
  /**
   * @default false
   */
  offsetGridLines: boolean
}

export interface ITickOptions {
  /**
   * Returns the string representation of the tick value as it should be displayed on the chart. See callback.
   */
  callback: (tickValue: any, index: number, ticks: ITick[]) => string
  /**
   * If true, show tick labels.
   * @default true
   */
  display: boolean
  /**
   * see Fonts
   */
  font: ScriptAbleScale<IFontSpec>
  /**
   * Sets the offset of the tick labels from the axis
   */
  padding: number
  /**
   * z-index of tick layer. Useful when ticks are drawn on chart area. Values <= 0 are drawn under datasets, > 0 on top.
   * @default 0
   */
  z: number

  major: {
    /**
     * If true, major ticks are generated. A major tick will affect autoskipping and major will be defined on ticks in the scriptable options context.
     * @default false
     */
    enabled: boolean
  }
}

export interface ICartesianScaleOptions extends IScaleOptions {
  /**
   * Position of the axis.
   */
  position: 'left' | 'top' | 'right' | 'bottom' | 'center' | { [scale: string]: number }
  /**
   * 	Which type of axis this is. Possible values are: 'x', 'y'. If not set, this is inferred from the first character of the ID which should be 'x' or 'y'.
   */
  axis: 'x' | 'y'

  /**
   * User defined minimum value for the scale, overrides minimum value from data.
   */
  min: number

  /**
   * User defined maximum value for the scale, overrides maximum value from data.
   */
  max: number

  /**
   * 	If true, extra space is added to the both edges and the axis is scaled to fit into the chart area. This is set to true for a bar chart by default.
   * @default false
   */
  offset: boolean

  gridLines: IGridLineOptions

  scaleLabel: {
    display: boolean
    labelString: string
    font: IFontSpec
    padding: {
      top: number
      bottom: number
    }
  }

  ticks: ITickOptions & {
    /**
     * The number of ticks to examine when deciding how many labels will fit. Setting a smaller value will be faster, but may be less accurate when there is large variability in label length.
     * @default ticks.length
     */
    sampleSize: number
    /**
     * 	If true, automatically calculates how many labels can be shown and hides labels accordingly. Labels will be rotated up to maxRotation before skipping any. Turn autoSkip off to show all labels no matter what.
     * @default true
     */
    autoSkip: boolean
    /**
     * Padding between the ticks on the horizontal axis when autoSkip is enabled.
     * @default 0
     */
    autoSkipPadding: number
    /**
     * Distance in pixels to offset the label from the centre point of the tick (in the x direction for the x axis, and the y direction for the y axis). Note: this can cause labels at the edges to be cropped by the edge of the canvas
     * @default 0
     */
    labelOffset: number

    /**
     * Minimum rotation for tick labels. Note: Only applicable to horizontal scales.
     * @default 0
     */
    minRotation: number
    /**
     * Maximum rotation for tick labels when rotating to condense labels. Note: Rotation doesn't occur until necessary. Note: Only applicable to horizontal scales.
     * @default 50
     */
    maxRotation: number
    /**
     * Flips tick labels around axis, displaying the labels inside the chart instead of outside. Note: Only applicable to vertical scales.
     * @default false
     */
    mirror: boolean
    /**
     * 	Padding between the tick label and the axis. When set on a vertical axis, this applies in the horizontal (X) direction. When set on a horizontal axis, this applies in the vertical (Y) direction.
     * @default 0
     */
    padding: number
  }
}

export type ICategoryScaleOptions = ICartesianScaleOptions & {
  min: string | number
  max: string | number
  labels: string[]
}

export interface CategoryScale<O extends ICategoryScaleOptions = ICategoryScaleOptions> extends Scale<O> {}
export const CategoryScale: IChartComponent & {
  prototype: CategoryScale
  new <O extends ICategoryScaleOptions = ICategoryScaleOptions>(cfg: any): CategoryScale<O>
}

export type ILinearScaleOptions = IScaleOptions & {
  stacked?: boolean

  /**
   *	if true, scale will include 0 if it is not already included.
   * @default true
   */
  beginAtZero: boolean

  /**
   * Adjustment used when calculating the maximum data value.
   * @see https://www.chartjs.org/docs/next/axes/cartesian/linear#axis-range-settings
   */
  suggestedMin?: number
  /**
   * Adjustment used when calculating the minimum data value.
   * @see https://www.chartjs.org/docs/next/axes/cartesian/linear#axis-range-settings
   */
  suggestedMax?: number

  ticks: {
    /**
     * The Intl.NumberFormat options used by the default label formatter
     */
    format: Intl.NumberFormatOptions

    /**
     * Maximum number of ticks and gridlines to show.
     * @default 11
     */
    maxTicksLimit: number
    /**
     * if defined and stepSize is not specified, the step size will be rounded to this many decimal places.
     */
    precision: number

    /**
     * User defined fixed step size for the scale
     * @see https://www.chartjs.org/docs/next/axes/cartesian/linear#step-size
     */
    stepSize: number
  }
}

export interface LinearScale<O extends ILinearScaleOptions = ILinearScaleOptions> extends Scale<O> {}
export const LinearScale: IChartComponent & {
  prototype: LinearScale
  new <O extends ILinearScaleOptions = ILinearScaleOptions>(cfg: any): LinearScale<O>
}

export type ILogarithmicScaleOptions = ICartesianScaleOptions & {
  stacked?: boolean

  ticks: {
    /**
     * The Intl.NumberFormat options used by the default label formatter
     */
    format: Intl.NumberFormatOptions
  }
}

export interface LogarithmicScale<O extends ILogarithmicScaleOptions = ILogarithmicScaleOptions> extends Scale<O> {}
export const LogarithmicScale: IChartComponent & {
  prototype: LogarithmicScale
  new <O extends ILogarithmicScaleOptions = ILogarithmicScaleOptions>(cfg: any): LogarithmicScale<O>
}

export type ITimeScaleOptions = ICartesianScaleOptions & {
  /**
   * Scale boundary strategy (bypassed by min/max time options)
   * - `data`: make sure data are fully visible, ticks outside are removed
   * - `ticks`: make sure ticks are fully visible, data outside are truncated
   * @see https://www.chartjs.org/docs/next/axes/cartesian/time#scale-bounds
   * @since 2.7.0
   * @default 'data'
   */
  bounds: 'ticks' | 'data'

  /**
   * options for creating a new adapter instance
   */
  adapters: {
    date: any
  }

  time: {
    /**
     * Custom parser for dates.
     * @see https://www.chartjs.org/docs/next/axes/cartesian/time#parser
     */
    parser: string | ((v: any) => number)
    /**
     * If defined, dates will be rounded to the start of this unit. See Time Units below for the allowed units.
     */
    round: false | TimeUnit
    /**
     * If true and the unit is set to 'week', then the first day of the week will be Monday. Otherwise, it will be Sunday.
     * @default false
     */
    isoWeekday: false | string
    /**
     * 	Sets how different time units are displayed.
     * @see https://www.chartjs.org/docs/next/axes/cartesian/time#display-formats
     */
    displayFormats: {
      [key: string]: string
    }
    /**
     * If defined, will force the unit to be a certain type. See Time Units section below for details.
     * @default false
     */
    unit: false | TimeUnit

    /**
     * The number of units between grid lines.
     * @default 1
     */
    stepSize: number
    /**
     * The minimum display format to be used for a time unit.
     * @default 'millisecond'
     */
    minUnit: TimeUnit
  }

  ticks: {
    /**
     * Ticks generation input values:
     * - 'auto': generates "optimal" ticks based on scale size and time options.
     * - 'data': generates ticks from data (including labels from data {t|x|y} objects).
     * - 'labels': generates ticks from user given `data.labels` values ONLY.
     * @see https://github.com/chartjs/Chart.js/pull/4507
     * @since 2.7.0
     * @default 'auto'
     * @see https://www.chartjs.org/docs/next/axes/cartesian/time#ticks-source
     */
    source: 'labels' | 'auto' | 'data'
  }
}

export interface TimeScale<O extends ITimeScaleOptions = ITimeScaleOptions> extends Scale<O> {
  getDataTimestamps(): number[]
  getLabelTimestamps(): string[]
  normalize(values: number[]): number[]
}

export const TimeScale: IChartComponent & {
  prototype: TimeScale
  new <O extends ITimeScaleOptions = ITimeScaleOptions>(cfg: any): TimeScale<O>
}

export interface TimeSeriesScale<O extends ITimeScaleOptions = ITimeScaleOptions> extends TimeScale<O> {}
export const TimeSeriesScale: IChartComponent & {
  prototype: TimeSeriesScale
  new <O extends ITimeScaleOptions = ITimeScaleOptions>(cfg: any): TimeSeriesScale<O>
}

export type IRadialLinearScaleOptions = IScaleOptions & {
  animate: boolean

  angleLines: {
    /**
     * if true, angle lines are shown.
     * @default true
     */
    display: boolean
    /**
     * Color of angled lines.
     * @default 'rgba(0, 0, 0, 0.1)'
     */
    color: ScriptAbleScale<Color>
    /**
     * Width of angled lines.
     * @default 1
     */
    lineWidth: ScriptAbleScale<number>
    /**
     * Length and spacing of dashes on angled lines. See MDN.
     * @default []
     */
    borderDash: ScriptAbleScale<number[]>
    /**
     * Offset for line dashes. See MDN.
     * @default 0
     */
    borderDashOffset: ScriptAbleScale<number>
  }

  /**
   * if true, scale will include 0 if it is not already included.
   * @default false
   */
  beginAtZero: boolean

  gridLines: IGridLineOptions

  /**
   * User defined minimum number for the scale, overrides minimum value from data.
   */
  min: number
  /**
   * User defined maximum number for the scale, overrides maximum value from data.
   */
  max: number

  pointLabels: {
    /**
     * if true, point labels are shown.
     * @default true
     */
    display: boolean
    /**
     * @see https://www.chartjs.org/docs/next/axes/general/fonts.md
     */
    font: ScriptAbleScale<IFontSpec>

    /**
     * Callback function to transform data labels to point labels. The default implementation simply returns the current string.
     * @default true
     */
    callback: (label: string) => string
  }

  /**
   * Adjustment used when calculating the maximum data value.
   */
  suggestedMax: number
  /**
   * Adjustment used when calculating the minimum data value.
   */
  suggestedMin: number

  ticks: ITickOptions & {
    /**
     * Color of label backdrops.
     * @default 'rgba(255, 255, 255, 0.75)'
     */
    backdropColor: ScriptAbleScale<Color>
    /**
     * Horizontal padding of label backdrop.
     * @default 2
     */
    backdropPaddingX: number
    /**
     * Vertical padding of label backdrop.
     * @default 2
     */
    backdropPaddingY: number

    /**
     * The Intl.NumberFormat options used by the default label formatter
     */
    format: Intl.NumberFormatOptions

    /**
     * Maximum number of ticks and gridlines to show.
     * @default 11
     */
    maxTicksLimit: number

    /**
     * if defined and stepSize is not specified, the step size will be rounded to this many decimal places.
     */
    precision: number

    /**
     * User defined fixed step size for the scale.
     */
    stepSize: number

    /**
     * If true, draw a background behind the tick labels.
     * @default true
     */
    showLabelBackdrop: ScriptAbleScale<boolean>
  }
}

export interface RadialLinearScale<O extends IRadialLinearScaleOptions = IRadialLinearScaleOptions> extends Scale<O> {
  setCenterPoint(leftMovement: number, rightMovement: number, topMovement: number, bottomMovement: number): void
  getIndexAngle(index: number): number
  getDistanceFromCenterForValue(value: number): number
  getValueForDistanceFromCenter(distance: number): number
  getPointPosition(index: number, distanceFromCenter: number): { x: number; y: number; angle: number }
  getPointPositionForValue(index: number, value: number): { x: number; y: number; angle: number }
  getBasePosition(index: number): { x: number; y: number; angle: number }
}
export const RadialLinearScale: IChartComponent & {
  prototype: RadialLinearScale
  new <O extends IRadialLinearScaleOptions = IRadialLinearScaleOptions>(cfg: any): RadialLinearScale<O>
}

export interface ILinearScaleType extends DeepPartial<ILinearScaleOptions> {
  type: 'linear'
}
export interface ILogarithmicScaleType extends DeepPartial<ILogarithmicScaleOptions> {
  type: 'logarithmic'
}
export interface ICategoryScaleType extends DeepPartial<ICategoryScaleOptions> {
  type: 'category'
}
export interface IRadialLinearScaleType extends DeepPartial<IRadialLinearScaleOptions> {
  type: 'radialLinear'
}
export interface ITimeScaleType extends DeepPartial<ITimeScaleOptions> {
  type: 'time'
}
export interface ITimeSeriesScaleType extends DeepPartial<ITimeScaleOptions> {
  type: 'timeseries'
}

export interface IScaleChartOptions {
  scales: {
    [key: string]: { type: string } & DeepPartial<IScaleOptions>
  }
}
