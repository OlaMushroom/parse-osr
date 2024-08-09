export function decodeMods(n) {
  if (n === 0) return n
  const a = []
  for (let i = 0; i < 31; i++) if ((n & (1 << i)) >> i) a.push(i)
  if (a.includes(9)) {
    a.splice(a.indexOf(6), 1) // Remove DT when NC exists
  }
  if (a.length > 1) return a
  return a[0]
}
