import React from "react";
import { TooltipContent } from "../theming/tooltips/TooltipContent";
import { GameIcon } from "./GameIcon";

const ReducedByArmor = <>Reduced by <em>Armor</em>.</>;
const ReducedByResilience = <>Reduced by <em>Resilience</em>.</>;

export const PercussiveDescription = <>{ReducedByArmor} Percussive damage is any damage caused by hitting or striking something. E.G. You get hit with a baseball bat.</>;
export const PercussiveIcon: React.FC = () => {
    const icon = <GameIcon className="damage-icon">rifle</GameIcon>;
    const tooltip = <>
        <div className="tooltip-header">Percussive Damage</div>
        {PercussiveDescription}
    </>;
    return (
        <TooltipContent tooltipContent={tooltip}>
            {icon}
        </TooltipContent>
    );
}

export const ExplosiveDescription = <>{ReducedByArmor} Explosive damage is dealt whenever something explodes near something else. E.G. You are next to an exploding grenade.</>;
export const ExplosiveIcon: React.FC = () => {
    const icon = <GameIcon className="damage-icon">spiky-explosion</GameIcon>;
    const tooltip = <>
        <div className="tooltip-header">Explosive Damage</div>
        {ExplosiveDescription}
    </>;
    return (
        <TooltipContent tooltipContent={tooltip}>
            {icon}
        </TooltipContent>
    );
}

export const ThermalDescription = <>{ReducedByResilience} Thermal damage is dealt whenever something is made very hot. E.G. You are on fire.</>;
export const ThermalIcon: React.FC = () => {
    const icon = <GameIcon className="damage-icon">flamer</GameIcon>;
    const tooltip = <>
        <div className="tooltip-header">Thermal Damage</div>
        {ThermalDescription}
    </>;
    return (
        <TooltipContent tooltipContent={tooltip}>
            {icon}
        </TooltipContent>
    );
}

export const CryoDescription = <>{ReducedByResilience} Cryo damage is dealt whenever something is made very cold. E.G. You are frozen solid.</>;
export const CryoIcon: React.FC = () => {
    const icon = <GameIcon className="damage-icon">ice-cube</GameIcon>;
    const tooltip = <>
        <div className="tooltip-header">Cryo Damage</div>
        {CryoDescription}
    </>;
    return (
        <TooltipContent tooltipContent={tooltip}>
            {icon}
        </TooltipContent>
    );
}

export const ElectromagneticDescription = <>{ReducedByResilience} Electromagnetic damage is dealt whenever something is electrocuted or blasted with light. E.G. You are standing in the way of a giant laser cannon.</>;
export const ElectromagneticIcon: React.FC = () => {
    const icon = <GameIcon className="damage-icon">laser-burst</GameIcon>;
    const tooltip = <>
            <div className="tooltip-header">Electromagnetic Damage</div>
            {ElectromagneticDescription}
        </>;
    return (
        <TooltipContent tooltipContent={tooltip}>
            {icon}
        </TooltipContent>
    );
}

export const CorrosiveDescription = <>{ReducedByResilience} Corrosive damage is dealt whenever something is dissolved. E.G. You are melting in a vat of acid.</>;
export const CorrosiveIcon: React.FC = () => {
    const icon = <GameIcon className="damage-icon">chemical-bolt</GameIcon>;
    const tooltip = <>
        <div className="tooltip-header">Corrosive Damage</div>
        {CorrosiveDescription}
    </>;
    return (
        <TooltipContent tooltipContent={tooltip}>
            {icon}
        </TooltipContent>
    );
}

export const BioDescription = <>{ReducedByResilience} Biological damage is dealt whenever something is afflicted with disease or poison. E.G. You have smallpox.</>;
export const BioIcon: React.FC = () => {
    const icon = <GameIcon className="damage-icon">biohazard</GameIcon>;
    const tooltip = <>
        <div className="tooltip-header">Biological Damage</div>
        {BioDescription}
    </>;
    return (
        <TooltipContent tooltipContent={tooltip}>
            {icon}
        </TooltipContent>
    );
}

export const HackingDescription = <>{ReducedByResilience} Hacking damage is dealt whenever a machine is unable to function the way it's supposed to. E.G. You're a robot and a keyboard warrior is scrambling your memory banks.</>;
export const HackIcon: React.FC = () => {
    const icon = <GameIcon className="damage-icon">microchip</GameIcon>;
    const tooltip = <>
        <div className="tooltip-header">Hacking Damage</div>
        {HackingDescription}
    </>;
    return (
        <TooltipContent tooltipContent={tooltip}>
            {icon}
        </TooltipContent>
    );
}