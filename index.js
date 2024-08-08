import { decompress } from 'lzma'
import { decodeUInt64 } from 'leb'
const arr = []
let ptr = 0
const decoder = new TextDecoder('utf-8', {
  fatal: true
})
function parse() {
  ptr++
  return arr[ptr - 1]
}
function parseLE(i) {
  ptr += i
  return arr.slice(ptr - i, ptr).reduceRight((prev, current) => prev * 256 + current)
}
function parseStr() {
  if (arr[ptr] === 11) {
    ptr++
    const leb128 = decodeUInt64(arr.slice(ptr, ptr + 8));
    const len = leb128.value
    ptr += len + leb128.nextIndex
    return decoder.decode(Uint8Array.from(arr.slice(ptr - len, ptr)))
  }
  ptr++;
  return ''
}
export default function osr(replay, parseInfoOnly) {
  ptr = 0
  arr.length = 0
  for (const v of replay) arr.push(v);
  const data = []
  data.push(parse()) // Mode
  data.push(parseLE(4)) // Version
  for (let i = 0; i < 3; i++) data.push(parseStr()); // Name and hashes
  for (let i = 0; i < 6; i++) data.push(parseLE(2)); // Hit counts
  data.push(parseLE(4)) // Total score
  data.push(parseLE(2)) // Greatest combo
  data.push(parse()) // Perfect/FC
  data.push(parseLE(4)) // Mods
  data.push(parseStr()) // Life bar
  data.push(parseLE(8)) // Timestamp
  const len = parseLE(4) // Length
  data.push(len)
  ptr += len
  if (!parseInfoOnly) data.push(decompress(arr.slice(ptr - len, ptr))) // Replay data
  data.push(parseLE(8)) // Score ID
  if((ptr + 7) < arr.length) data.push(parseLE(8)) // Target practice
  return data
}
