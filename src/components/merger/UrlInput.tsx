import { useTranslation } from 'react-i18next'

export function UrlInput({
  url,
  setUrl,
  column,
  disabled,
  isValid,
}: {
  url: string | null
  setUrl: (url: string | null) => void
  column: number
  disabled: boolean
  isValid: boolean
}) {
  const { t } = useTranslation()

  return (
    <input
      type='url'
      disabled={disabled}
      required
      value={url || ''}
      onChange={(e) => {
        setUrl(e.target.value)
      }}
      placeholder={t('merger/input/placeholder')}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        ...(url && {
          borderColor: isValid ? 'var(--color-primary)' : 'var(--color-error)',
        }),
        gridColumnStart: column,
      }}
      pattern=':member/view/\d+'
    />
  )
}
