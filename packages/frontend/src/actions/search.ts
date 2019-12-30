import { Dispatch } from "redux"
import { SearchResult } from "../reducers/search"
import { RootState } from "../reducers"

export const SEARCH_SUBMIT = "SEARCH_SUBMIT"
export const SEARCH_UPDATE = "SEARCH_UPDATE"
export const SEARCH_FETCHING = "SEARCH_FETCHING"
export const SEARCH_FETCHED = "SEARCH_FETCHED"

const searchUpdateAction = (term: string) => ({
  type: SEARCH_UPDATE,
  payload: term
})

export const searchUpdate = (term: string) => {
  return (dispatch: Dispatch) => {
    dispatch(searchUpdateAction(term))
  }
}

const searchFetchAction = () => ({
  type: SEARCH_FETCHING
})

const searchFetchedAction = (payload: SearchResult[]) => ({
  type: SEARCH_FETCHED,
  payload
})

export const searchSubmit = () => {
  return async (dispatch: Dispatch, getState : () => RootState) => {
    const {searchTerm} = getState().search
    dispatch(searchFetchAction())
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({searchTerm})
    })
    const results = await response.json()
    dispatch(searchFetchedAction(results as SearchResult[]))
  }
}
