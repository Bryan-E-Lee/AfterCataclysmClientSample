import React from "react";
import { Die } from "../../figures/Die";
import { RulesFiguresConfig } from "./RulesFigures";

export const CrossCountryTravelTable = () => {
    const { headerSpan } = RulesFiguresConfig;
    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>Cross Country Travel Table</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Roll</th>
                    <th className="normal-background"><Die>1</Die></th>
                    <th className="normal-background"><Die>2</Die></th>
                    <th className="normal-background"><Die>3</Die></th>
                    <th className="normal-background"><Die>4</Die></th>
                    <th className="normal-background"><Die>5</Die></th>
                    <th className="normal-background"><Die>6</Die></th>
                </tr>
                <tr>
                    <th>Outcome (Normal Pace)</th>
                    <td>Major Complication</td>
                    <td>Minor Complication</td>
                    <td>Minor Complication</td>
                    <td>Nothing Happens</td>
                    <td>Nothing Happens</td>
                    <td>Minor Boon</td>
                </tr>
                <tr>
                    <th>Outcome (Fast Pace)</th>
                    <td>Major Complication</td>
                    <td>Major Complication</td>
                    <td>Minor Complication</td>
                    <td>Minor Complication</td>
                    <td>Minor Complication</td>
                    <td>Nothing Happens</td>
                </tr>
            </tbody>
        </table>
    )
}

export const CrossCountryMajorComplicationDetailsList = () => (
    <dl>
        <dt>Endemic Enemies Attack!</dt>
        <dd>Enemies native to the area attack the party. The type of enemy will be dependent on where you're traveling through.</dd>

        <dt>Bandits / Highwaymen</dt>
        <dd>A gang of bandits, highwaymen, or any other group of people attack you.</dd>

        <dt>You Stumble On A Fight!</dt>
        <dd>
            Two groups are fighting, and the party isn't one of them! The party will have to navigate between the two groups of NPCs and decide to either side with one, try to bring peace to the situation, or side with neither!
        </dd>

        <dt>Environmental Emergency!</dt>
        <dd>
            An incredible smogstorm appears overhead, boulders come smashing down the ravine, or the nearby dam bursts, releasing a raging river at your party! You'll need to react quickly to get everyone to safety or mitigate the problem.
        </dd>

        <dt>Sidequest!</dt>
        <dd>
            Give players a puzzle, challenge, or promise of wealth via some grim sign. A dead pilgrim's body has a mysterious map pointing elsewhere, a lone knapsack with only a name and a chest sealed tight, whatever hook there is, give the players an incentive to take a risk and deviate from the current path.
        </dd>
    </dl>
)

export const CrossCountryMajorComplicationsTable = () => {
    const { headerSpan } = RulesFiguresConfig;
    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>Major Complications</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Roll</th>
                    <th className="normal-background"><Die>1</Die></th>
                    <th className="normal-background"><Die>2</Die></th>
                    <th className="normal-background"><Die>3</Die></th>
                    <th className="normal-background"><Die>4</Die></th>
                    <th className="normal-background"><Die>5</Die></th>
                    <th className="normal-background"><Die>6</Die></th>
                </tr>
                <tr>
                    <th>Major Complication</th>
                    <td>Endemic Enemies Attack!</td>
                    <td>Endemic Enemies Attack!</td>
                    <td>Bandits / Highwaymen Attack!</td>
                    <td>You Stumble On A Fight!</td>
                    <td>Environmental Emergency!</td>
                    <td>Sidequest!</td>
                </tr>
            </tbody>
        </table>
    )
}

export const CrossCountryMinorComplicationsTable = () => {
    const { headerSpan } = RulesFiguresConfig;
    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>Minor Complications</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Roll</th>
                    <th className="normal-background"><Die>1</Die></th>
                    <th className="normal-background"><Die>2</Die></th>
                    <th className="normal-background"><Die>3</Die></th>
                    <th className="normal-background"><Die>4</Die></th>
                    <th className="normal-background"><Die>5</Die></th>
                    <th className="normal-background"><Die>6</Die></th>
                </tr>
                <tr>
                    <th>Minor Complication</th>
                    <td>Path Blocked</td>
                    <td>Lost</td>
                    <td>Rougher Than Expected</td>
                    <td>Rougher Than Expected</td>
                    <td>Rougher Than Expected</td>
                    <td>Stranger(s) Approach</td>
                </tr>
            </tbody>
        </table>
    )
}

