import { Message } from './Message'

export function ErrorMsg({
  error,
  style,
}: {
  error: Error | string
  style?: React.CSSProperties
}) {
  return (
    <Message
      style={{
        background: 'rgba(255, 0, 0, 0.1)',
        color: 'var(--color-error)',
        fontWeight: 'bold',
        ...style,
      }}
    >
      {error.toString()}
    </Message>
  )
}
