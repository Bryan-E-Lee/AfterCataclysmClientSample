import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character, CollectionsToReferences } from '../../../entities/characters/Character';
import { ApplicationState } from "../../../store/stores/ApplicationState";
import { SheetActions } from "../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { LoadingText } from '../../theming/loader/LoadingText';
import { ItemAdder } from './character-sheet/abilities-equipment/item-adder';
import { CharacterSheetComponent } from './character-sheet/CharacterSheet';
import { SlotChangingSkill, isSlotChangingSkill } from '../../../entities/library/skills/SlotChangingSkill';
import { AddSlotChangeRequest, IsAddSlotChangeRequest, IsRemoveSlotChangeRequest, RemoveSlotChangeRequest } from '../../../entities/library/skills/Skill';
import { useParams } from 'react-router';

export const CharacterComponent: React.FC = () => {
    const dispatch = useDispatch();
    const { character: { characters, loaded }, sheet, library } = useSelector((state: ApplicationState) => state);
    const params = useParams();
    const id = params["id" as keyof typeof params];

    useEffect(() => {
        const invalidId = id == null
                        || id == ''
                        || id == sheet.id;
        if (invalidId || !loaded) {
            return;
        }
        const character = characters.find(c => c.id == id);
        if (character == null) {
            console.error('Character not found!');
            return;
        }

        dispatch(SheetActions.setActiveCharacterSheet(character));
    }, [id, characters, loaded, library, dispatch]); //sheet.id is unnecessary as a dependency since it is being set here

    const character = id == sheet.id
        ? new Character(sheet, CollectionsToReferences(library))
        : null;

    useEffect(() => {
        if (character == null) {
            return;
        }

        const pendingSlotChanges = character.skills.collection
            .filter<SlotChangingSkill>(isSlotChangingSkill)
            .mapMany(s => s.getSlotChangesOnLoad(character));
            
        const addChanges = pendingSlotChanges
            .filter<AddSlotChangeRequest>(IsAddSlotChangeRequest)
            .mapMany(request => request.changes);
        const removeChanges = pendingSlotChanges
            .filter<RemoveSlotChangeRequest>(IsRemoveSlotChangeRequest)
            .mapMany(request => request.changes);

        if (addChanges.any()) {
            dispatch(SheetActions.addSlots(character, addChanges));
        }
        if (removeChanges.any()) {
            dispatch(SheetActions.removeSlots(character, removeChanges));
        }
    }, [dispatch, character]);

    if (character == null) {
        return <LoadingText />;
    }

    return (
        <>
            <CharacterSheetComponent character={character} />
            <ItemAdder character={character} visible={sheet.showItemAdder} close={() => dispatch(SheetActions.hideItemAdder())} />
        </>
    )
}