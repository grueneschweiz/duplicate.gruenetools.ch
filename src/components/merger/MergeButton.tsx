import { useTranslation } from 'react-i18next'
import { RecordWithActions } from './useRecord'
import { FieldKey } from './useRecordLoader'
import { useEffect, useState } from 'react'
import { weblingservice } from '../../lib/weblingservice'
import { useToken } from '../../lib/token/useToken'
import { WeblingRecord } from '../../webling/webling-types'
import { ErrorMsg } from '../util/ErrorMsg'
import { Button } from '../util/Button'

type MergeResponse = {
  success: boolean
  conflicts: FieldKey[]
  merged: WeblingRecord
  message: string
}

export function MergeButton({
  src,
  dst,
  res,
  setFieldsWithMergeConflict,
}: {
  src: RecordWithActions
  dst: RecordWithActions
  res: RecordWithActions
  setFieldsWithMergeConflict: (fields: FieldKey[]) => void
}) {
  const { t } = useTranslation()
  const { put: weblingservicePut } = weblingservice()
  const { token } = useToken()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // reset any merge errors when the src or dst record changes
  useEffect(() => {
    setError(null)
    setFieldsWithMergeConflict([])
  }, [src.record.id, dst.record.id, setError, setFieldsWithMergeConflict])

  const onClick = () => {
    if (!src.record.id || !dst.record.id) {
      setError(new Error('Missing srcId or dstId'))
      return
    }
    setLoading(true)

    weblingservicePut<MergeResponse>({
      relativeUrl: `/api/v1/admin/member/${dst.record.id}/merge/${src.record.id}`,
      token: token || undefined,
    })
      .then((response) => {
        setError(null)
        setFieldsWithMergeConflict([])

        if (response.success) {
          res.setUrl(dst.record.url)
        } else if (response.conflicts.length > 0) {
          setFieldsWithMergeConflict(response.conflicts)
          throw new Error(t('merger/conflict'))
        } else {
          throw new Error(response.message)
        }
      })
      .catch(setError)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      {error && <ErrorMsg error={error} />}
      <Button
        style={{
          width: '100%',
          fontWeight: 'bold',
        }}
        onClick={onClick}
        loading={loading}
      >
        {t('merger/mergeButton/merge')}
      </Button>
    </>
  )
}
