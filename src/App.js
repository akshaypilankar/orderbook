import React, { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import OrderBook from './Components/OrderBook';
import './App.css';


function App() {
  const [messageHistory, setMessageHistory] = useState({});
  const [sendMessage, lastMessage, readyState] = useWebSocket(`wss://api.delta.exchange:2096`);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((JSON.parse(lastMessage.data)));
      setLoading(true)
    }
  }, [lastMessage]);

  useEffect(() => {
    if (readyState === 1) {
      sendMessage(' {"type":"subscribe","payload":{"channels":[{"name":"l2_orderbook","symbols":["BTCUSD"]}]}}')
    }
  }, [readyState])

  return (
    <div className="App">
      {messageHistory !== undefined && loading && <OrderBook askOrders={messageHistory.sell} bidOrders={messageHistory.buy} />}
    </div>
  );
}

export default App;
