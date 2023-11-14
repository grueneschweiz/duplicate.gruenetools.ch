import { useTranslation } from 'react-i18next'
import { AuthBarrier } from './auth/AuthBarrier'
import { Merger } from './merger/Merger'
import { TokenProvider } from '../lib/token/TokenProvider'

export default function App() {
  const { t } = useTranslation()

  return (
    <>
      <h1>{t('merger/title')}</h1>
      <TokenProvider>
        <AuthBarrier>
          <Merger />
        </AuthBarrier>
      </TokenProvider>
    </>
  )
}
