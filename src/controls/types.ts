export type Keys =
  | 'forward'
  | 'backward'
  | 'left'
  | 'right'
  | 'space'
  | 'shift'
  | 'rollLeft'
  | 'rollRight'
  | 'dive'
  | 'rise'

export interface Input {
  keys: Record<Keys, boolean>
}
