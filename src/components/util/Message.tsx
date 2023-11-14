import { CSSProperties } from 'react'

export function Message({
  children,
  style,
}: {
  children: React.ReactNode
  style: CSSProperties
}) {
  return (
    <p
      style={{
        margin: 0,
        padding: '1em',
        background: 'rgba(255, 255, 0, 0.1)',
        borderRadius: '0.5em',
        ...style,
      }}
    >
      {children}
    </p>
  )
}
