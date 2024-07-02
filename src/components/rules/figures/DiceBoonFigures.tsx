import React, { useState } from "react";
import { GetRerollsForLevel, GetExtraRollsForLevel } from "../../../entities/library/Roller";
import { ThemedRadio } from "../../inputs/radio/ThemedRadio";
import { RulesFigureViewStyle, RulesFigureViewStyleOptions, RulesFiguresConfig } from "./RulesFigures";

type Props = {
    leveledName: string;
    header?: React.ReactNode;
}

export const DiceBoonsPerLevelTable = (props: Props) => {
    const { minLevel, maxLevel, headerSpan } = RulesFiguresConfig;
    const { header, leveledName } = props;
    const levelRows: React.ReactNode[] = [];
    const rerollRows: React.ReactNode[] = [];
    const extraRollRows: React.ReactNode[] = [];

    for (let i = minLevel; i <= maxLevel; i++) {
        levelRows.push(<th key={i}>{i}</th>);
        rerollRows.push(<td key={i}>{GetRerollsForLevel(i)}</td>);
        extraRollRows.push(<td key={i}>{GetExtraRollsForLevel(i)}</td>);
    }

    return (
        <table className="rules-table">
            <thead>
                <tr>
                   <th colSpan={headerSpan}>
                        {header ?? `Dice Boons Per ${leveledName} Level`}
                   </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>{leveledName} Level</th>
                    {levelRows}
                </tr>
                <tr>
                    <th>Die Rerolls</th>
                    {rerollRows}
                </tr>
                <tr>
                    <th>Extra Dice</th>
                    {extraRollRows}
                </tr>
            </tbody>
        </table>
    )
}

export const ExpertiseDiceBoonsTable = () => (
    <table className="rules-table">
        <thead>
            <tr>
                <th colSpan={RulesFiguresConfig.headerSpan}>
                    Dice Boons For Expertise
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th>Character Level</th>
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
            <tr>
                <th>Die Rerolls</th>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>3*</td>
                <td>3*</td>
            </tr>
            <tr>
                <th>Extra Dice</th>
                <td>0</td>
                <td>0</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
                <td>2</td>
            </tr>
            <tr>
                <td colSpan={RulesFiguresConfig.headerSpan}>
                    *This third reroll comes from having advantage. Additional sources of advantage will not provide more rerolls.
                </td>
            </tr>
        </tbody>
    </table>
);

export const DiceBoonsPerLevelFigure = (props: Props) => {
    const [viewStyle, setViewStyle] = useState<RulesFigureViewStyle>('Table View');
    const { header, leveledName } = props;
    const lowerName = leveledName.toLowerCase();
    return (
        <figure>
            <ThemedRadio className="data-adjacent" options={RulesFigureViewStyleOptions}
                selected={RulesFigureViewStyleOptions.first(vs => vs.name == viewStyle)!}
                onChange={(selection) => setViewStyle(selection.name)} />
            {viewStyle == 'Table View' && <DiceBoonsPerLevelTable {...props} />}
            {viewStyle == 'List View' && (
                <>
                    <h4>{header ?? `Dice Boons Per ${leveledName} Level`}</h4>
                    <ul>
                        <li>
                            At a <em>{lowerName} level of 3</em>, you may reroll up to one die when rolling for that {lowerName}.
                        </li>
                        <li>
                            At a <em>{lowerName} level of 5</em>, you may roll one additional die and reroll up to one die when rolling for that {lowerName}.
                        </li>
                        <li>
                            At a <em>{lowerName} level of 7</em>, you may roll one additional die and reroll up to two dice when rolling for that {lowerName}.
                        </li>
                        <li>
                            At a <em>{lowerName} level of 9</em>, you may roll two additional dice and reroll up to two dice when rolling for that {lowerName}.
                        </li>
                    </ul>
                </>
        )}
        </figure>
    );
}