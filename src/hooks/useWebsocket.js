import { useRef, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { wsOpened, wsClosed, wsConnecting, setData } from '../actions/appActions'

const useWebsocket = ({ isOnline }) => {
  const opened = useSelector((state) => state.app.ws.opened)
  const dispatchAction = useDispatch()
  const wsRef = useRef()

  const onMessage = (msg) => {
    dispatchAction(setData(msg));
  }

  const onOpen = (e) => {
    console.log("connection open");
    dispatchAction(wsOpened())
  }

  const onClose = (e) => {
    console.log('WS client closed')
    if (wsRef.current) {
      wsRef.current.close()
    }
  }

  const onError = (e) => {
    console.log('WS client errored')
  }

  const initWebsocket = useCallback(() => {
    if (wsRef.current) wsRef.current.close()
    wsRef.current = new WebSocket(process.env.REACT_APP_SOCKET_URL)
    wsRef.current.addEventListener('message', onMessage)
    wsRef.current.addEventListener('open', onOpen)
    wsRef.current.addEventListener('close', onClose)
    wsRef.current.addEventListener('error', onError)
  }, [])

  const endWebsocket = () => {
    if (wsRef.current) {
      wsRef.current.removeEventListener('message', onMessage)
      wsRef.current.removeEventListener('open', onOpen)
      wsRef.current.removeEventListener('close', onClose)
      wsRef.current.removeEventListener('error', onError)
      wsRef.current.close()
      if (opened) dispatchAction(wsClosed())
    }
  }

  // Initiates the websocket client on mount
  useEffect(() => {
    if (!wsRef.current) initWebsocket()
  }, [initWebsocket])

  // Responsible for updating redux when isOnline changes
  useEffect(() => {
    if (isOnline && !opened) {
      dispatchAction(wsConnecting())
    } else if (!isOnline && opened) {
      dispatchAction(wsClosed())
    }
  }, [isOnline, dispatchAction, opened])

  return {
    ws: wsRef.current,
    opened,
    initWebsocket,
    endWebsocket,
  }
}

export default useWebsocket