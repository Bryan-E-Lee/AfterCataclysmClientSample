import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character";
import { isWeapon } from "../../../../../../entities/library/items/weapons/Weapon";
import { JSXChildProps } from "../../../../../../entities/utils/jsx/Children";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { EditIcon, ObjectIcons } from "../../../../../icons";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { isCompleteItem } from "../../../../../../entities/library/items/Item";

type Props = {
    character?: Character;
    item: ItemInitializer;
    editable?: boolean;
} & JSXChildProps;

type HeaderState = {
    currentName?: string;
    editing: boolean;
}

export const ItemPreviewHeader: React.FC<Props> = (props: Props) => {
    const { character, item, editable, children } = props;
    const isComplete = isCompleteItem(item);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState<HeaderState>({
        currentName: isComplete ? item.customName : item.name,
        editing: false,
    });

    useEffect(() => {
        if (state.editing) {
            inputRef.current?.focus();
        }
    }, [state.editing]);

    const itemIsWeapon = isWeapon(item)
    let headerText: React.ReactNode;
    if (editable && itemIsWeapon) {
        headerText = 'Editing: ';
    }
    else {
        headerText = children;
    }

    let displayName: string;
    if (isComplete) {
        displayName = item.displayName;
    }
    else {
        displayName = item.name;
    }
    return (
        <header className="item-preview-header">
            {ObjectIcons.GetIcon(item.icon)}
            <span>{headerText}</span>
            {isComplete && character && <input type='text' ref={inputRef} className={state.editing ? 'visible' : 'hidden'}
                value={state.currentName ?? ''}
                onChange={(e) => setState({ ...state, currentName: e.target.value })}
                onBlur={(e) => {
                    dispatch(SheetActions.updateCustomItemName(character, item, e.target.value));
                    setState({ ...state, editing: false });
                }} />
            }
            &nbsp;
            {isComplete && <span className={state.editing ? 'visible' : 'hidden'}>({item.name})&nbsp;</span>}
            <span className={state.editing ? 'hidden' : 'visible'}>{displayName}&nbsp;</span>
            
            {editable && itemIsWeapon &&
                <button className="interactable-button" onClick={() => setState({ ...state, editing: true })}>
                    <EditIcon />
                </button>
            }
        </header>
    );
}