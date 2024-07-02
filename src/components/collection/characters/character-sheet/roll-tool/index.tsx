import './roll-tool.scss';
import React, { useState } from "react";
import { Character } from '../../../../../entities/characters/Character';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../../store/stores/ApplicationState';
import { RollIcon } from '../../../../icons/CharacterIcons';
import { BreakdownWindow } from '../../../../theming/breakdown-window';
import { CommunalRolls } from './CommunalRolls';
import { RolledHand } from './RolledHand';
import { RollActionPicker } from './RollActionPicker';
import { PossibleRolls } from './PossibleHands';
import { ThemedButton } from '../../../../inputs/buttons/ThemedButton';

type Props = {
    character: Character
}

export const RollTool: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const [showWindow, toggleWindow] = useState<boolean>(false);
    const skillName = useSelector((app: ApplicationState) => app.sheet.rollSkill)
    return (
        <>
            <ThemedButton className="roll-tool" onClick={() => toggleWindow(true)}>
                <RollIcon /> Roll!
            </ThemedButton>
            <BreakdownWindow className="roll-tool-window" visible={showWindow} close={() => toggleWindow(false)}
                heading={<h1>Roll{skillName && (' ' + skillName)}!</h1>}>
                <div className='roll-tool-rolls'>
                    <CommunalRolls />
                    <RolledHand character={character} />
                </div>
                <RollActionPicker character={character} />
                <PossibleRolls />
            </BreakdownWindow>
        </>
    );
}