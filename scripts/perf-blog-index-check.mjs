import pg from 'pg'

const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL

if (!connectionString) {
  console.error('Missing DATABASE_URL or DIRECT_URL')
  process.exit(1)
}

const pool = new pg.Pool({ connectionString })

async function run() {
  const explainPublicList = `
    EXPLAIN ANALYZE
    SELECT id, title, slug, excerpt, featured_image, published, published_at, created_at
    FROM blogs
    WHERE published = true
    ORDER BY published_at DESC
    LIMIT 12;
  `

  const explainSearch = `
    EXPLAIN ANALYZE
    SELECT id, title, slug
    FROM blogs
    WHERE published = true
      AND (
        title ILIKE '%yaana%' OR
        slug ILIKE '%yaana%' OR
        excerpt ILIKE '%yaana%'
      )
    ORDER BY published_at DESC
    LIMIT 12;
  `

  const [listPlan, searchPlan] = await Promise.all([
    pool.query(explainPublicList),
    pool.query(explainSearch),
  ])

  console.log('=== Public List Query Plan ===')
  listPlan.rows.forEach((row) => console.log(row['QUERY PLAN']))

  console.log('\n=== Text Search Query Plan ===')
  searchPlan.rows.forEach((row) => console.log(row['QUERY PLAN']))

  console.log('\nTip: If text search remains sequential, add pg_trgm GIN indexes via SQL migration.')
}

run()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(async () => {
    await pool.end()
  })
