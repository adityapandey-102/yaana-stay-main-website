import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(path, 'utf8')
}

test('admin blogs route enforces auth and no-store responses', () => {
  const file = read('src/app/api/admin/blogs/route.ts')
  assert.match(file, /requireAdminAuth\(/)
  assert.match(file, /Unauthorized/)
  assert.match(file, /no-store, no-cache, must-revalidate/)
})

test('admin inquiries and visits routes enforce auth on admin methods', () => {
  const inquiries = read('src/app/api/inquiries/route.ts')
  const visits = read('src/app/api/visits/route.ts')

  assert.match(inquiries, /requireAdminAuth\(/)
  assert.match(inquiries, /Unauthorized/)
  assert.match(visits, /requireAdminAuth\(/)
  assert.match(visits, /Unauthorized/)
})
