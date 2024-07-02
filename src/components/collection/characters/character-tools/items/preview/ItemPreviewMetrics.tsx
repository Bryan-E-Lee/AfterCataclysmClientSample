import React from "react";
import { WeightIcon, MoneyIcon } from "../../../../../icons";
import { DamageTypeSuiteComponent } from "../info/DamageTypeSuite";
import { DefensesComponent } from "../info/DefensesComponent";
import { ItemInitializer, isModInitializer, isSpellInitializer, isWeaponInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { HandsIcon, JuiceIcon } from "../../../../../icons/CharacterIcons";

type Props = {
    item: ItemInitializer;
}

export const ItemPreviewMetrics: React.FC<Props> = (props: Props) => {
    const { item } = props;
    const { weight, cost } = item;
    return (
        <>
            <div className="row item-info">
                {isWeaponInitializer(item) && <div className="hands">{item.hands}<HandsIcon /></div>}
                {isSpellInitializer(item) && <div className="juice">{item.juice}<JuiceIcon /></div>}
                <div className="cost">{cost}<MoneyIcon /></div>
                <div className="weight">{weight}<WeightIcon /></div>
            </div>
            <div className="row item-info">
                {isModInitializer(item) && item.damageSuite.any() &&
                    <><label>Damage:</label>&nbsp;<DamageTypeSuiteComponent suite={item.damageSuite} /></>}
                <DefensesComponent item={item} />
            </div>
        </>
    );
}