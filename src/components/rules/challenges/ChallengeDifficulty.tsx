import React from "react";
import { ArticleNavLink } from "../../articles/navigation/article-navigation/ArticleNavLink";
import { GMNote } from "../../directives/Directives";
import { ChallengeDifficultyTable } from "../figures/ChallengeFigures";

export const ChallengeDifficultyRulesLink = new ArticleNavLink({
    name: 'Challenge Difficulty',
    path: '#ChallengeDifficulty',
    render: () => <ChallengeDifficultyRules />
});

const ChallengeDifficultyRules: React.FC = () => (
    <section id={ChallengeDifficultyRulesLink.hash}>
        <h2>{ChallengeDifficultyRulesLink.name}</h2>
        <p>
            After issuing a challenge, your GM will decide on a difficulty for it. The difficulty of the challenge will determine how many dice boons the GM will use when opposing the player's rhetoric, skill, or competency. Challenges can have the following difficulties:
        </p>
        <ol>
            <li>
                <strong>Easy.</strong> The GM will not reroll any dice when the player is faced with an easy task. Characters with a skill of 1&ndash;2 have a 50/50 chance to succeed on an easy challenge. An easy athletics check might be throwing a grappling hook over a short wall.
            </li>
            <li>
                <strong>Moderate.</strong> The GM may reroll up to one of their initial dice when presenting players with moderate challenges. Characters with a skill of 3&ndash;4 have 50/50 odds to succeed on a moderate challenge. A moderate engineering challenge might involve patching and repairing a broken gearbox in a robot.
            </li>
            <li>
                <strong>Difficult.</strong> The GM will roll an additional die and reroll up to one of their initial dice when the player is faced with a difficult task. Characters with a skill of 5&ndash;6 have 50/50 odds to succeed on a difficult challenge. A difficult medicine challenge might involve purifying a sample of experimental drugs.
            </li>
            <li>
                <strong>Masterful.</strong> The GM will roll an additional die and reroll up to two of their initial dice when the player is faced with a masterful task. Characters with a skill of 7&ndash;8 have 50/50 odds to succeed on a masterful challenge. A masterful athletics check might involve scaling a building by leaping from walls and small footholds.
            </li>
            <li>
                <strong>Impossible.</strong> The GM will roll two additional dice and and reroll up to two of their initial dice when the player is faced with an impossible task. Characters with a skill of 9&ndash;10 have about 50/50 odds to succeed on an impossible challenge. An impossible subterfuge check might involve sneaking past a hundred trained guards, motion sensors, and infra-red cameras. Impossible challenges should be truly extraordinary; even the best of the best only have a coin flip's chance at success!
            </li>
        </ol>
        <p>
            Below is a table indicating the number of extra dice rolled and dice the GM may reroll when presenting characters with challenges of different difficulties:
        </p>
        <ChallengeDifficultyTable />
        <GMNote>
            Don't make players perform challenges for trivial things. A challenge should only be involved when there is some possibility of and consequence for failing or some possibility of and consequence for success. Think about what might actually present a challenge to a player and whether or not a challenge is appropriate. You should generally avoid issuing easy challenges to players with an 8 in the appropriate rhetoric, skill, or competency. Likewise, you might simply avoid issuing an impossible challenge to a character with a poor rhetoric, skill, or competency.
        </GMNote>
    </section>
)