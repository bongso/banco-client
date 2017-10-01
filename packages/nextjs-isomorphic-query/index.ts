import * as qs from 'querystring'

export const isomorphicQuery = query =>
  Object.keys(query).length === 0 && typeof window !== 'undefined'
    ? qs.parse(location.search.slice(1))
    : query
