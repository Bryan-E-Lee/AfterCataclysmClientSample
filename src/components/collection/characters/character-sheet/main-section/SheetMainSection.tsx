import './sheet-main-section.scss';
import React, { useState } from "react";
import { Character } from "../../../../../entities/characters/Character";
import { DiceHandsIcon, AttacksIcon, SpellsIcon, FeaturesIcon, EquipmentIcon, PassivesIcon, ReactionsIcon, MinionsIcon } from "../../../../icons";
import { ThemedRadio } from "../../../../inputs/radio/ThemedRadio";
import { SheetEquipment } from "./equipment/SheetEquipment";
import { Passives } from "./Passives";
import { Reactions } from "./Reactions";
import { ItemEditor } from '../abilities-equipment/item-editor';
import { ActiveAbilitiesByHandComponent } from './ActiveAbilitiesByHandComponent';
import { HordeComponent } from './minions/Horde';
import { CharacterAbilitiesView } from './CharacterAbilitiesView';

type Props = {
    character: Character;
    viewOnMobile: boolean;
}

export const SheetMainSection: React.FC<Props> = (props: Props) => {
    const { character, viewOnMobile } = props;

    const EquipmentViewOption = {
        name: 'Equipment',
        display: <EquipmentIcon />
    }
    
    const HandViewOption = {
        name: 'Roll Actions',
        display: <DiceHandsIcon />
    }
    
    const AttackViewOption = {
        name: 'Attacks',
        display: <AttacksIcon />,
        disabled: !character.attacks.any()
    }
    
    const SpellViewOption = {
        name: 'Spells',
        display: <SpellsIcon />,
        disabled: !character.spells.any()
    }
    
    const FeaturesViewOption = {
        name: 'Features',
        display: <FeaturesIcon />,
        disabled: !character.features.any()
    }
    
    const PassivesViewOption = {
        name: 'Passives',
        display: <PassivesIcon />,
        disabled: !character.passives.any()
    }
    
    const ReactionsViewOption = {
        name: 'Reactions',
        display: <ReactionsIcon />,
        disabled: !character.reactions.any()
    }

    const MinionsViewOption = {
        name: 'Horde',
        display: <MinionsIcon />,
        disabled: character.maxHordeSize <= 0
    }
    
    const DisplayOptions = [
        EquipmentViewOption,
        HandViewOption,
        AttackViewOption,
        SpellViewOption,
        FeaturesViewOption,
        ReactionsViewOption,
        PassivesViewOption,
        MinionsViewOption,
    ];
    
    const [viewStyle, setViewStyle] = useState<string>(EquipmentViewOption.name);
    let selected;
    for (let element of DisplayOptions) {
        if (element.name == viewStyle) {
            selected = element;
            break;
        }
    }

    return (
        <div className={`sheet-main-section sheet-section ${viewOnMobile ? 'viewing' : 'unviewing'}`}>
            <ThemedRadio options={DisplayOptions} selected={selected ?? HandViewOption}
                onChange={(selected) => setViewStyle(selected.name)} showName />

            <div className='character-abilities'>
                {viewStyle == EquipmentViewOption.name && <SheetEquipment character={character} />}
                {viewStyle == HandViewOption.name && <ActiveAbilitiesByHandComponent character={character} activeAbilities={character.actions} />}
                {viewStyle == AttackViewOption.name && <CharacterAbilitiesView character={character} abilities={character.attacks} />}
                {viewStyle == SpellViewOption.name && <CharacterAbilitiesView character={character} abilities={character.spells} />}
                {viewStyle == FeaturesViewOption.name && <CharacterAbilitiesView character={character} abilities={character.features} />}
                {viewStyle == PassivesViewOption.name && <Passives passives={character.passives} />}
                {viewStyle == ReactionsViewOption.name && <Reactions character={character} reactions={character.reactions} />}
                {viewStyle == MinionsViewOption.name && <HordeComponent character={character} minions={character.minions.collection} />}
            </div>
            <ItemEditor character={props.character} />
        </div>
    );
}