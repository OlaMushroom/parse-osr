/**
 * @param replay A buffer containing the replay data.
 * @param parseInfoOnly If true, only parse info and skip replay data.
 * @returns An array containing the parsed replay data.
 */
export function parse(replay: ArrayBufferLike | Buffer, parseInfoOnly?: boolean): any[]
/**
 * @param data An array containing parsed replay data.
 * @param options An object containing the decoding options.
 * @returns An array containing the decoded replay data.
 */
export function decode(data: any[], options: {
  lifeBar?: boolean,
  mods?: boolean,
  replayData?: boolean,
  time?: boolean
}): any[]