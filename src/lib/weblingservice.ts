type RequestOptions = Omit<RequestInit, 'method' | 'headers'> & {
  headers?: Omit<RequestInit['headers'], 'Authorization' | 'Content-Type'>
}

function get<RespT>({
  relativeUrl,
  token,
  options,
}: {
  relativeUrl: string
  token?: string
  options?: RequestOptions
}) {
  return apiFetch<RespT>({ relativeUrl, token, options })
}

function post<RespT, DataT = unknown>({
  relativeUrl,
  token,
  data,
  options,
}: {
  relativeUrl: string
  token?: string
  data?: DataT
  options?: RequestOptions
}) {
  return apiFetch<RespT, DataT>({
    relativeUrl,
    token,
    data,
    options,
    method: 'POST',
  })
}

function put<RespT, DataT = unknown>({
  relativeUrl,
  token,
  data,
  options,
}: {
  relativeUrl: string
  token?: string
  data?: DataT
  options?: RequestOptions
}) {
  return apiFetch<RespT, DataT>({
    relativeUrl,
    token,
    data,
    options,
    method: 'PUT',
  })
}

function apiFetch<RespT, DataT = unknown>({
  relativeUrl,
  token,
  data,
  options,
  method = 'GET',
}: {
  relativeUrl: string
  token?: string
  data?: DataT
  options?: RequestOptions
  method?: RequestInit['method']
}) {
  const baseUrl = import.meta.env.VITE_WEBLINGSERVICE_URL as string | undefined

  if (!baseUrl) {
    throw new Error('Missing baseUrl')
  }

  return fetch(`${baseUrl}${relativeUrl}`, {
    ...options,
    ...(data && { body: JSON.stringify(data) }),
    method,
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json; charset=utf-8',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }).then((response) => {
    // let 409 responses pass, because they contain details about the conflict
    if (response.ok || response.status === 409) {
      return response.json() as Promise<RespT>
    }
    throw new Error(`${response.status} ${response.statusText}`)
  })
}

export function weblingservice() {
  return {
    get,
    post,
    put,
  }
}
