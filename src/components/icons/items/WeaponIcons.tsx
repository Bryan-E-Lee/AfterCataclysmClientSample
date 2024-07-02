import React from "react";

export const OneHandedMeleeIcon = () => <i className="game-icon game-icon-bowie-knife-2"></i>;
export const TwoHandedMeleeIcon = () => <i className="game-icon game-icon-wood-club"></i>;
export const WristLauncherIcon = () => <i className="game-icon game-icon-dart"></i>;
export const HandgunIcon = () => <i className="game-icon game-icon-revolver-2"></i>;
export const BlasterIcon = () => <i className="game-icon game-icon-ray-gun"></i>;
export const ShotgunIcon = () => <i className="game-icon game-icon-sawed-off-shotgun"></i>;
export const RifleIcon = () => <i className="game-icon game-icon-winchester-rifle"></i>;
export const EnergyRifleIcon = () => <i className="game-icon game-icon-laser-blast"></i>;
export const SpewerIcon = () => <i className="game-icon game-icon-flamethrower"></i>;
export const BombSatchelIcon = () => <i className="game-icon game-icon-unlit-bomb"></i>;
export const GrenadeLauncherIcon = () => <i className="game-icon game-icon-bundle-grenade"></i>;
export const RocketLauncherIcon = () => <i className="game-icon game-icon-missile-pod"></i>;
export const HeavyWeaponIcon = () => <i className="game-icon game-icon-minigun"></i>;

export const WeaponIcons = Object.freeze({
    'one-handed-melee': <OneHandedMeleeIcon />,
    'two-handed-melee': <TwoHandedMeleeIcon />,
    'wrist-launcher': <WristLauncherIcon />,
    'handgun': <HandgunIcon />,
    'blaster': <BlasterIcon />,
    'shotgun': <ShotgunIcon />,
    'rifle': <RifleIcon />,
    'energy-rifle': <EnergyRifleIcon />,
    'spewer': <SpewerIcon />,
    'bomb-satchel': <BombSatchelIcon />,
    'grenade-launcher': <GrenadeLauncherIcon />,
    'rocket-launcher': <RocketLauncherIcon />,
    'heavy-weapon': <HeavyWeaponIcon />
});