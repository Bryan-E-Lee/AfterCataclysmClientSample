import React from "react";
import { SortedSet } from "../../../../../../entities/data-structures/SortedSet";
import { ContainerInitializer, isContainerInitializer, ItemInitializer } from "../../../../../../entities/library/items/ItemInitializers";
import { SelectableOption } from "../../../../../inputs/selects/SelectableOption";
import { SingleSelect } from "../../../../../inputs/selects/singleselect/SingleSelect";

type Props = {
    items: SortedSet<ItemInitializer>;
    container: ContainerInitializer | null | undefined;
    selectContainer: (container: ContainerInitializer | null) => void;
    clearContainer: () => void;
}

type State = {
    containerSelection: 'backpack' | 'container' | null;
}

export class ContainerPicker extends React.Component<Props, State> {
    public constructor(props: Props) {
        super(props);
        this.state = {
            containerSelection: null
        };
    }

    private get choosingBackpack(): boolean {
        return this.state.containerSelection == 'backpack';
    }

    private get choosingContainer(): boolean {
        return this.state.containerSelection == 'container';
    }

    private get containerOptions(): SelectableOption<string>[] {
        return this.props.items.collection
            .filter<ContainerInitializer>(isContainerInitializer)
            .filter((container: ContainerInitializer) => container.cost <= 10)
            .map((container: ContainerInitializer) => ({
                name: container.name,
                value: container.id
            }));
    }

    private get backpack(): ContainerInitializer {
        return this.props.items.collection.find(item => item.name == 'Backpack') as ContainerInitializer;
    }

    private clickBackpack(): void {
        if(this.choosingBackpack) {
            this.setState((state) => ({ ...state, containerSelection: null }));
            this.props.selectContainer(null);
        }
        else { 
            this.setState((state) => ({ ...state, containerSelection: 'backpack', customContainer: null }));
            this.props.selectContainer(this.backpack);
        }
    }

    private clickContainer(): void {
        if(this.choosingContainer) {
            this.setState((state) => ({ ...state, containerSelection: null, customContainer: null }));
        }
        else {
            this.setState((state) => ({ ...state, containerSelection: 'container' }));
        }
        this.props.selectContainer(null);
    }

    private selectCustomContainer(id: string | null): void {
        const container = id != null
            ? this.props.items.get<ContainerInitializer>(id, isContainerInitializer)
            : null;
        this.props.selectContainer(container ?? null);
    }
    
    public render() {
        return (
            <div className='form-field'>
                <label>Choose one:</label>
                <div className='checkbox-list'>
                    <div className='checkbox-option'>
                        <input type='checkbox' checked={this.choosingBackpack} onChange={this.clickBackpack.bind(this)} /> a backpack
                    </div>
                    <div>
                        OR
                    </div>
                    <div className='checkbox-option'>
                        <input type='checkbox' checked={this.choosingContainer} onChange={this.clickContainer.bind(this)} /> a container worth 10 or fewer chips
                        <div className={`custom-dropdown ${this.choosingContainer ? 'visible' : 'hidden'}`}>
                            <SingleSelect options={this.containerOptions} selection={this.props.container?.id}
                                onChange={this.selectCustomContainer.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}