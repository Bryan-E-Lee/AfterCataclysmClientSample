import React from "react";
import { ModInitializer } from "../../../../../../../entities/library/items/ItemInitializers";
import { ObjectIcons } from "../../../../../../icons";

type Props = {
    mod: ModInitializer;
    onClick: () => void;
}

export const MiniMod: React.FC<Props> = (props: Props) => {
    const { mod, onClick } = props;
    return (
        <div className="sheet-slot">
            <div className="text">{mod.name}</div>
            <button className="slot-box interactable-button" onClick={onClick}>
                {ObjectIcons.GetIcon(mod.icon)}
            </button>
        </div>
    );
}