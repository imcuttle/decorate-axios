

const cache = new Map()
export function once(fn, key: string) {
  return (axios: any) => {
    if (cache.get(key)) {
      return
    }
    cache.set(key, true)
    fn(axios)

    return () => cache.delete(key)
  }
}
