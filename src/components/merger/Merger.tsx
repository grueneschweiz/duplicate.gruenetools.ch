import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../util/Button'
import { ErrorMsg } from '../util/ErrorMsg'
import { useRecord } from './useRecord'
import { FieldKey, MappedAndSortedRecord } from './useRecordLoader'
import { MergerColumn } from './MergerColumn'
import { MergeButton } from './MergeButton'
import { Message } from '../util/Message'

export function Merger() {
  const { t } = useTranslation()

  const src = useRecord()
  const dst = useRecord()
  const res = useRecord()

  const hasResult = res.record.id !== null
  const sameId = src.record.id === dst.record.id && src.record.id !== null

  const fieldsWithData = useMemo(
    () => [
      ...new Set([
        ...getKeysOfFieldsWithData(src.record.data || []),
        ...getKeysOfFieldsWithData(dst.record.data || []),
        ...getKeysOfFieldsWithData(res.record.data || []),
      ]),
    ],
    [dst.record.data, src.record.data, res.record.data],
  )
  const fieldsToDisplay: FieldKey[] = [
    ...fieldsWithData,
    'firstLevelGroupNames',
  ]
  const fieldsWithDifferentValues = useMemo(
    () =>
      getKeysOfFieldsWithDiffValues(
        src.record.data || [],
        dst.record.data || [],
        res.record.data || [],
      ),
    [dst.record.data, src.record.data, res.record.data],
  )

  const [fieldsWithMergeConflict, setFieldsWithMergeConflict] = useState<
    FieldKey[]
  >([])

  const onResetClick = () => {
    src.reset()
    dst.reset()
    res.reset()
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
    >
      <p style={{ marginBottom: '2em' }}>{t('merger/description')}</p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: hasResult ? '1fr 1fr 1fr' : '1fr 1fr',
          gap: '1em',
          gridAutoFlow: 'column',
          alignItems: 'start',
          width: '100%',
          background: hasResult
            ? 'linear-gradient(to right, transparent calc((100% - 2em) / 3 * 2 + 2em), rgba(132, 180, 20, 0.1) calc((100% - 2em) / 3 * 2 + 2em))'
            : 'none',
        }}
      >
        <MergerColumn
          column={1}
          title={t('merger/src/title')}
          recordWithActions={src}
          readOnly={hasResult}
          fieldsToDisplay={fieldsToDisplay}
          fieldsToHighlight={fieldsWithDifferentValues}
          fieldsWithMergeConflict={fieldsWithMergeConflict}
          hideRecord={sameId}
        />
        <MergerColumn
          column={2}
          title={t('merger/dst/title')}
          recordWithActions={dst}
          readOnly={hasResult}
          fieldsToDisplay={fieldsToDisplay}
          fieldsToHighlight={fieldsWithDifferentValues}
          fieldsWithMergeConflict={fieldsWithMergeConflict}
          hideRecord={sameId}
        />
        {hasResult && (
          <MergerColumn
            column={3}
            title={t('merger/res/title')}
            recordWithActions={res}
            readOnly={hasResult}
            fieldsToDisplay={fieldsToDisplay}
            fieldsToHighlight={fieldsWithDifferentValues}
            fieldsWithMergeConflict={[]}
            hideRecord={false}
          />
        )}
      </div>
      {sameId && <ErrorMsg error={t('merger/sameId')} />}
      {!hasResult && !sameId && src.record.data && dst.record.data && (
        <MergeButton
          src={src}
          dst={dst}
          res={res}
          setFieldsWithMergeConflict={setFieldsWithMergeConflict}
        />
      )}
      {hasResult && (
        <>
          <Message
            style={{
              background: 'rgba(132, 180, 20, 0.1)',
              color: 'var(--color-primary)',
              fontWeight: 700,
              width: '100%',
            }}
          >
            {t('merger/success')}
          </Message>
          <Button onClick={onResetClick} style={{ width: '100%' }}>
            {t('merger/reset')}
          </Button>
        </>
      )}
    </div>
  )
}

function getKeysOfFieldsWithDiffValues(
  src: MappedAndSortedRecord,
  dst: MappedAndSortedRecord,
  res: MappedAndSortedRecord,
) {
  if (!src.length || !dst.length) return []

  return src
    .filter((field) => {
      const srcValue = field.value
      const dstValue = dst.find((f) => f.key === field.key)?.value
      const resValue = res.find((f) => f.key === field.key)?.value
      return srcValue !== dstValue && srcValue !== resValue
    })
    .map((field) => field.key)
}

function getKeysOfFieldsWithData(mappedAndSortedRecord: MappedAndSortedRecord) {
  return mappedAndSortedRecord
    .filter(({ value }) => value)
    .map(({ key }) => key)
}
