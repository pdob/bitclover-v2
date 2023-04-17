export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type RequestParams = {
  headers?: Record<string, string>
  body?: object
  method?: ApiMethod
}