import { HTMLInputTypeAttribute, useCallback, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToken } from '../../lib/token/useToken'
import { weblingservice } from '../../lib/weblingservice'
import { ErrorMsg } from '../util/ErrorMsg'
import { Button } from '../util/Button'

type TokenResponse =
  | {
      token_type: 'Bearer'
      expires_in: number
      access_token: string
    }
  | {
      error: string
      error_description: string
      message: string
    }

export function AuthForm() {
  const { t } = useTranslation()
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { setToken } = useToken()
  const { post } = weblingservice()

  const onSubmit = useCallback(() => {
    if (!clientId || !clientSecret) {
      setError(t('auth/credentials/invalid'))
      return
    }

    setLoading(true)

    post<TokenResponse>({
      relativeUrl: '/oauth/token',
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
        scope: '',
      },
    })
      .then((data) => {
        if ('access_token' in data) {
          setToken(data.access_token)
        } else {
          throw new Error(data.error_description)
        }
      })
      .catch((e: Error) => {
        setError(e.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [clientId, clientSecret, post, setToken, t])

  return (
    <>
      <p>{t('auth/credentials/title')}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
        }}
        style={{
          display: 'grid',
          gap: '1em',
          gridTemplateColumns: 'max-content 1fr',
          maxWidth: '350px',
          margin: '0 auto',
          textAlign: 'left',
          alignItems: 'center',
        }}
      >
        <AuthInput
          label={t('auth/credentials/clientId')}
          value={clientId}
          onChange={setClientId}
          placeholder={t('auth/credentials/clientIdPlaceholder')}
          type='number'
          autoComplete='username'
        />
        <AuthInput
          label={t('auth/credentials/clientSecret')}
          value={clientSecret}
          onChange={setClientSecret}
          placeholder={t('auth/credentials/clientSecretPlaceholder')}
          type='password'
          autoComplete='current-password'
        />
        {!!error && <ErrorMsg error={error} />}
        <Button type='submit' style={{ gridColumn: '1 / 3' }} loading={loading}>
          {t('auth/credentials/signIn')}
        </Button>
      </form>
    </>
  )
}

function AuthInput(props: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type: HTMLInputTypeAttribute
  autoComplete: 'username' | 'current-password'
}) {
  const id = useId()
  const { label, onChange, ...inputProps } = props

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        id={id}
        required
      />
    </>
  )
}
