import { decodeUInt64 } from 'leb'
import { decompress } from 'lzma'
import { decodeMods, decodeStr, decodeTime } from './utils.js'
let ptr = 0
let arr = []
const decoder = new TextDecoder('utf-8', {
  fatal: true
})
function parseByte() {
  ptr++
  return arr[ptr - 1]
}
function parseLE(bytes) {
  ptr += bytes
  return arr
    .slice(ptr - bytes, ptr)
    .reduceRight((prev, current) => prev * 256 + current)
}
function parseStr() {
  if (arr[ptr] === 11) {
    ptr++
    const leb128 = decodeUInt64(arr.slice(ptr, ptr + 8))
    const len = leb128.value
    ptr += len + leb128.nextIndex
    return decoder.decode(Uint8Array.from(arr.slice(ptr - len, ptr)))
  }
  ptr++
  return ''
}
export function parse(replay, parseInfoOnly = false) {
  ptr = 0
  arr.length = 0
  arr = [...replay]
  const data = []
  data.push(parseByte()) // Mode
  data.push(parseLE(4)) // Version
  for (let i = 0; i < 3; i++) data.push(parseStr()) // Hashes and name
  for (let i = 0; i < 6; i++) data.push(parseLE(2)) // Hit counts
  data.push(parseLE(4)) // Total score
  data.push(parseLE(2)) // Greatest combo
  data.push(parseByte()) // Perfect/FC
  data.push(parseLE(4)) // Mods
  data.push(parseStr()) // Life bar
  data.push(parseLE(8)) // Timestamp
  const len = parseLE(4) // Length
  data.push(len)
  ptr += len
  if (parseInfoOnly) data.push('')
  else data.push(decompress(Uint8Array.from(arr.slice(ptr - len, ptr)))) // Replay data
  data.push(parseLE(8)) // Score ID
  if (ptr + 7 < arr.length) data.push(parseLE(8)) // Target practice
  return data
}
export function decode(data, options) {
  const a = data
  if (options.mods) a[14] = decodeMods(a[14])
  if (options.lifeBar) a[15] = decodeStr(a[15])
  if (options.time) a[16] = decodeTime(a[16])
  if (options.replayData) a[18] = decodeStr(a[18])
  return a
}
export const objectify = data =>
  Object.fromEntries(
    [
      'mode',
      'ver',
      'mapHash',
      'name',
      'replayHash',
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
      'replayData',
      'id',
      'tp'
    ].map((key, index) => [key, data[index]])
  )
