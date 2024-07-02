import React from "react";
import { RulesFiguresConfig } from "./RulesFigures";
import { Die } from "../../figures/Die";

export const CharacterMotivationsTable = () => (
    <table className="themed-table">
        <thead>
            <tr>
                <th colSpan={RulesFiguresConfig.headerSpan}>Character Goals and Motivations (1d10)</th>
            </tr>
            <tr>
                <th>Roll</th>
                <th>Goal / Motivation</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th className="normal-background"><Die>1</Die></th>
                <td>
                    I'm determined to do what's necessary to bring order back to the earth.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>2</Die></th>
                <td>
                    I'm a protector/nurturer at heart; it pains me to see good people suffering.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>3</Die></th>
                <td>
                    I get a sense of belonging spending time with others. I want to learn all about the different people of the earth.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>4</Die></th>
                <td>
                    I want everyone to know my name. There's glory to be had in fame or infamy.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>5</Die></th>
                <td>
                    Resources are scarce; pursuit of wealth is the best motivator of all.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>6</Die></th>
                <td>
                    I'm aimless: I've lost all the people in my past and I'm searching for purpose and meaning.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>7</Die></th>
                <td>
                    Something horrible happened to me in the past and I won't allow it to happen again.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>8</Die></th>
                <td>
                    There's so much out in the world to explore and I've got to see as much of it as I can!
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>9</Die></th>
                <td>
                    I'm searching for lost or ancient knowledge and I'll do almost anything to attain it.
                </td>
            </tr>
             <tr>
                <th className="normal-background"><Die>0</Die></th>
                <td>
                    My people are counting on me to succeed on a special mission. I won't fail them.
                </td>
             </tr>
        </tbody>
    </table>
)

export const CharacterFlawsTable = () => (
    <table className="themed-table">
        <thead>
            <tr>
                <th colSpan={RulesFiguresConfig.headerSpan}>Character Flaws (1d8)</th>
            </tr>
            <tr>
                <th>Roll</th>
                <th>Flaw</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th className="normal-background"><Die>1</Die></th>
                <td>
                    I'm seeking revenge for something in my past, and I don't care what price I have to pay to exact vengeance.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>2</Die></th>
                <td>
                    I get too caught up in my work to the detriment of my relationships with others. It's hard for me to relax and socialize.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>3</Die></th>
                <td>
                    I often forget that I owe a great deal of my success to others; my pride won't allow me to share the glory.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>4</Die></th>
                <td>
                    I don't like taking responsibility for things. I would rather shift the blame than accept the consequences of my actions.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>5</Die></th>
                <td>
                    I focus too much on small problems and usually miss the bigger picture.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>6</Die></th>
                <td>
                    I need instant gratification and will actively push for something to happen even when patience is the more prescient decision.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>7</Die></th>
                <td>
                    I lack confidence in myself and find the threat of failure daunting.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>8</Die></th>
                <td>
                    The world was destroyed long ago, I have a hard time seeing the point in trying to improve things today.
                </td>
            </tr>
        </tbody>
    </table>
)

export const ConflictResponsesTable = () => (
    <table className="themed-table">
        <thead>
            <tr>
                <th colSpan={RulesFiguresConfig.headerSpan}>Conflict Responses (1d6)</th>
            </tr>
            <tr>
                <th>Roll</th>
                <th>Conflict Response</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th className="normal-background"><Die>1</Die></th>
                <td>
                    I prefer to pursue diplomatic resolutions to avoid confict; it's better to make friends than enemies.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>2</Die></th>
                <td>
                    One needs to be quick and aggressive when responding to conflict. An overwhelming show of force or intimidation will ensure that nobody decides to challenge you again.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>3</Die></th>
                <td>
                    Avoiding conflict through resourceful thinking is my go-to solution. There's almost always a solution we haven't thought of yet. 
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>4</Die></th>
                <td>
                    I actually enjoy conflict: it allows for change and permits people to express their grievances.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>5</Die></th>
                <td>
                    Conflict presents opportunity. More opportunities for me to get something I want out of the process.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>6</Die></th>
                <td>
                    It's better to avoid conflict and keep those you care about safe. There's no need to get involved in problems that aren't ours yet.
                </td>
            </tr>
        </tbody>
    </table>
)

export const WorldPerspectivesTable = () => (
    <table className="themed-table">
        <thead>
            <tr>
                <th colSpan={RulesFiguresConfig.headerSpan}>World Perspectives (1d6)</th>
            </tr>
            <tr>
                <th>Roll</th>
                <th>Perspective</th>
            </tr>
        </thead>
        <tbody>            
            <tr>
                <th className="normal-background"><Die>1</Die></th>
                <td>
                    The world is a rough and tumble place fit only for those who can stand in the mud.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>2</Die></th>
                <td>
                    People are ultimately good, sometimes they just need a little help.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>3</Die></th>
                <td>
                    The world sucks now but we can continue working to make it better.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>4</Die></th>
                <td>
                    Nobody is going to look out for you so you need to be able to look out for yourself.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>5</Die></th>
                <td>
                    There's only so much time in a day so let's make the most of every second.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>6</Die></th>
                <td>
                    Great deeds and leading by example gives everyone the tools they need to improve their wellbeing.
                </td>
            </tr>
        </tbody>
    </table>
)


export const MajorLifeExperiencesTable = () => (
    <table className="themed-table">
        <thead>
            <tr>
                <th colSpan={RulesFiguresConfig.headerSpan}>Major Life Events (1d8)</th>
            </tr>
            <tr>
                <th>Roll</th>
                <th>Major Life Event</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th className="normal-background"><Die>1</Die></th>
                <td>
                    Some or all of my family was killed by raiders when I was younger.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>2</Die></th>
                <td>
                    I grew up on a farm or ranch which endured through several droughts and smogstorms.   
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>3</Die></th>
                <td>
                    I was fortunate enough to be born into an aristocratic family of a major province or city state and experience political life.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>4</Die></th>
                <td>
                    My family traveled frequently as traders, exposing me to different ideas and cultures.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>5</Die></th>
                <td>
                    I participated with a major research team at a magic academy as part of my studies there.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>6</Die></th>
                <td>
                    Someone owes me a big favor after I saved their life long ago.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>7</Die></th>
                <td>
                    I used to be a part of a criminal organization, but I was able to get out unscathed.
                </td>
            </tr>
            <tr>
                <th className="normal-background"><Die>8</Die></th>
                <td>
                    I was once captured by ogres and managed to escape.
                </td>
            </tr>
        </tbody>
    </table>
)