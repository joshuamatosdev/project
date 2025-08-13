import React from 'react'

const Footer = (props) => {
    return (
        <table>
            <tbody>
            <tr>
                <td className="footerTD">BATTLE STATS : Artillery on the BattleField {props.count}</td>
                <td className="footerTD">{props.message}</td>

            </tr>
            </tbody>
        </table>
    )
}

export default Footer