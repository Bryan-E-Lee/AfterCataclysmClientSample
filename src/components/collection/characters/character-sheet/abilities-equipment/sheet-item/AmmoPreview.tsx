import './ammo-preview.scss';
import React, { useState } from "react";
import { Ammo } from "../../../../../../entities/library/items/mods/Ammo"
import { DamageTypeSuiteComponent } from '../../../character-tools/items/info/DamageTypeSuite';
import { Character } from '../../../../../../entities/characters/Character';
import { useDispatch } from 'react-redux';
import { SheetActions } from '../../../../../../store/stores/characters/sheet/actions/Sheet.Actions';

type Props = {
    character: Character;
    ammo: Ammo;
}

export const AmmoPreview = (props: Props) => {
    const { character, ammo } = props;
    const dispatch = useDispatch();
    return (
        <>
            <div className="ammo-preview" onClick={() => dispatch(SheetActions.setPreviewItem(ammo.instanceId))}>
                <div className="name-icon">
                    {ammo.iconElement}
                    <header>{ammo.name}</header>
                </div>
                <div className="descriptor-block">
                    <label>Damage</label>
                    <DamageTypeSuiteComponent suite={ammo.damageSuite} />
                </div>
                <div className="descriptor-block">
                    <label>Description</label>
                    <div>
                        {ammo.description}
                    </div>
                </div>
            </div>
        </>
    );
}