import React from 'react';
import PropTypes from 'prop-types';
import { getColorPercentage } from '../utils';
// reusable component
function AskOrder(props) {
    return (
        <tr>
            <td style={{ color: '#D75750' }}>{props.limit_price}</td>
            <td>{props.size}</td>
            <td className="fillSell" style={{ backgroundSize: getColorPercentage({ cumulative: props.cumulative, maxCumulative: props.maxCumulative }) + "% 100%" }}>
                {props.cumulative}
            </td>
        </tr>
    );
}

AskOrder.propTypes = {
    limit_price: PropTypes.any,
    size: PropTypes.any,
    cumulative: PropTypes.any,
    maxCumulative: PropTypes.any,
};

export default AskOrder;