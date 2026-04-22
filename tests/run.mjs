import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

function read(path) {
  return readFileSync(path, 'utf8')
}

function check(name, fn) {
  try {
    fn()
    process.stdout.write(`ok - ${name}\n`)
  } catch (err) {
    process.stdout.write(`not ok - ${name}\n`)
    throw err
  }
}

check('admin blogs route enforces auth and no-store responses', () => {
  const file = read('src/app/api/admin/blogs/route.ts')
  assert.match(file, /requireAdminAuth\(/)
  assert.match(file, /Unauthorized/)
  assert.match(file, /no-store, no-cache, must-revalidate/)
})

check('admin inquiries and visits routes enforce auth on admin methods', () => {
  const inquiries = read('src/app/api/inquiries/route.ts')
  const visits = read('src/app/api/visits/route.ts')

  assert.match(inquiries, /requireAdminAuth\(/)
  assert.match(inquiries, /Unauthorized/)
  assert.match(visits, /requireAdminAuth\(/)
  assert.match(visits, /Unauthorized/)
})

check('single source of truth: lib/data/properties.ts is removed', () => {
  assert.equal(existsSync('src/lib/data/properties.ts'), false)
})

check('admin pages use RENTAL_PROPERTIES and normalize id to string', () => {
  const visits = read('src/app/(admin)/admin/visits/page.tsx')
  const inquiries = read('src/app/(admin)/admin/inquiries/page.tsx')

  assert.match(visits, /from ['"]@\/data\/properties['"]/)
  assert.match(inquiries, /from ['"]@\/data\/properties['"]/)
  assert.match(visits, /String\(p\.id\)/)
  assert.match(inquiries, /String\(p\.id\)/)
})

check('api routes do not depend on properties data modules', () => {
  const inquiries = read('src/app/api/inquiries/route.ts')
  const visits = read('src/app/api/visits/route.ts')

  assert.doesNotMatch(inquiries, /data\/properties|lib\/data\/properties|RENTAL_PROPERTIES|getPropertyBySlug|getPropertyName/)
  assert.doesNotMatch(visits, /data\/properties|lib\/data\/properties|RENTAL_PROPERTIES|getPropertyBySlug|getPropertyName/)
})

