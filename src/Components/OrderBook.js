import React from 'react';
import AskOrder from './AskOrder';
import BidOrder from './BidOrder';

export default function OrderBook(props) {
    function sumQuantities(orders) {
        if (orders !== undefined)
            return orders.reduce((total, order) => total + order.size, 0);
    }

    function renderOrders(ComponentClass, orders) {
        if (orders) {
            let cumulative = 0;
            return orders.map((order, index) => {
                order.cumulative = (cumulative += order.size);
                order.maxCumulative = maxCumulative;
                return (<ComponentClass key={index} {...order} />);
            });
        }

    }

    let totalAsks = sumQuantities(props.askOrders);
    let totalBids = sumQuantities(props.bidOrders);
    let maxCumulative = Math.max(totalAsks, totalBids);
    let askOrders = props.askOrders !== undefined ? props.askOrders.sort((a, b) => a.limit_price > b.limit_price) : []; // ascending order
    let bidOrders = props.bidOrders !== undefined ? props.askOrders.sort((a, b) => a.limit_price < b.limit_price) : []; // descending order

    return (
        <div className="OrderBook">
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
                        {renderOrders(AskOrder, askOrders).reverse()}
                    </tbody>

                </table>
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Price</th>
                            <th>Size</th>
                            <th>Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {renderOrders(BidOrder, bidOrders)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

