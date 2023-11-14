import { useMemo } from 'react'
import { FieldKey, MappedAndSortedRecord } from './useRecordLoader'

export function RecordView({
  data,
  column,
  fieldsToDisplay = [],
  fieldsToHighlight = [],
  fieldsWithMergeConflict = [],
}: {
  data: MappedAndSortedRecord
  column: number
  fieldsToDisplay: FieldKey[]
  fieldsToHighlight: FieldKey[]
  fieldsWithMergeConflict: FieldKey[]
}) {
  const filteredData = useMemo(() => {
    return data.filter((obj) => fieldsToDisplay.includes(obj.key))
  }, [fieldsToDisplay, data])

  return (
    <>
      {filteredData.map((field) => (
        <dl key={field.key} style={{ margin: 0, gridColumnStart: column }}>
          <dt
            style={{
              fontSize: '0.75em',
              color: 'var(--color-text-muted)',
              fontWeight: 600,
              lineHeight: '1.5em',
            }}
          >
            {field.label}
          </dt>
          <dd
            style={{
              margin: 0,
              lineHeight: '1.5em',
              whiteSpace: 'pre-wrap',
              ...(fieldsToHighlight.includes(field.key) && {
                background: 'rgba(255, 255, 0, 0.2)',
              }),
              ...(fieldsWithMergeConflict.includes(field.key) && {
                background: 'rgba(255, 0, 0, 0.1)',
              }),
            }}
          >
            {field.value}
          </dd>
        </dl>
      ))}
    </>
  )
}
