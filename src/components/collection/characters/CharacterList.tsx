import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { ThemedButton } from '../../inputs/buttons/ThemedButton';
import { CharacterActions } from '../../../store/stores/collection/characters/CharacterStore.Actions';
import { Confirm } from "../../theming/confirm/Confirm";
import { CharacterInitializer } from "../../../entities/characters/Character";
import { Loader } from "../../theming/loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export const CharacterListComponent: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deleteCharacter, setDeleteCharacter] = useState<CharacterInitializer | null>(null);
    const { characters, loaded } = useSelector((state: ApplicationState) => state.character);
    let unnamedCharacterCount = 0;
    characters.sort((c1, c2) => c1.created > c2.created ? 1 : c2.created > c1.created ? -1 : 0);

    const onDelete = () => {
        dispatch(CharacterActions.deleteCharacter(deleteCharacter!));
        setDeleteCharacter(null);
    }
    return (
        <>
            <h1>My Characters</h1>
            <div>
                <ThemedButton onClick={() => dispatch(CharacterActions.createNewCharacter((id: string) => navigate(`${id}/Edit`)))}>Create New Character</ThemedButton>
            </div>
            {!loaded && <Loader>
                Loading Characters...
            </Loader>}
            <ul className='owned-list'>
                {characters.map(character => {
                    const name = character.name.trim() == ''
                        ? `Unnamed Character ${++unnamedCharacterCount}`
                        : character.name;
                    return (
                        <li key={character.id}>
                            <Link to={`/Characters/${character.id}`} key={character.id}>
                                {name}
                            </Link>
                            {character.deleting && <Loader textSized />}
                            &nbsp;
                            <ThemedButton onClick={() => setDeleteCharacter(character)} disabled={character.deleting}>
                                Delete
                            </ThemedButton>
                        </li>
                    );
                })}
            </ul>
            {deleteCharacter && (
                <Confirm onConfirm={onDelete} onCancel={() => setDeleteCharacter(null)}>
                    Are you sure you want to delete <em className="standout">{deleteCharacter.name}</em>? This action cannot be undone.
                </Confirm>
            )}
        </>
    );
}