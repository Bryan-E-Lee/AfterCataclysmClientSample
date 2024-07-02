import React from "react"

export const RollOdds = () => {
    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={8}>
                        Probability This Roll Is the Best You Can Roll
                    </th>
                </tr>
                <tr>
                    <th>Roll</th>
                    <th>Ratio</th>
                    <th>Probability</th>
                    <th>Probability w/One Extra Roll</th>
                    <th>Probability w/Two Extra Rolls</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>Pair</td>
                    <td>3600 / 7776</td>
                    <td>46.30%</td>
                    <td>23.15%</td>
                    <td>5.40%</td>
                </tr>
                <tr>
                    <td>Two Pair</td>
                    <td>1800 / 7776</td>
                    <td>23.15%</td>
                    <td>34.72%</td>
                    <td>27.00%</td>
                </tr>
                <tr>
                    <td>Triple</td>
                    <td>1200 / 7776</td>
                    <td>15.43%</td>
                    <td>15.43%o</td>x
                    <td>9.00%</td>
                </tr>
                <tr>
                    <td>Small Straight</td>
                    <td>960 / 7776</td>
                    <td>12.35%</td>
                    <td>17.75%</td>
                    <td>21.00%</td>
                </tr>
                <tr>
                    <td>Flush</td>
                    <td>486 / 7776</td>
                    <td>6.25%</td>
                    <td>21.88%</td>
                    <td>45.31%</td>
                </tr>
                <tr>
                    <td>Full House</td>
                    <td>300 / 7776</td>
                    <td>3.86%</td>
                    <td>16.08%</td>
                    <td>30.01%</td>
                </tr>
                <tr>
                    <td>Big Straight</td>
                    <td>240 / 7776</td>
                    <td>3.08%</td>
                    <td>9.26%</td>
                    <td>17.40%</td>
                </tr>
                <tr>
                    <td>Quad</td>
                    <td>150 / 7776</td>
                    <td>1.93%</td>
                    <td>4.82%</td>
                    <td>9.38%</td>
                </tr>
                <tr>
                    <td>Jackpot!</td>
                    <td>6 / 7776</td>
                    <td>0.08%</td>
                    <td>0.40%</td>
                    <td>1.20%</td>
                </tr>
            </tbody>
        </table>
    )
}