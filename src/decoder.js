const decodeStr = data =>
  data
    .split(',')
    .slice(0, -1)
    .map(str => str.split('|').map(val => Number(val)))

const decodeTime = data =>
  new Date(Number((BigInt(data) - 621355968000000000n) / 10000n))

function decodeMods(data) {
  if (data === 0) return [0]
  const arr = []
  for (let i = 0; i < 31; i++) if ((data & (1 << i)) >> i) arr.push(i)
  return arr
}

export function decode(data, options) {
  const arr = [...data]
  if (options.mods) arr[14] = decodeMods(arr[14])
  if (options.lifeBar) arr[15] = decodeStr(arr[15])
  if (options.time) arr[16] = decodeTime(arr[16])
  if (options.replayData) arr[18] = decodeStr(arr[18])
  return arr
}