export const CrossCountryMinorComplicationsDetailsList = () => (
    <dl>
        <dt>Path Blocked</dt>
        <dd>
            The party can't leave this terrain the way they wanted as the path is obstructed, they must pick a different direction or go back the way they came. Player competencies may mitigate or outright prevent this from being a problem depending on what blocks their path. They can also spend a full day to circumvent or unblock the path, but must perform all rolls for the day as normal.
        </dd>

        <dt>Lost</dt>
        <dd>
            The party has to roll a d6 to determine which hex they navigate to. If they can't travel there, they roll again until they do. Player competencies may mitigate or outright prevent this from being a problem depending on the nature of the party's misfortune.
        </dd>

        <dt>Rougher Than Expected</dt>
        <dd>
            The path forward isn't clear; maybe the terrain is rugged or the river nearby has flooded. It will cost an additional movement to pass through this terrain. Player competencies may mitigate or outright prevent this from being a problem.
        </dd>

        <dt>Strangers Approach</dt>
        <dd>
            A group of strangers arrives. Depending on their disposition, saying the wrong thing may start a fight, saying the right thing might benefit you with valuable information or resources.
        </dd>
    </dl>
)

export const CrossCountryEnvironmentalComplicationsTable = () => {
    const { headerSpan } = RulesFiguresConfig;
    return (
        <table className="rules-table">
            <thead>
                <tr>
                    <th colSpan={headerSpan}>Environmental Complications</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>Roll</th>
                    <th className="normal-background"><Die>1</Die></th>
                    <th className="normal-background"><Die>2</Die></th>
                    <th className="normal-background"><Die>3</Die></th>
                    <th className="normal-background"><Die>4</Die></th>
                    <th className="normal-background"><Die>5</Die></th>
                    <th className="normal-background"><Die>6</Die></th>
                </tr>
                <tr>
                    <th>Complication</th>
                    <td>Light Rain / Snow / Dust Storm</td>
                    <td>Light Rain/ Snow / Dust Storm</td>
                    <td>Light Rain/ Snow / Dust Storm</td>
                    <td>Light Smogstorm</td>
                    <td>Light Smogstorm</td>
                    <td>Heavy Fog / Ash</td>
                </tr>
            </tbody>
        </table>
    )
}

export const CrossCountryEnvironmentalComplicationsDetailsList = () => (
    <dl>
        <dt>Light Rain / Snow / Dust Storm</dt>
        <dd>
            It begins to lightly rain or an alternative weather condition that's appropriate to the region. Continuing to travel in average or poor spirits costs an additional hex of movement.
        </dd>

        <dt>Light Smogstorm</dt>
        <dd></dd>
    </dl>
)

export const CrossCountryMoraleDetailsList = () => (
    <dl>
        <dt>Good Spirits</dt>
        <dd>
            Being in <em>Good Spirits</em> means the party is optimistic about what lies ahead; you venture into the unknown confident that you'll be able to handle whatever is in your way. When the party is in Good Spirits, once per scene, characters in the party may give themselves advantage on a challenge or action scene roll. Parties are in good spirits whenever they leave a settlement well supplied and rested.
        </dd>

        <dt>Average Spirits</dt>
        <dd>
            Being in <em>Average Spirits</em> means the party is about neutral with regards to the challenges they'll face in the future.
        </dd>

        <dt>Poor Spirits</dt>
        <dd>
            Being in <em>Poor Spirits</em> means the party feels as though their travels will not be good or actively harmful. When the Party is in Poor Spirits, they have disadvantage on the first challenge or action scene roll they perform each scene.
        </dd>
    </dl>
)