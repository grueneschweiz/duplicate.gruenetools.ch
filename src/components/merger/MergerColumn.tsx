import { useTranslation } from 'react-i18next'
import { UrlInput } from './UrlInput'
import { RecordWithActions } from './useRecord'
import { RecordView } from './RecordView'
import { FieldKey } from './useRecordLoader'
import { ErrorMsg } from '../util/ErrorMsg'
import { Message } from '../util/Message'

export function MergerColumn({
  column,
  title,
  recordWithActions,
  readOnly,
  fieldsToDisplay = [],
  fieldsToHighlight = [],
  fieldsWithMergeConflict = [],
  hideRecord,
}: {
  column: number
  title: string
  recordWithActions: RecordWithActions
  readOnly: boolean
  fieldsToDisplay: FieldKey[]
  fieldsToHighlight: FieldKey[]
  fieldsWithMergeConflict: FieldKey[]
  hideRecord: boolean
}) {
  const { record, ...actions } = recordWithActions
  const { t } = useTranslation()

  return (
    <>
      <h2 style={{ gridColumnStart: column, margin: 0 }}>{title}</h2>
      <UrlInput
        url={record.url}
        setUrl={actions.setUrl}
        column={column}
        disabled={readOnly || record.loading}
        isValid={record.id !== null}
      />
      {!record.id && (
        <Message style={{ gridColumnStart: column, alignSelf: 'center' }}>
          {t('merger/preview/noId')}
        </Message>
      )}
      {record.loading && (
        <Message style={{ gridColumnStart: column, alignSelf: 'center' }}>
          {t('util/loading')}
        </Message>
      )}
      {record.id && record.error && !record.loading && (
        <ErrorMsg style={{ gridColumnStart: column }} error={record.error} />
      )}
      {record.data && !hideRecord && (
        <>
          <RecordView
            data={record.data}
            column={column}
            fieldsToDisplay={fieldsToDisplay}
            fieldsToHighlight={fieldsToHighlight}
            fieldsWithMergeConflict={fieldsWithMergeConflict}
          />
          <RefreshButton
            onClick={() => {
              actions.refresh()
            }}
            column={column}
          />
          {record.editUrl && (
            <EditButton url={record.editUrl} column={column} />
          )}
        </>
      )}
    </>
  )
}

function RefreshButton({
  onClick,
  column,
}: {
  onClick: () => void
  column: number
}) {
  const { t } = useTranslation()
  return (
    <button
      onClick={onClick}
      className='outline'
      style={{
        gridColumnStart: column,
      }}
    >
      {t('merger/refresh')}
    </button>
  )
}

function EditButton({ url, column }: { url: string; column: number }) {
  const { t } = useTranslation()
  return (
    <a
      href={url}
      target='_blank'
      style={{ gridColumnStart: column }}
      className='link-button outline'
      rel='noreferrer'
    >
      {t('merger/edit')}
    </a>
  )
}
