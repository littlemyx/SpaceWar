export type KeysNames =
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

export type InputKeys = Record<KeysNames, number>
export interface Input {
  keys: InputKeys
}
