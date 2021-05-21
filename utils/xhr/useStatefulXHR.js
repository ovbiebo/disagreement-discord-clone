import {useReducer, useRef} from 'react'

export const FETCH_START = 'FETCH_START'
export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const FETCH_FAIL = 'FETCH_FAIL'

const fetchStart = (staleData) => {
    return {
        type: FETCH_START,
        data: staleData
    }
}

const fetchSuccess = (data) => {
    return {
        type: FETCH_SUCCESS,
        data
    }
}

const fetchFail = (error) => {
    return {
        type: FETCH_FAIL,
        error
    }
}

function xhrStatusReducer(state, action) {
    switch (action.type) {
        case FETCH_START: {
            return {error: null, data: action.data}
        }
        case FETCH_SUCCESS: {
            return {error: null, data: action.data}
        }
        case FETCH_FAIL: {
            return {data: null, error: action.error}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

export const useStatefulXHR = () => {
    const [state, dispatch] = useReducer(
        xhrStatusReducer,
        {data: null, error: null}
    )

    const cache = useRef(null)

    const makeRequest = async (fetcher) => {
        dispatch(fetchStart(cache.current))
        try {
            const response = await fetcher()
            dispatch(fetchSuccess(response))
        } catch (error) {
            dispatch(fetchFail(error))
        }
    }

    return {
        error: state.error,
        data: state.data,
        makeRequest
    }
}
