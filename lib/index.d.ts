/**
 * @param replay A buffer containing the replay data.
 * @param parseInfoOnly If true, only parse info and skip replay data.
 * @returns An array containing the parsed replay data.
 */
export function parse(replay: ArrayBufferLike | Buffer, parseInfoOnly?: boolean): any[]
/**
 */
export function decode(data: any[], options: {
  mods?: boolean,
  lifeBar?: boolean
}): any[]