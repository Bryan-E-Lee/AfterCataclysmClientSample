import React from "react";
import { RulesFiguresConfig } from "./RulesFigures";
import { Die } from "../../figures/Die";

export const DungeonRoomTable = () => {
    const { headerSpan } = RulesFiguresConfig;
    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>
                        Dungeon Room Table
                    </th>
                </tr>
                <tr>
                    <th>Roll</th>
                    <th><Die>1</Die></th>
                    <th><Die>2</Die></th>
                    <th><Die>3</Die></th>
                    <th><Die>4</Die></th>
                    <th><Die>5</Die></th>
                    <th><Die>6</Die></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Room Feature</th>
                    <td>Enemy Encounter</td>
                    <td>Environmental Encounter</td>
                    <td>Puzzle</td>
                    <td>Mood Setting</td>
                    <td>Mood Setting</td>
                    <td>Treasure</td>
                </tr>
            </tbody>
        </table>
    )
}

export const DungeonDelvingRoomDetailsList = () => (
    <dl>
        <dt>Enemy Encounter</dt>
        <dd>An encounter with enemies who would be present in the dungeon.</dd>

        <dt>Environmental Encounter</dt>
        <dd>An environmental problem that is solved during an action scene.</dd>

        <dt>Puzzle</dt>
        <dd>Some sort of puzzle that the party must think about how to proceed, but without any need for speed.</dd>

        <dt>Mood Setting</dt>
        <dd>
            A room with nothing especially eventful, but which contains thematic elements that add to the feel of the dungeon or reveal information about its nature.
        </dd>

        <dt>Information</dt>
        <dd>Some key bit of information or loot which will help the party later in the dungeon.</dd>
    </dl>
)