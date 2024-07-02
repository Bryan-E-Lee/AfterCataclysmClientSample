import "./minion-listing.scss";
import React, { useRef, useState } from "react";
import { Minion } from "../../../../../../entities/library/minions/Minion"
import { Character } from "../../../../../../entities/characters/Character";
import { EditIcon } from "../../../../../icons";
import { ExternalClickDetector } from "../../../../../../utils/events/ExternalClickDetector";
import { ThemedButton } from "../../../../../inputs/buttons/ThemedButton";
import { SheetActions } from "../../../../../../store/stores/characters/sheet/actions/Sheet.Actions";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../../../../../store/stores/ApplicationState";

type Props = {
    minion: Minion;
    character: Character;
    onClick?: () => unknown
}

export const MinionListing = (props: Props) => {
    const { minion, character, onClick } = props;
    const enforceRules = useSelector((app: ApplicationState) => app.sheet.enforceRules);
    const [editing, setEditing] = useState<boolean>(false);
    const [changeBy, setChangeBy] = useState<number>(0);

    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);
    const tryClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target;
        if (onClick
            && target instanceof Node
            && !ref.current?.contains(target)) {
            onClick();
        }
    }

    const maintainHealthRange = (newHealth: number) => {
        if (enforceRules) {
            newHealth = Math.max(newHealth, 0);
            newHealth = Math.min(newHealth, minion.getMaxHealth(character));
        }
        return newHealth;
    }

    const onHeal = () => {
        let newHealth = minion.currentHealth + changeBy;
        newHealth = maintainHealthRange(newHealth);
        dispatch(SheetActions.updateMinionHealth(character, minion, newHealth));
        setEditing(false);
    }

    const onHurt = () => {
        let newHealth = minion.currentHealth - changeBy;
        newHealth = maintainHealthRange(newHealth);
        dispatch(SheetActions.updateMinionHealth(character, minion, newHealth));
        setEditing(false);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const changeBy = parseInt(e.target.value);
        if (!isNaN(changeBy)) {
            setChangeBy(changeBy);
        }
    }
    return (
        <div className="record" onClick={tryClick}>
            <div className="name">{minion.displayName} ({minion.displayCreatureTypes})</div>
            <div className="minion-health" ref={ref}>
                <button className="interactable-button" onClick={() => setEditing(true)}>
                    <EditIcon />
                </button>
                <span>
                    {minion.currentHealth} / {minion.getMaxHealth(character)}
                </span>
                {editing &&
                    <ExternalClickDetector className="metric-editor option-window" onExternalClickDetected={() => setEditing(false)}>
                        <div className="title">
                            Update Health
                        </div>
                        <div className="editor">
                            <ThemedButton className="increase-button" onClick={onHeal}>
                                Heal
                            </ThemedButton>
                            <input type="number" value={changeBy} onChange={onChange} min={0} />
                            <ThemedButton className="decrease-button" onClick={onHurt}>
                                Hurt
                            </ThemedButton>
                        </div>
                    </ExternalClickDetector>
                }
            </div>
        </div>
    )
}