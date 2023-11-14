import { useCallback, useState, createContext } from 'react'

const sessionStorageKey = 'token'

type TokenContextType = {
  token: string | null
  setToken: (token: string) => void
}

export const TokenContext = createContext<TokenContextType>({
  get token(): string | null {
    throw new Error('TokenContext not initialized')
  },
  setToken() {
    throw new Error('TokenContext not initialized')
  },
})

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const [token, _setToken] = useState<string | null>(
    sessionStorage.getItem(sessionStorageKey),
  )

  const setToken = useCallback(
    (token: string | null) => {
      if (token === null) {
        sessionStorage.removeItem(sessionStorageKey)
        _setToken(null)
        return
      }

      sessionStorage.setItem(sessionStorageKey, token)
      _setToken(token)
    },
    [_setToken],
  )

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}
