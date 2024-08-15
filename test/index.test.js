import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from 'vitest'
import { parse } from '../src/index.js'
import data from './data.json' with { type: 'json' }

const dir = './test/replays'
const files = readdirSync(dir).map(name => join(dir, name))

for (const file of files) {
  const replay = readFileSync(file)
  const parsed = parse(replay, true)
  const info = data[files.indexOf(file)]
  test(file, () => {
    expect(parsed[0]).toBe(info.mode)
    expect(parsed[5]).toBe(info.great)
    expect(parsed[6]).toBe(info.ok)
    expect(parsed[7]).toBe(info.meh)
    expect(parsed[10]).toBe(info.miss)
    expect(parsed[11]).toBe(info.score)
    expect(parsed[12]).toBe(info.combo)
    expect(parsed[13]).toBe(info.perfect)
  })
}
