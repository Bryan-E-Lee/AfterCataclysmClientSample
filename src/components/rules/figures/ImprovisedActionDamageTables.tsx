import React from "react";
import { RulesFiguresConfig } from "./RulesFigures";

export const ImprovisedActionDamageTable = () => (
    <table className="rules-table">
        <thead>
            <tr>
                <th colSpan={RulesFiguresConfig.headerSpan}>
                    Average Improvised Action Damage Per Hand
                </th>
            </tr>
            <tr>
                <th>Rolled Hand</th>
                <th>Average Damage</th>
                <th>Average Damage (AOE / Extra Effects)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Bust</th>
                <td>6</td>
                <td>4</td>
            </tr>
            <tr>
                <th>Pair</th>
                <td>8</td>
                <td>6</td>
            </tr>
            <tr>
                <th>Two-Pair</th>
                <td>8</td>
                <td>6</td>
            </tr>
            <tr>
                <th>Triple</th>
                <td>10</td>
                <td>8</td>
            </tr>
            <tr>
                <th>Small Straight</th>
                <td>12</td>
                <td>10</td>
            </tr>
            <tr>
                <th>Flush</th>
                <td>12</td>
                <td>10</td>
            </tr>
            <tr>
                <th>Full House</th>
                <td>16</td>
                <td>12</td>
            </tr>
            <tr>
                <th>Big Straight</th>
                <td>18</td>
                <td>14</td>
            </tr>
            <tr>
                <th>Quad</th>
                <td>22</td>
                <td>16</td>
            </tr>
            <tr>
                <th>Jackpot!</th>
                <td>24</td>
                <td>18</td>
            </tr>
        </tbody>
    </table>
);