import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { BreakdownWindow } from "../../../../../theming/breakdown-window";
import { ApplicationState } from '../../../../../../store/stores/ApplicationState';
import { ItemPreview } from '../../../character-tools/items/preview/ItemPreview';
import { ItemPreviewHeader } from '../../../character-tools/items/preview/ItemPreviewHeader';
import { ModEditor } from '../../../character-tools/items/preview/mods/ModEditor';

type Props = {
    character: Character
}

export const ItemEditor: React.FC<Props> = (props: Props) => {
    const { character } = props;
    const dispatch = useDispatch();
    const { previewItemInstanceId, previewSlotId } = useSelector((state: ApplicationState) => state.sheet);
    const item = character.findItem(previewItemInstanceId ?? '');
    const close = () => {
        if (previewSlotId == null) {
            dispatch(SheetActions.clearPreviewItem());
        }
    }
    return (
        <>
            {item && 
                <BreakdownWindow className='item-editor'
                    heading={<ItemPreviewHeader character={character} item={item} editable />}
                    close={close}>
                    <ItemPreview character={character} item={item} editable />
                </BreakdownWindow>
            }
            {item && previewSlotId && 
                <ModEditor character={character} item={item} />
            }
        </>
    );
}
