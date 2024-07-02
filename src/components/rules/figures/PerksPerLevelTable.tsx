import React from "react";
import { RulesFiguresConfig } from "./RulesFigures";

export const PerksPerLevelTable = () => {
    const { minLevel, maxLevel, headerSpan } = RulesFiguresConfig;
    const levelRows: React.ReactNode[] = [];
    const perkRows: React.ReactNode[] = [];

    for (let i = minLevel; i <= maxLevel; i++) {
        levelRows.push(<th key={i}>{i}</th>);
        perkRows.push(<td key={i}>{Math.floor(i / 2)}</td>);
    }

    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>
                        Perks per Level
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Character Level</th>
                    {levelRows}
                </tr>
                <tr>
                    <th>Total Perks</th>
                    {perkRows}
                </tr>
            </tbody>
        </table>
    );
}