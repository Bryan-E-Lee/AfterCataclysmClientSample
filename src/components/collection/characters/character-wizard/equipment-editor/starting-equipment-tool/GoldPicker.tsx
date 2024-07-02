import React from "react";
import { SortedSet } from "../../../../../../entities/data-structures/SortedSet";
import { Item } from "../../../../../../entities/library/items/Item";
import { ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { MultiSelect } from "../../../../../inputs/selects/multiselect/MultiSelect";
import { SelectableOption } from "../../../../../inputs/selects/SelectableOption";

type Props = {
    items: SortedSet<ItemInitializer>;
    selectedItems: ItemInitializer[];
    selectGoldItems: (items: ItemInitializer[]) => void;
}

export class GoldPicker extends React.Component<Props> {
    public static readonly StartingChips: number = 30;

    private get availableItems(): ItemInitializer[] {
        return this.props.items.collection
            .filter(item => item.cost <= GoldPicker.StartingChips);
    }

    private get itemOptions(): SelectableOption<string>[] {
        return this.availableItems
            .map(item => ({
                name: `${item.name} (${item.cost} chips)`,
                value: item.id,
                disabled: item.cost > this.remainingItemPrice
            }));
    }

    private get totalItemPrice(): number {
        return this.props.selectedItems
            .reduce((accum, curr) => accum + curr.cost, 0);
    }

    private get remainingItemPrice(): number {
        return GoldPicker.StartingChips - this.totalItemPrice;
    }

    public render(): JSX.Element {
        return (
            <div className='form-field'>
                <label>
                    Choose up to {GoldPicker.StartingChips} chips worth of stuff, the remainder will be added to your pool of chips.
                </label>
                <div>
                    You will receive {this.remainingItemPrice} chips and the following items:&nbsp;
                    <MultiSelect options={this.itemOptions} selections={this.props.selectedItems.map(si => si.id)}
                        onChange={this.onChange.bind(this)}>
                    </MultiSelect>
                </div>
            </div>
        );
    }

    private onChange(ids: string[]): void {
        const items = ids.map(id => this.props.items.get(id))
            .filter(item => item != null) as Item[];
        this.props.selectGoldItems(items);
    }
}