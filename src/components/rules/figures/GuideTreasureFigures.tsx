import React from "react";
import { RulesFiguresConfig } from "./RulesFigures";

export const ChipValueByLevelTable = () => {
    const { headerSpan } = RulesFiguresConfig;
    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>Character Level</th>
                </tr>
                <tr>
                    <th></th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Total Chip Value</th>
                    <td>100</td>
                    <td>200</td>
                    <td>500</td>
                    <td>1,000</td>
                    <td>2,000</td>
                    <td>5,000</td>
                    <td>15,000</td>
                    <td>20,000</td>
                    <td>30,000</td>
                    <td>50,000</td>
                </tr>
            </tbody>
        </table>
    )
}