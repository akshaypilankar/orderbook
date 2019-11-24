// types 
import { INTERNET_ONLINE, INTERNET_OFFLINE, WS_CONNECTING, WS_OPENED, WS_CLOSED, SET_DATA, SET_ERROR, SET_PAYLOAD } from './types'
export const internetOnline = () => ({
    type: INTERNET_ONLINE,
})

export const internetOffline = () => ({
    type: INTERNET_OFFLINE,
})

export const wsConnecting = () => ({
    type: WS_CONNECTING,
})

export const wsOpened = () => ({
    type: WS_OPENED,
})

export const wsClosed = () => ({
    type: WS_CLOSED,
})

export const setData = ({ data }) => dispatch => {
    const tempData = JSON.parse(data);
    const totalSell = sumQuantities(tempData.sell);
    const totalBuy = sumQuantities(tempData.buy);
    const maxCumulative = Math.max(totalSell, totalBuy);
    let sellOrders = tempData.sell !== undefined ? tempData.sell.sort((a, b) => a.limit_price > b.limit_price) : []; // ascending order
    let buyOrders = tempData.buy !== undefined ? tempData.buy.sort((a, b) => a.limit_price < b.limit_price) : []; // descending order
    dispatch({
        type: SET_DATA,
        payload: {
            maxCumulative: maxCumulative,
            buyOrders: buyOrders,
            sellOrders: sellOrders
        }
    });
}

export const setPayload = (data) => dispatch => {
    dispatch({
        type: SET_PAYLOAD,
        payload: data
    });
}

export const setError = (error) => dispatch => {
    dispatch({
        type: SET_ERROR,
        payload: error
    });
}


function sumQuantities(orders) {
    if (orders !== undefined)
        return orders.reduce((total, order) => total + order.size, 0);
}