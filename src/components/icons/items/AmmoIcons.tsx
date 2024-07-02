import React from "react";
import { GameIcon } from "../GameIcon";

export const BulletIcon: React.FC = () => <i className="game-icon game-icon-bullets"></i>;
export const ShotIcon: React.FC = () => <i className="game-icon game-icon-shotgun-rounds"></i>;
export const SlugIcon = () => <GameIcon>heavy-bullets</GameIcon>;
export const CellIcon: React.FC = () => <i className="game-icon game-icon-batteries"></i>;
export const CannisterIcon: React.FC = () => <i className="game-icon game-icon-cannister"></i>;
export const GrenadeIcon: React.FC = () => <i className="game-icon game-icon-grenade-2"></i>;
export const MineIcon: React.FC = () => <i className="game-icon game-icon-land-mine"></i>;
export const RocketIcon: React.FC = () => <i className="game-icon game-icon-rocket"></i>;
export const BladeIcon: React.FC = () => <i className="game-icon game-icon-energy-sword"></i>
export const BludgeonIcon = () => <GameIcon>flat-hammer</GameIcon>;
export const SpikeIcon = () => <GameIcon>needle-drill</GameIcon>

export const AmmoIcons = Object.freeze({
    'bullet': <BulletIcon />,
    'blade': <BladeIcon />,
    'bludgeon': <BludgeonIcon />,
    'spike': <SpikeIcon />,
    'shot': <ShotIcon />,
    'slug': <SlugIcon />,
    'cell': <CellIcon />,
    'cannister': <CannisterIcon />,
    'grenade': <GrenadeIcon />,
    'mine': <MineIcon />,
    'rocket': <RocketIcon />
});