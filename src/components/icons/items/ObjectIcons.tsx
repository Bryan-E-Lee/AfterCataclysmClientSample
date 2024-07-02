import React from "react";
import { AmmoIcons } from "./AmmoIcons";
import { ContainerIcons } from "./ContainerIcons";
import { SpellIcons } from "./SpellIcons";
import { WeaponIcons } from "./WeaponIcons";
import { GameIcon } from "../GameIcon";
import { CSSProperties } from "styled-components";

type Props = {
    className?: string;
    style?: CSSProperties
}

export const DefaultIcon = () => <i className="game-icon game-icon-swap-bag"></i>;
export const MoneyIcon = (props: Props) => <GameIcon {...props}>two-coins</GameIcon>;//<i className="game-icon game-icon-two-coins"></i>;
export const WeightIcon = () => <i className="game-icon game-icon-weight"></i>;
export const RangeIcon = () => <i className="game-icon game-icon-crosshair"></i>;

export const ArmorIcon = () => <i className="game-icon game-icon-shield"></i>;
export const ResilienceIcon = () => <i className="game-icon game-icon-wing-cloak"></i>;

export const ApparelIcon = () => <i className="game-icon game-icon-shirt"></i>;
export const WornArmorIcon = () => <i className="game-icon game-icon-kevlar-vest"></i>;
export const ToolIcon = () => <i className="game-icon game-icon-hammer-nails"></i>;
export const LiquidIcon = () => <i className="game-icon game-icon-round-bottom-flask"></i>;
export const FoodIcon = () => <i className="game-icon game-icon-chicken-leg"></i>;
export const ReagentIcon = () => <i className="game-icon game-icon-powder"></i>;
export const DrugIcon = () => <i className="game-icon game-icon-syringe"></i>;
export const KeepsakeIcon = () => <i className="game-icon game-icon-big-diamond-ring"></i>;
export const ModIcon = () => <i className="game-icon game-icon-jigsaw-box"></i>;

export * from './WeaponIcons';

export const ObjectIcons = Object.freeze({
    'default': <DefaultIcon />,
    'apparel': <ApparelIcon />,
    'armor': <WornArmorIcon />,
    'tool': <ToolIcon />,
    'liquid': <LiquidIcon />,
    'food': <FoodIcon />,
    'reagent': <ReagentIcon />,
    'drug': <DrugIcon />,
    'keepsake': <KeepsakeIcon />,
    'mod': <ModIcon />,

    ...ContainerIcons,
    ...WeaponIcons,
    ...AmmoIcons,
    ...SpellIcons,

    GetIcon(icon: string): JSX.Element {
        if (icon == "GetIcon") {
            return <DefaultIcon />;
        }
        const iconElement = this[icon as keyof typeof ObjectIcons] as JSX.Element | undefined;
        return iconElement ?? <DefaultIcon/>;
    }
});

export type ItemIconKey = keyof typeof ObjectIcons;