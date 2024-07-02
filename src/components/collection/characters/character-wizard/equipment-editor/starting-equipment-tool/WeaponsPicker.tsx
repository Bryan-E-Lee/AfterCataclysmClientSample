import React from "react";
import { Character } from "../../../../../../entities/characters/Character";
import { SortedSet } from "../../../../../../entities/data-structures/SortedSet";
import { isWeaponInitializer, ItemInitializer, WeaponInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { Weapon } from "../../../../../../entities/library/items/weapons/Weapon";
import { nonEmpty } from "../../../../../../utils/TypeUtils";
import { MultiSelect } from "../../../../../inputs/selects/multiselect/MultiSelect";
import { SelectableOption } from "../../../../../inputs/selects/SelectableOption";
import { SingleSelect } from "../../../../../inputs/selects/singleselect/SingleSelect";

type Props = {
    items: SortedSet<ItemInitializer>;
    twoHander: WeaponInitializer | null;
    oneHanders: WeaponInitializer[];
    selectTwoHander: (weapon: WeaponInitializer) => void;
    selectOneHanders: (weapons: WeaponInitializer[]) => void;
    clearWeapons: () => void;
}

type State = {
    weaponChoice: 'two' | 'one' | null;
}

export class WeaponsPicker extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            weaponChoice: null
        };
    }

    private get choosingTwoHander(): boolean {
        return this.state.weaponChoice == 'two';
    }

    private get choosingOneHanders(): boolean {
        return this.state.weaponChoice == 'one';
    }

    private get weapons(): SortedSet<WeaponInitializer> {
        const weapons = this.props.items.collection
            .filter<WeaponInitializer>(isWeaponInitializer);
        return new SortedSet(weapons);
    }

    private get twoHanderOptions(): SelectableOption<string>[] {
        return this.weapons.collection
            .filter(weapon => weapon.hands == 2)
            .map(weapon => ({ name: weapon.name, value: weapon.id }));
    }

    private get oneHanderOptions(): SelectableOption<string>[] {
        return this.weapons.collection
            .filter(weapon => weapon.hands == 1)
            .map(weapon => ({
                name: weapon.name,
                value: weapon.id,
                disabled: this.props.oneHanders.length >= Character.MaxStartingOneHanders
            }));
    }

    private clickTwoHander(): void {
        if(this.choosingTwoHander) {
            this.setState((state) => ({ ...state, weaponChoice: null }));
        }
        else {
            this.setState((state) => ({ ...state, weaponChoice: 'two' }));
        }
    }

    private clickOneHanders(): void {
        if(this.choosingOneHanders) {
            this.setState((state) => ({ ...state, weaponChoice: null }));
        }
        else {
            this.setState((state) => ({ ...state, weaponChoice: 'one' }));
        }
    }

    private selectTwoHander(id: string): void {
        const weapon = this.props.items.get(id) as Weapon | null;
        if (weapon != null) {
            this.props.selectTwoHander(weapon);
        }
    }

    private selectOneHanders(ids: string[]): void {
        const weapons = ids.map(id => this.props.items.get(id))
            .filter<ItemInitializer>(nonEmpty)
            .filter<WeaponInitializer>(isWeaponInitializer);
        this.props.selectOneHanders(weapons);
    }

    public render(): JSX.Element {
        return (
            <div className='form-field'>
                <label>Choose one:</label>
                <div className='checkbox-list'>
                    <div className='checkbox-option'>
                        <input type='checkbox' checked={this.choosingTwoHander} onChange={this.clickTwoHander.bind(this)} />
                        <label>A two-handed weapon</label>
                        <div className={`custom-dropdown ${this.choosingTwoHander ? 'visible' : 'hidden'}`}>
                            <SingleSelect options={this.twoHanderOptions}
                                selection={this.props.twoHander?.id}
                                onChange={this.selectTwoHander.bind(this)} />
                        </div>
                    </div>
                    <div>
                        OR
                    </div>
                    <div className='checkbox-option'>
                        <input type='checkbox' checked={this.choosingOneHanders} onChange={this.clickOneHanders.bind(this)} />
                        <label>Up to two one-handed weapons</label>
                        <div className={`custom-dropdown ${this.choosingOneHanders ? 'visible' : 'hidden'}`}>
                            <MultiSelect options={this.oneHanderOptions}
                                selections={this.props.oneHanders.map(weapon => weapon.id)}
                                onChange={this.selectOneHanders} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}