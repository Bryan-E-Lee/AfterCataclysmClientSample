import './sheet-item.scss';
import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { Character } from "../../../../../../entities/characters/Character";
import { Item } from "../../../../../../entities/library/items/Item";
import { SheetActions } from '../../../../../../store/stores/characters/sheet/actions/Sheet.Actions';
import { DeleteIcon, MoveIcon } from '../../../../../icons';
import { MoveWindow } from './MoveItemWindow';
import { ExternalClickDetector } from '../../../../../../utils/events/ExternalClickDetector';
import { Loader } from '../../../../../theming/loader/Loader';

type Props = {
    character: Character;
    item: Item;
}

export const SheetItem: React.FC<Props> = (props: Props) => {
    const { character, item } = props;
    let itemClass = item.saved ? 'saved' : 'pending';
    const dispatch = useDispatch();
    const [moveOpen, setMoveOpen] = useState<boolean>(false);

    const onItemClick = () => {
        if (item.saved) {
            dispatch(SheetActions.setPreviewItem(item.instanceId))
        }
    }
    return (
        <div className={`sheet-item ${itemClass}`}>
            <div className='item-column-container'>
                <div className="icon">
                    {!item.saved && <Loader textSized />}
                    {item.saved && 
                        <div className="move-item-container">
                            <button className="interactable-button" onClick={() => setMoveOpen(true)}>
                                <MoveIcon />
                            </button>
                            {moveOpen && (
                                <ExternalClickDetector onExternalClickDetected={() => setMoveOpen(false)}>
                                    <MoveWindow character={character} item={item} />
                                </ExternalClickDetector>
                            )}
                        </div>
                    }
                </div>
                <div className="icon" onClick={onItemClick}>{item.iconElement}</div>
                <div className="name" onClick={onItemClick}>{item.displayName}</div>
                <div className="cost" onClick={onItemClick}>{item.cost}</div>
                <div className="weight" onClick={onItemClick}>{item.weight}</div>
                <div className="tags" onClick={onItemClick}>{item.tagText}</div>
                <div className="icon">
                    <button className="interactable-button" onClick={() => dispatch(SheetActions.removeItem(character, item))}>
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}