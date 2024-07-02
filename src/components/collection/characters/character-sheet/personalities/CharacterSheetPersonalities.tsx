import './character-sheet-personalities.scss';
import React, { useEffect, useState } from "react";
import { PersonalityInitializer } from "../../../../../entities/library/socials/Personality";
import { BreakdownWindow } from '../../../../theming/breakdown-window';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../../../store/stores/ApplicationState';
import { Character } from '../../../../../entities/characters/Character';
import { PersonalityOption } from '../../character-wizard/personality-wizard/PersonalityOption';
import { LibraryActions } from '../../../../../store/stores/library/LibraryStore.Actions';

type Props = {
    character: Character;
    viewOnMobile: boolean;
}

type State = {
    filter: string;
    editing: boolean;
}

export const CharacterSheetPersonalities: React.FC<Props> = (props: Props) => {
    const { character, viewOnMobile } = props;

    const dispatch = useDispatch();
    const [state, setState] = useState<State>({
        filter: '',
        editing: false,
    });

    let { personalities, allPersonalitiesLoaded } = useSelector((app: ApplicationState) => app.library);
    personalities = personalities.filter(p => state.filter == '' || p.name.toLowerCase().indexOf(state.filter.toLowerCase()) > -1);

    useEffect(() => {
        if (!allPersonalitiesLoaded) {
            dispatch(LibraryActions.loadPersonalities());
        }
    }, [dispatch, allPersonalitiesLoaded]);

    const positivePersonalities = personalities.filter(p => p.positive);
    const negativePersonalities = personalities.filter(p => !p.positive);

    return (
        <>
            <button className={`character-sheet-personalities sheet-section interactable-button ${viewOnMobile ? 'viewing' : 'unviewing'}`}
                onClick={() => setState({ ...state, editing: true })}>
                <h3 className="character-panel-header">Personalities</h3>
                <div className='personalities'>
                    {character.personalities.collection.map(p => p.name).join(', ')}
                </div>
            </button>

            <BreakdownWindow heading={<h1>Manage Personalities</h1>} visible={state.editing}
                close={() => setState({ ...state, editing: false })}>
                <div>
                    <label>Filter:</label>&nbsp;
                    <input type='text' value={state.filter} onChange={(e) => setState({ ...state, filter: e.target.value})} />
                </div>
                <h3>Positive</h3>
                {mapPersonalities(character, positivePersonalities)}
                <h3>Negative</h3>
                {mapPersonalities(character, negativePersonalities)}
            </BreakdownWindow>
        </>
    );
}

const mapPersonalities = (character: Character, personalities: PersonalityInitializer[]) => {
    return personalities.map(personality => (
        <PersonalityPreview key={personality.id} character={character} personality={personality} />
    ));
}

type PreviewProps = { character: Character, personality: PersonalityInitializer }
const PersonalityPreview: React.FC<PreviewProps> = (props: PreviewProps) => {
    return (
        <PersonalityOption character={props.character} personality={props.personality} />
    )
}