import React from 'react';
import CustomColorHook from './CustomColorHook';
// reusable component
export default function AskOrder(props) {
    return (
        <tr className="ask">
            <td style={{color:'#D75750'}}>{props.limit_price}</td>
            <td>{props.size}</td>
            <td className="fill-ask" style={{ backgroundSize: CustomColorHook({ cumulative: props.cumulative, maxCumulative: props.maxCumulative }) + "% 100%" }}>
                {props.cumulative}
            </td>
        </tr>
    );
}
