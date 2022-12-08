export const WAYFINDER_DATASOURCE =
  ((import.meta as any).env as Record<string, string | undefined>)?.VITE_WAYFINDER_DATASOURCE ||
  'http://localhost:4350/graphql'
