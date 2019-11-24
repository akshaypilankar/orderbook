import { INTERNET_ONLINE, INTERNET_OFFLINE, WS_CONNECTING, WS_OPENED, WS_CLOSED, SET_DATA, SET_PAYLOAD, SET_ERROR } from '../actions/types'
const initialState = {
    internet: {
        isOnline: true,
    },
    ws: {
        connecting: false,
        opened: false,
    },
    data: {},
    error: '',
    payload: ''
}
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INTERNET_ONLINE:
            return { ...state, internet: { ...state.internet, isOnline: true } }
        case INTERNET_OFFLINE:
            return { ...state, internet: { ...state.internet, isOnline: false } }
        case WS_CONNECTING:
            return { ...state, ws: { ...state.ws, connecting: true } }
        case WS_OPENED:
            return { ...state, ws: { ...state.ws, connecting: false, opened: true } }
        case WS_CLOSED:
            return { ...state, ws: { ...state.ws, connecting: false, opened: false } }
        case SET_DATA:
            return { ...state, data: action.payload }
        case SET_PAYLOAD:
            return { ...state, payload: action.payload }
        case SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}
export default appReducer