import "./character-sheet-metrics.scss";
import React, { useState } from "react";
import { Character } from "../../../../../entities/characters/Character";
import { ArmorIcon, EditIcon, MoneyIcon, ResilienceIcon } from "../../../../icons";
import { JuiceIcon, MovementIcon, HealthIcon } from "../../../../icons/CharacterIcons";
import { ExternalClickDetector } from "../../../../../utils/events/ExternalClickDetector";
import { ThemedButton } from "../../../../inputs/buttons/ThemedButton";
import { SheetActions } from "../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { useDispatch } from "react-redux";
import { RestrictNumber } from "../../../../../entities/Utilities";

type Props = {
    character: Character;
    viewOnMobile: boolean;
}

export const CharacterSheetMetrics: React.FC<Props> = (props: Props) => {
    const { character, viewOnMobile } = props;
    const dispatch = useDispatch();
    const [editingMoney, setEditingMoney] = useState(false);
    const [moneyDelta, setMoneyDelta] = useState(0);
    const [moneyOverride, setMoneyOverride] = useState(character.money);

    const onAddMoney = () => {
        const newMoney = character.money + moneyDelta;
        updateMoney(newMoney);
    }

    const onRemoveMoney = () => {
        const newMoney = character.money - moneyDelta;
        updateMoney(newMoney);
    }

    const onChangeMoney = (e: React.ChangeEvent<HTMLInputElement>) => {
        const moneyDelta = parseInt(e.target.value);
        if (!isNaN(moneyDelta)){
            setMoneyDelta(moneyDelta);
        }
    }

    const updateMoney = (newMoney: number) => {
        newMoney = RestrictNumber(newMoney, 0, Number.MAX_SAFE_INTEGER);
        dispatch(SheetActions.updateMoney(character, newMoney));
        setMoneyDelta(0);
        setMoneyOverride(newMoney);
        setEditingMoney(false);
    }
    return (
        <div className={`character-sheet-metrics sheet-section ${viewOnMobile ? "viewing" : "unviewing"}`}>
            <div className="metrics-container">
                <div className="metrics-row">
                    <div className="character-sheet-metric">
                        <div className="icon-value">
                            <ArmorIcon />&nbsp;{character.armor}
                        </div>
                        <label>Armor</label>
                    </div>
                    
                    <div className="character-sheet-metric">
                        <div className="icon-value">
                            <ResilienceIcon />&nbsp;{character.resilience}
                        </div>
                        <label>Resilience</label>
                    </div>
                </div>
                <div className="metrics-row">
                    <div className="character-sheet-metric">
                        <div className="icon-value">
                            <MovementIcon />{character.movement}
                        </div>
                        <label>Speed</label>
                    </div>
                    <div className="character-sheet-metric interactable-button" onClick={() => setEditingMoney(true)} role="button">
                        <div className="icon-value">
                            <MoneyIcon />{character.money}
                        </div>
                        <label>Chips&nbsp;<EditIcon /></label>
                    </div>
                </div>
                {editingMoney && (
                    <ExternalClickDetector className="metric-editor option-window" onExternalClickDetected={() => setEditingMoney(false)}>
                        <div className="title">
                            Update Chips
                        </div>
                        <div className="editor">
                            <ThemedButton className="increase-button" onClick={onAddMoney}>
                                Add
                            </ThemedButton>
                            <input type="number" value={moneyDelta} onChange={onChangeMoney} min={0} />
                            <ThemedButton className="decrease-button" onClick={onRemoveMoney}>
                                Remove
                            </ThemedButton>
                            <hr />
                            <input type="number" value={moneyOverride} min={0} onChange={e => setMoneyOverride(parseInt(e.target.value))} />
                            <ThemedButton onClick={() => updateMoney(moneyOverride)}>
                                Set Chips
                            </ThemedButton>
                        </div>
                    </ExternalClickDetector>
                )}
            </div>
        </div>
    );
}

const Wounds: React.FC<Props> = (props: Props) => {
    const currentWounds: JSX.Element[] = [];
    const emptyWounds: JSX.Element[] = [];
    let woundIndex = 0;
    for(woundIndex = 0; woundIndex < props.character.currentWounds; woundIndex++) {
        currentWounds.push(<JuiceIcon key={woundIndex} />);
    }
    for(woundIndex; woundIndex < props.character.maxWounds; woundIndex++) {
        emptyWounds.push(<HealthIcon key={woundIndex} />);
    }
    return (
        <div className="character-sheet-reducible">
            <label>Wounds</label>
            <div className="value">
                {currentWounds}
                {emptyWounds}
                <span className="wounds-reminder">
                    ({currentWounds.length}/{currentWounds.length + emptyWounds.length})
                </span>
            </div>
        </div>
    )
}