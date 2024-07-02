import React, { useState } from "react"
import { RulesFiguresConfig, RulesTableViewStyle, RulesTableViewStyleOptions } from "./RulesFigures";
import { ThemedRadio } from "../../inputs/radio/ThemedRadio";

export const RhetoricLevelingTable = () => {
    const { minLevel, maxLevel, headerSpan } = RulesFiguresConfig;

    const [viewStyle, setViewStyle] = useState<RulesTableViewStyle>('Horizontal View');

    const characterRows: React.ReactNode[] = [];
    const primaryRows: React.ReactNode[] = [];
    const secondaryRows: React.ReactNode[] = [];
    const tertiaryRows: React.ReactNode[] = [];

    const columns: React.ReactNode[] = [];

    for (let i = minLevel; i <= maxLevel; i++) {
        const charCell = <th>{i}</th>;
        const primaryCell = <td>{Math.ceil(i / 3) + 1}</td>;
        const secondaryCell = <td>{Math.ceil(i / 4)}</td>;
        const tertiaryCell = <td>{Math.ceil(i / 5)}</td>;

        characterRows.push({...charCell, key: i });
        primaryRows.push({...primaryCell, key: i});
        secondaryRows.push({...secondaryCell, key: i});
        tertiaryRows.push({...tertiaryCell, key: i});

        columns.push(<tr key={i}>{charCell}{primaryCell}{secondaryCell}{tertiaryCell}</tr>);
    }
    return (
        <figure>
            <ThemedRadio className="data-adjacent" options={RulesTableViewStyleOptions}
                selected={RulesTableViewStyleOptions.first(vs => vs.name == viewStyle)!}
                onChange={(selection) => setViewStyle(selection.name)} />
            {viewStyle == "Horizontal View" &&
                <table className="rules-table">
                    <thead>
                        <tr>
                            <th colSpan={headerSpan}>
                                Rhetoric Levels Per Character Level
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="heading">Character Level</th>
                            {characterRows}
                        </tr>
                        <tr>
                            <th className="heading">Primary Rhetoric Level</th>
                            {primaryRows}
                        </tr>
                        <tr>
                            <th className="heading">Secondary Rhetoric Level</th>
                            {secondaryRows}
                        </tr>
                        <tr>
                            <th className="heading">Tertiary Rhetoric Level</th>
                            {tertiaryRows}
                        </tr>
                    </tbody>
                </table>
            }
            {viewStyle == "Vertical View" &&
                <table className="rules-table">
                    <thead>
                        <tr>
                            <th colSpan={headerSpan}>
                                Rhetoric Levels Per Character Level
                            </th>
                        </tr>
                        <tr>
                            <th>Character Level</th>
                            <th>Primary Rhetoric Level</th>
                            <th>Secondary Rhetoric Level</th>
                            <th>Tertiary Rhetoric Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {columns}
                    </tbody>
                </table>
            }
        </figure>
    )
}