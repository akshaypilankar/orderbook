import React from 'react';
import CustomColorHook from './CustomColorHook';
// reusable component
export default function BidOrder(props) {
    return (
        <tr className="bid">
             <td style={{color:'#55B987'}}>{props.limit_price}</td>
            <td>{props.size}</td>
            <td className="fill-bid" style={{ backgroundSize: CustomColorHook({ cumulative: props.cumulative, maxCumulative: props.maxCumulative }) + "% 100%" }}>
                {props.cumulative}
            </td>
        </tr>
    );
}