import React, { useState } from "react";
import { RulesFiguresConfig, RulesFigureViewStyle, RulesFigureViewStyleOptions } from "./RulesFigures";
import { ThemedRadio } from "../../inputs/radio/ThemedRadio";

export const RollValuesTable = () => {
    const { headerSpan } = RulesFiguresConfig;
    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>Rolls by Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Roll</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Bust</td>
                    <td>1</td>
                </tr>
                <tr>
                    <td>Pair</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>Two Pair</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>Triple (Three-of-a-Kind)</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>Small Straight</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>Flush</td>
                    <td>6</td>
                </tr>
                <tr>
                    <td>Full House</td>
                    <td>7</td>
                </tr>
                <tr>
                    <td>Big Straight</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td>Quad (Four-of-a-Kind)</td>
                    <td>9</td>
                </tr>
                <tr>
                    <td>Jackpot! (Five-of-a-Kind)</td>
                    <td>10</td>
                </tr>
            </tbody>
        </table>
    );
}

export const RollValuesFigure = () => {
    const [viewStyle, setViewStyle] = useState<RulesFigureViewStyle>('Table View');
    return (
        <figure>
            <ThemedRadio className="data-adjacent" options={RulesFigureViewStyleOptions}
                selected={RulesFigureViewStyleOptions.first(vs => vs.name == viewStyle)!}
                onChange={(selection) => setViewStyle(selection.name)} />
            {viewStyle == 'Table View' && <RollValuesTable />}
            {viewStyle == 'List View' && (
                <ol>
                    <li>Bust</li>
                    <li>Pair</li>
                    <li>Two Pair</li>
                    <li>Triple (Three-of-a-Kind)</li>
                    <li>Small Straight</li>
                    <li>Flush</li>
                    <li>Full House</li>
                    <li>Big Straight</li>
                    <li>Quad (Four-of-a-Kind)</li>
                    <li>Jackpot! (Five-of-a-Kind)</li>
                </ol>
            )}
        </figure>
    )
}