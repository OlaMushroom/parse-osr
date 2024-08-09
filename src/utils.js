export function decodeMods(n) {
  if (n === 0) return n
  const arr = []
  for (let i = 0; i < 31; i++) if ((n & (1 << i)) >> i) arr.push(i)
  if (arr.length > 1) return arr
  return arr[0]
}
