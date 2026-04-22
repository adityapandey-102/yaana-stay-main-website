import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'

function read(path) {
  return readFileSync(path, 'utf8')
}

test('single source of truth: lib/data/properties.ts is removed', () => {
  assert.equal(existsSync('src/lib/data/properties.ts'), false)
})

test('no code imports @/lib/data/properties', () => {
  const visits = read('src/app/(admin)/admin/visits/page.tsx')
  const inquiries = read('src/app/(admin)/admin/inquiries/page.tsx')

  assert.doesNotMatch(visits, /@\/lib\/data\/properties/)
  assert.doesNotMatch(inquiries, /@\/lib\/data\/properties/)
})

test('admin pages derive select options + name lookup from RENTAL_PROPERTIES', () => {
  const visits = read('src/app/(admin)/admin/visits/page.tsx')
  const inquiries = read('src/app/(admin)/admin/inquiries/page.tsx')

  // Make sure we keep using the canonical data module.
  assert.match(visits, /from ['"]@\/data\/properties['"]/)
  assert.match(inquiries, /from ['"]@\/data\/properties['"]/)

  // Ensure we normalize numeric ids to strings for DB-stored propertyId.
  assert.match(visits, /String\(p\.id\)/)
  assert.match(inquiries, /String\(p\.id\)/)
})

test('api routes do not depend on properties data modules', () => {
  const inquiries = read('src/app/api/inquiries/route.ts')
  const visits = read('src/app/api/visits/route.ts')

  assert.doesNotMatch(inquiries, /data\/properties|lib\/data\/properties|RENTAL_PROPERTIES|getPropertyBySlug|getPropertyName/)
  assert.doesNotMatch(visits, /data\/properties|lib\/data\/properties|RENTAL_PROPERTIES|getPropertyBySlug|getPropertyName/)
})

