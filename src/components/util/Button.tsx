import { ButtonHTMLAttributes, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export function Button({
  children,
  loading,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  loading?: boolean
}) {
  const { t } = useTranslation()
  const disabled = loading || props.disabled
  const style = {
    cursor: loading ? 'wait' : disabled ? 'not-allowed' : 'pointer',
    ...props.style,
  }
  return (
    <button {...props} disabled={disabled} style={style}>
      {loading ? t('util/loading') : children}
    </button>
  )
}
