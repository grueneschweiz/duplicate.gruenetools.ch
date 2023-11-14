import { useCallback } from 'react'
import { weblingservice } from '../../lib/weblingservice'
import { WeblingRecord } from '../../webling/webling-types'
import { type TFunction } from 'i18next'
import _weblingConfig from '../../webling/webling-config.json'
import { useTranslation } from 'react-i18next'
import { useToken } from '../../lib/token/useToken'

const weblingConfig = Object.freeze(_weblingConfig)

export type MappedAndSortedRecord = ReturnType<typeof mapAndSortRecord>
export type FieldKey = keyof WeblingRecord

export function useRecordLoader() {
  const { t } = useTranslation()
  const { get } = weblingservice()
  const { token } = useToken()

  return useCallback(
    (id: number, signal: AbortSignal) => {
      return get<WeblingRecord>({
        relativeUrl: `/api/v1/admin/member/${id}`,
        token: token || undefined,
        options: { signal },
      }).then((record) => mapAndSortRecord({ record, t }))
    },
    [get, t, token],
  )
}

/**
 * Maps the values from the record to the webling values and sorts them
 * as in src/webling/webling-config.json. Appends the special field firstLevelGroupNames.
 */
function mapAndSortRecord({
  record,
  t,
}: {
  record: WeblingRecord
  t: TFunction
}) {
  return weblingConfig.mappings
    .map((field) => {
      const rawValue = record[field.key as FieldKey]
      return {
        key: field.key as FieldKey,
        value: mapRawValueToWeblingValue({ rawValue, field }),
        label: field.weblingKey,
        type: field.type,
      }
    })
    .concat([
      {
        key: 'firstLevelGroupNames',
        value: record.firstLevelGroupNames,
        label: t('merger/fields/firstLevelGroupNames'),
        type: 'FirstLevelGroupNames',
      },
    ])
}

function mapRawValueToWeblingValue({
  rawValue,
  field,
}: {
  rawValue: WeblingRecord[FieldKey]
  field: (typeof weblingConfig.mappings)[0]
}) {
  // if field of type SelectField, MultiSelectField
  if (typeof field.values === 'object') {
    // SelectField
    if (typeof rawValue === 'string') {
      return (
        getMappedValue({ possibleValues: field.values, rawValue }) || rawValue
      )
    }

    // MultiSelectField
    if (
      Array.isArray(rawValue) &&
      rawValue.every((rv) => typeof rv === 'string')
    ) {
      return rawValue
        .map(
          (rv) =>
            getMappedValue({
              possibleValues: field.values,
              rawValue: rv as string,
            }) || rv,
        )
        .join('\n')
    }

    return rawValue
  }

  // fields of type TextField, LongTextField, DateField
  // or the additional fields id, groups, firstLevelGroupNames
  return rawValue
}

function getMappedValue({
  possibleValues,
  rawValue,
}: {
  possibleValues: NonNullable<(typeof weblingConfig.mappings)[0]['values']>
  rawValue: string
}) {
  return Object.entries(
    possibleValues.find((pv) =>
      Object.entries(pv).find((v) => v[0] === rawValue),
    ) || {},
  ).find((v) => v[0] === rawValue)?.[1] as string | undefined
}
