import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Adventure } from "../../../entities/adventures/Adventure"
import { CharacterInitializer } from "../../../entities/characters/Character"
import { UserAccount } from "../../../entities/user/UserAccount"
import { ApplicationState } from "../../../store/stores/ApplicationState"
import { CharacterActions } from "../../../store/stores/collection/characters/CharacterStore.Actions"
import { UserActions } from "../../../store/stores/users/UserStore.Actions"

type Props = { adventure: Adventure }

export const Adventurers: React.FC<Props> = (props: Props) => {
    const { adventure } = props;
    const { me, users } = useSelector((app: ApplicationState) => app.user);
    const { characters, otherPlayerCharacters} = useSelector((app: ApplicationState) => app.character);
    const dispatch = useDispatch();
    const allPlayerIds = [...adventure.playerIds, adventure.ownerId];
    
    useEffect(() => {
        const otherUserIds = allPlayerIds.filter(id => id != me?.id);
        dispatch(UserActions.getUsersByIds(...otherUserIds));
    }, [dispatch, me]);

    useEffect(() => {
        dispatch(CharacterActions.getCharacters());
        dispatch(CharacterActions.getCharactersByIds(adventure.characterIds));
    }, [dispatch, adventure.characterIds]);
    
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
                <label className="standout">Game Master:</label> {owner.displayName}
            </div>
            <div>
                <label className="standout">Players:</label>
                {!players.any() && 'No players yet!'}
                {players.map(p => <AdventurePlayer key={p.id} player={p} characters={adventureCharacters} />)}
            </div>
        </div>
    )
}

type PlayerProps = { player: UserAccount, characters: CharacterInitializer[] }
const AdventurePlayer: React.FC<PlayerProps> = (props: PlayerProps) => {
    const { player, characters } = props;
    const character = characters.find(c => c.ownerId == player.id);
    const displayName = player.displayName ?? 'Anonymous';
    if (character == null) {
        return (
            <div>
                <label>{displayName}</label>
                <div>
                    {displayName} doesn't have a character for this campaign yet.
                </div>
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