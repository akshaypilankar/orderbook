import React from 'react';
import PropTypes from 'prop-types';
import { getColorPercentage } from '../utils';
// reusable component
function BidOrder(props) {
    return (
        <tr>
            <td style={{ color: '#55B987' }}>{props.limit_price}</td>
            <td>{props.size}</td>
            <td className="fillBuy" style={{ backgroundSize: getColorPercentage({ cumulative: props.cumulative, maxCumulative: props.maxCumulative }) + "% 100%" }}>
                {props.cumulative}
            </td>
        </tr>
    );
}


BidOrder.propTypes = {
    limit_price: PropTypes.any,
    size: PropTypes.any,
    cumulative: PropTypes.any,
    maxCumulative: PropTypes.any,
};

export default BidOrder;