import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Adventure } from "../../../entities/adventures/Adventure"
import { CharacterInitializer } from "../../../entities/characters/Character"
import { UserAccount } from "../../../entities/user/UserAccount"
import { ApplicationState } from "../../../store/stores/ApplicationState"
import { CharacterActions } from "../../../store/stores/collection/characters/CharacterStore.Actions"

type Props = { adventure: Adventure }

export const Adventurers: React.FC<Props> = (props: Props) => {
    const { adventure } = props;
    const { me, users } = useSelector((app: ApplicationState) => app.user);
    const { characters, otherPlayerCharacters} = useSelector((app: ApplicationState) => app.character);
    const dispatch = useDispatch();
    
    if (me == null) {
        return null;
    }
    const allUsers = [...users, me];
    const owner = allUsers.find(u => u.id == adventure.ownerId);
    if (owner == null) {
        return null;
    }
    const players = allUsers.filter(u => adventure.playerIds.contains(u.id));
    const adventureCharacters = [...characters, ...otherPlayerCharacters].filter(c => adventure.playerIds.contains(c.id));
    return (
        <div>
            <div>
                <label className="standout">Game Master:</label> {owner.name}
            </div>
            <div>
                <label className="standout">Players:</label>
                {!players.any() && 'No players yet!'}
                {players.map(p => <AdventurePlayer key={p.id} me={me} player={p} characters={adventureCharacters} />)}
            </div>
        </div>
    )
}

type PlayerProps = { me: UserAccount, player: UserAccount, characters: CharacterInitializer[] }
const AdventurePlayer: React.FC<PlayerProps> = (props: PlayerProps) => {
    const { me, player, characters } = props;
    const character = characters.find(c => c.ownerId == player.id);
    const isPlayer = me.id == player.id;
    let displayName: string;
    if (isPlayer) {
        displayName = "You";
    }
    else {
        displayName = player.name != "" ? player.name : 'Anonymous';
    }
    if (character == null) {
        return (
            <div>
                <label>{displayName}</label> - {displayName} {isPlayer ? "don't" : "doesn't"} have a character for this adventure yet.
            </div>
        );
    }
    return (
        <div>
            <label>{displayName}</label>
            <div>
                <label>{character.name}</label>
                <div>lv. {character.level} {character.kinship} {character.className}</div>
            </div>
        </div>
    );
}