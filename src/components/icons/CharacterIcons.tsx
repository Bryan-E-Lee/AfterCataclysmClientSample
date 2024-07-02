import React, { CSSProperties } from "react";
import { GameIcon } from "./GameIcon";

type Props = {
    className?: string;
    style?: CSSProperties
}

export const HealthIcon = () => <GameIcon>heart-plus</GameIcon>;
export const JuiceIcon = (props: Props) => <GameIcon {...props}>lightning-branches</GameIcon>;
export const HandsIcon = (props: Props) => <GameIcon {...props}>hand-2</GameIcon>;
export const RequiresAttentionIcon = (props: Props) => <GameIcon title="Requires Attention!" {...props}>eye-target</GameIcon>;
export const MovementIcon = () => <i className="game-icon game-icon-wingfoot"></i>;
export const RollIcon = () => <i className="game-icon game-icon-rolling-dices"></i>;