export { parse } from './parser.js'
export { decode } from './decoder.js'
export const objectify = data =>
  Object.fromEntries(
    [
      'mode',
      'ver',
      'map',
      'name',
      'hash',
      'great',
      'ok',
      'meh',
      'geki',
      'katu',
      'miss',
      'score',
      'combo',
      'perfect',
      'mods',
      'lifeBar',
      'time',
      'length',
      'data',
      'id',
      'tp'
    ].map((key, index) => [key, data[index]])
  )
