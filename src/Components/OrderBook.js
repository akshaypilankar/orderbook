import React, { useState } from 'react';
import { connect } from 'react-redux';
import useInternet from '../hooks/useInternet'
import useWebsocket from '../hooks/useWebsocket'
import AskOrder from './AskOrder';
import BidOrder from './BidOrder';
import './Style.css';
import { setPayload } from '../actions/appActions'

function OrderBook(props) {
    //to check network connection.
    const { isOnline } = useInternet()

    // to initialize ws with given endpoint and basic functions. 
    const { opened, ws } = useWebsocket({ isOnline })

    // multiple tickers info 
    const [tickers, setTickers] = useState([
        { name: 'BTCUSD', payload: `{"type":"subscribe","payload":{"channels":[{"name":"l2_orderbook","symbols":["BTCUSD"]}]}}` },
        { name: 'ETHUSDQ', payload: `{"type":"subscribe","payload":{"channels":[{"name":"l2_orderbook","symbols":["ETHUSDQ"]}]}}` }
        // ...
    ])
    // send payload 
    const sendPayload = () => {
        if (opened) {
            ws.send(props.state.payload);
        }
    }

    // to send initial argument to delta ws endpoint upon successful connection.
    React.useEffect(() => {
        sendPayload()
    }, [opened])

    function renderOrders(ComponentClass, orders) {
        const maxCumulative = props.state.data.maxCumulative;
        if (orders) {
            let cumulative = 0;
            return orders.map((order, index) => {
                order.cumulative = (cumulative += order.size);
                order.maxCumulative = maxCumulative;
                return (<ComponentClass key={index} {...order} />);
            });
        }

    }

    return (
        <div className="orderBook">
            <div>
                <select value={props.state.payload} onChange={(event) => {
                    props.setPayload(event.target.value)
                }}>
                    {tickers.map(ticker => {
                        return <option key={Math.random()} value={ticker.payload}>{ticker.name}</option>
                    })}
                </select>
            </div>
            <br />
            <div className="orderBook">
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Price</th>
                                <th>Size</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.state.data.sellOrders !== undefined && renderOrders(AskOrder, props.state.data.sellOrders).reverse()}
                        </tbody>

                    </table>
                    <br />
                    <table>
                        <thead>
                            <tr>
                                <th>Price</th>
                                <th>Size</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {props.state.data.buyOrders !== undefined && renderOrders(BidOrder, props.state.data.buyOrders)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => ({
    state: state.app
})

export default connect(mapStateToProps, { setPayload })(OrderBook)
