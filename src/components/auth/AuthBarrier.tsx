import { useToken } from '../../lib/token/useToken'
import { AuthForm } from './AuthForm'
import Footer from './Footer'

export function AuthBarrier({ children }: { children: React.ReactNode }) {
  const { token } = useToken()

  if (!token) {
    return (
      <>
        <AuthForm />
        <Footer />
      </>
    )
  }

  return <>{children}</>
}
