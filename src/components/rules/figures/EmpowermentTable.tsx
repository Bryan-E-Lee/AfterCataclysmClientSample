import React from "react";
import { RulesFiguresConfig } from "./RulesFigures";

type Props = {
    header: React.ReactNode;
    bonusLabel?: React.ReactNode;
}

export const EmpowermentTable = (props: Props) => {
    const { minLevel, maxLevel, headerSpan } = RulesFiguresConfig;
    const { header, bonusLabel } = props;
    const levelRows: React.ReactNode[] = [];
    const bonusRows: React.ReactNode[] = [];

    for (let i = minLevel; i <= maxLevel; i++) {
        levelRows.push(<th key={i}>{i}</th>);
        bonusRows.push(<td key={i}>+{Math.floor(i / 2)}</td>)
    }

    return (
        <table className='rules-table'>
            <thead>
                <tr>
                    <th colSpan={headerSpan}>
                        {header}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Skill Level</th>
                    {levelRows}
                </tr>
                <tr>
                    <th>{bonusLabel ?? "Empowerment Bonus"}</th>
                    {bonusRows}
                </tr>
            </tbody>
        </table>
    );
}