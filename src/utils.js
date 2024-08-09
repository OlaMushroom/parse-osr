export function decodeMods(data) {
  if (data === 0) return data
  const arr = []
  for (let i = 0; i < 31; i++) if ((data & (1 << i)) >> i) arr.push(i)
  if (arr.includes(9)) arr.splice(arr.indexOf(6), 1) // Remove DT when NC exists
  return arr.length > 1 ? arr : arr[0]
}
export const decodeLifeBar = data =>
  data
    .split(',')
    .slice(0, -1)
    .map(str => str.split('|').map(val => Number(val)))
