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
export function decode(data: any[], options?: {
  lifeBar?: boolean,
  mods?: boolean,
  replayData?: boolean,
  time?: boolean
}): any[]
/**
 * @param data An array containing the parsed replay data.
 * @returns An object containing the parsed replay data.
*/
export function objectify(data: any[]): {
  mode: number,
  ver: number,
  map: string,
  name: string,
  hash: string,
  great: number,
  ok: number,
  meh: number,
  geki: number,
  katu: number,
  miss: number,
  score: number,
  combo: number,
  perfect: number,
  mods: number | number[],
  lifeBar: string | number[],
  time: number | string,
  length: number,
  data?: string | number[][],
  id?: number,
  tp?: number
}
