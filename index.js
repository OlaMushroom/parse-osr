import { decodeUInt64 } from 'leb'
import { decompress } from 'lzma'
let ptr = 0
const arr = []
const decoder = new TextDecoder('utf-8', {
  fatal: true
})
function parseByte() {
  ptr++
  return arr[ptr - 1]
}
function parseLE(i) {
  ptr += i
  return arr
    .slice(ptr - i, ptr)
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
function decodeMods(n) {
  if (n === 0) return n
  const arr = []
  for (let i = 0; i < 31; i++) if ((n & (1 << i)) >> i) arr.push(i)
  if (arr.length > 1) return arr
  return arr[0]
}
export function parse(replay, parseInfoOnly) {
  const data = []
  ptr = 0
  arr.length = 0
  for (const v of replay) arr.push(v)
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
  if (!parseInfoOnly) data.push(decompress(arr.slice(ptr - len, ptr))) // Replay data
  data.push(parseLE(8)) // Score ID
  if (ptr + 7 < arr.length) data.push(parseLE(8)) // Target practice
  return data
}
