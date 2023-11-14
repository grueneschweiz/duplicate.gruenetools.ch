import { useCallback, useEffect, useReducer, useRef } from 'react'
import { MappedAndSortedRecord, useRecordLoader } from './useRecordLoader'

export type RecordObj = {
  id: number | null
  url: string | null
  editUrl: string | null
  loading: boolean
  error: Error | null
  data: MappedAndSortedRecord | null
}

export type RecordWithActions = ReturnType<typeof useRecord>

export enum RecordAction {
  SET_URL,
  SET_MAPPED_AND_SORTED_RECORD,
  SET_LOADING,
  SET_ERROR,
  RESET,
}

export function useRecord() {
  const [record, dispatch] = useReducer(recordReducer, emptyRecord)

  const recordLoader = useRecordLoader()
  const lastRecordId = useRef<number | null>(null)
  const loadController = useRef<AbortController | null>(new AbortController())

  const setUrl = useCallback((url: string | null) => {
    dispatch({ type: RecordAction.SET_URL, payload: url })
  }, [])

  const setMappedAndSortedRecord = useCallback(
    (mappedAndSortedRecord: MappedAndSortedRecord | null) => {
      dispatch({
        type: RecordAction.SET_MAPPED_AND_SORTED_RECORD,
        payload: mappedAndSortedRecord,
      })
    },
    [],
  )

  const reset = useCallback(() => {
    dispatch({ type: RecordAction.RESET })
  }, [])

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: RecordAction.SET_LOADING, payload: loading })
  }, [])

  const setError = useCallback((error: Error) => {
    dispatch({ type: RecordAction.SET_ERROR, payload: error })
  }, [])

  const fetchRecord = useCallback(
    (id: number | null) => {
      loadController.current?.abort()
      loadController.current = new AbortController()

      if (!id) {
        lastRecordId.current = null
        return
      }

      setLoading(true)
      recordLoader(id, loadController.current.signal)
        .then((newRecord) => {
          setMappedAndSortedRecord(newRecord)
        })
        .catch((e: Error) => {
          setError(e)
        })
        .finally(() => {
          lastRecordId.current = record.id
          setLoading(false)
        })
    },
    [record.id, recordLoader, setError, setLoading, setMappedAndSortedRecord],
  )

  // fetch record data if id changed
  useEffect(() => {
    if (record.id !== lastRecordId.current) {
      fetchRecord(record.id)
    }
  }, [fetchRecord, record.id])

  return {
    record,
    setUrl,
    setMappedAndSortedRecord,
    reset,
    setLoading,
    setError,
    refresh: () => {
      setMappedAndSortedRecord(null)
      fetchRecord(record.id)
    },
  }
}

function recordReducer(
  state: RecordObj,
  action: {
    type: RecordAction
    payload?: boolean | string | null | MappedAndSortedRecord | Error
  },
) {
  const { type, payload } = action

  switch (type) {
    case RecordAction.SET_URL: {
      if (payload === null) {
        return { ...emptyRecord }
      }
      if (payload === state.url) {
        return state
      }
      if (typeof payload !== 'string') {
        throw new Error('payload must be a string')
      }
      const urlMatch = payload.match(/:member\/[^/]+\/(\d+)/)
      if (!(urlMatch && urlMatch[1].length)) {
        return { ...emptyRecord, url: payload, error: new Error('Invalid url') }
      }

      const id = parseInt(urlMatch[1])
      const editUrl = payload.replace(/:member\/.*/, `:member/edit/${id}`)

      return { ...state, url: payload, id, editUrl }
    }
    case RecordAction.SET_MAPPED_AND_SORTED_RECORD:
      return {
        ...state,
        data: payload as MappedAndSortedRecord,
        error: null,
      }
    case RecordAction.RESET:
      return { ...emptyRecord }
    case RecordAction.SET_LOADING:
      return { ...state, loading: payload as boolean }
    case RecordAction.SET_ERROR:
      return { ...state, error: payload as Error, data: null }
    default:
      return state
  }
}

const emptyRecord: RecordObj = {
  id: null,
  url: null,
  editUrl: null,
  loading: false,
  error: null,
  data: null,
}
