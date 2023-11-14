import { useContext } from 'react'
import { TokenContext } from './TokenProvider'

export function useToken() {
  return useContext(TokenContext)
}
