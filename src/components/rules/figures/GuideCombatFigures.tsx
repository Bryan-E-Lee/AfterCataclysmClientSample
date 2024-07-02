import React from "react"
import { RulesFiguresConfig } from "./RulesFigures";

export const ComplicationsTable = () => {
    const { headerSpan } = RulesFiguresConfig;
    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>
                        Complications Available By Hand
                    </th>
                </tr>
                <tr>
                    <th>Hand</th>
                    <th>Minor Complications</th>
                    <th>Major Complications</th>
                    <th>Legendary Complications</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Bust</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Pair</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Two-Pair</th>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Triple</th>
                    <td>1</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Small Straight</th>
                    <td>2</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Flush</th>
                    <td>1</td>
                    <td>1</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Full House</th>
                    <td>0</td>
                    <td>2</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Big Straight</th>
                    <td>1</td>
                    <td>2</td>
                    <td>0</td>
                </tr>
                <tr>
                    <th>Quad</th>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                </tr>
                <tr>
                    <th>Jackpot!</th>
                    <td>0</td>
                    <td>2</td>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    );
}

export const EnemyEmpowermentTable = () => {
    const { headerSpan } = RulesFiguresConfig;
    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>
                        Enemy Action Empowerment Roll
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Roll</th>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                </tr>
                <tr>
                    <th>Empowerment</th>
                    <td>Disempowered</td>
                    <td>Disempowered</td>
                    <td>Unempowered</td>
                    <td>Unempowered</td>
                    <td>Empowered</td>
                    <td>Empowered</td>
                </tr>
            </tbody>
        </table>
    )
}