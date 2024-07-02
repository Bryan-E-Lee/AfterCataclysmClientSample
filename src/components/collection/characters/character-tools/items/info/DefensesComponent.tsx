import './defenses.scss';
import React from "react";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { ArmorIcon, ResilienceIcon } from "../../../../../icons";

type Props = {
    item: ItemInitializer
}

export const DefensesComponent: React.FC<Props> = (props: Props) => {
    const hasArmor = props.item.armor != undefined
        && props.item.armor != 0;
    const hasResilience = props.item.resilience != undefined
        && props.item.resilience != 0;
    if (!hasArmor || !hasResilience) {
        return null;
    }
    return (
        <div className='defenses'>
            {hasArmor
                ? <div>
                        <ArmorIcon />
                        {props.item.armor}
                    </div>
                : null}
            {hasResilience
                ? <div>
                        <ResilienceIcon />
                        {props.item.resilience}
                    </div>
                : null}
        </div>
    );
}