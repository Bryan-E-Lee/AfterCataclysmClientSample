import './item-results.scss';
import React, { useState } from 'react';
import { NoFilterResults } from '../../filtering/NoFilterResults';
import { ItemInitializer } from '../../../entities/library/items/ItemInitializers';
import { ItemPreview } from '../../collection/characters/character-tools/items/preview/ItemPreview';
import { ObjectIcons } from '../../icons';
import { BreakdownWindow } from '../../theming/breakdown-window';
import { ItemPreviewHeader } from '../../collection/characters/character-tools/items/preview/ItemPreviewHeader';
import { Character, CollectionsToReferences } from '../../../entities/characters/Character';
import { AddItemButton } from '../../library/items/AddItemButton';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../store/stores/ApplicationState';
import { encodeNameForURI } from '../../../utils/StringUtilities';
import { useNavigate } from 'react-router';

type Props = {
    items: ItemInitializer[];
    useRoute?: boolean;
    close?: () => unknown;
}

export const ItemResults: React.FC<Props> = (props: Props) => {
    const { items, useRoute, close } = props;
    const navigate = useNavigate();
    const { sheet, library } = useSelector((app: ApplicationState) => app);
    const character = new Character(sheet, CollectionsToReferences(library));

    const [currentlyViewing, setViewing] = useState<ItemInitializer | undefined>();

    if (items.length == 0) {
        return <NoFilterResults />;
    }

    const onClickItem = (item: ItemInitializer) => {
        if (useRoute) {
            navigate(encodeNameForURI(item.name));
        }
        else {
            setViewing(item);
        }
    }

    const onClose = () => {
        if (close) {
            close();
        }
        setViewing(undefined);
    }

    return (
        <section className="search-results item-results">
            <header className="results-header">
                <div className="icon"></div>
                <div className="name">Name</div>
                <div className="cost">Cost</div>
                <div className="tags">Tags</div>
            </header>
            <div>
                {items.map((item) => (
                    <div key={item.id} className="record" onClick={() => onClickItem(item)}>
                        <div className="icon">{ObjectIcons.GetIcon(item.icon)}</div>
                        <div className="name">{item.name}</div>
                        <div className="cost">{item.cost} chips</div>
                        <div className="tags">{item.tags.join(', ')}</div>
                    </div>
                ))}
            </div>
            {!useRoute && <BreakdownWindow heading={currentlyViewing && <ItemPreviewHeader character={character} item={currentlyViewing} />}
                visible={currentlyViewing != undefined}
                close={onClose}>
                {currentlyViewing && <ItemPreview item={currentlyViewing} />}
                {character.id != "" && currentlyViewing && <AddItemButton item={currentlyViewing} />}
            </BreakdownWindow>}
        </section>
    )
}