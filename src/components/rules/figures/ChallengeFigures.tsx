import React from "react";
import { RulesFiguresConfig } from "./RulesFigures";

export const ChallengeDifficultyTable = () => {
    const { headerSpan } = RulesFiguresConfig;
    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>
                        GM Dice Boons for Challenge Difficulty
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Difficulty</th>
                    <th>Easy</th>
                    <th>Moderate</th>
                    <th>Difficult</th>
                    <th>Masterful</th>
                    <th>Impossible</th>
                </tr>
                <tr>
                    <th>Die Rerolls</th>
                    <td>0</td>
                    <td>1</td>
                    <td>1</td>
                    <td>2</td>
                    <td>2</td>
                </tr>
                <tr>
                    <th>Extra Dice</th>
                    <td>0</td>
                    <td>0</td>
                    <td>1</td>
                    <td>1</td>
                    <td>2</td>
                </tr>
            </tbody>
        </table>
    );
}