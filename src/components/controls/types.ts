export type KeysNames =
  | 'forward'
  | 'backward'
  | 'strafeLeft'
  | 'strafeRight'
  | 'space'
  | 'shift'
  | 'rollLeft'
  | 'rollRight'
  | 'dive'
  | 'rise'
  | 'yawRight'
  | 'yawLeft'

export type InputKeys = Record<KeysNames, number>
export interface Input {
  keys: InputKeys
}
