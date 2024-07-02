import React from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../entities/characters/Character";
import { PersonalityInitializer } from "../../../../../entities/library/socials/Personality";
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { ThemedCheckbox } from "../../../../inputs/checkbox/ThemedCheckbox";

type Props = {
    personality: PersonalityInitializer;
    character: Character;
}

export const PersonalityHeader: React.FC<Props> = (props: Props) => {
    const { character, personality } = props;
    const dispatch = useDispatch();
    
    const mappedPersonality = character.personalities.collection.find(p => p.id == personality.id);
    const alreadySelected = mappedPersonality != null;

    const toggle = (checked: boolean) => {
        if (checked) {
            dispatch(SheetActions.addPersonality(character, personality));
        }
        else {
            dispatch(SheetActions.removePersonality(character, mappedPersonality!));
        }
    }

    return (
        <>
            <span className="name flex-fill">{personality.name}</span>
            <ThemedCheckbox checked={alreadySelected} setChecked={toggle} suppressBubble />
        </>
    );
}