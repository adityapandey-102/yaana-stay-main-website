const SHOULD_LOG =
  process.env.NEXT_PUBLIC_LOG_ERRORS === 'true' ||
  process.env.LOG_ERRORS === 'true'

export function logError(message: string, error?: unknown) {
  if (!SHOULD_LOG) return
  if (typeof error !== 'undefined') {
    console.error(message, error)
    return
  }
  console.error(message)
}
