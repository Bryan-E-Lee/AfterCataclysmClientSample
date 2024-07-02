import React from "react";
import { GameIcon } from "../GameIcon";

export const ChemistryIcon: React.FC = () => <GameIcon>fizzing-flask</GameIcon>;
export const ElectronicsIcon: React.FC = () => <GameIcon>batteries</GameIcon>;
export const MachineryIcon: React.FC = () => <GameIcon>big-gear</GameIcon>;
export const MedicineIcon: React.FC = () => <GameIcon>medical-pack-alt</GameIcon>;

export const SpellIcons = Object.freeze({
    'chemistry': <ChemistryIcon />,
    'electronics': <ElectronicsIcon />,
    'machinery': <MachineryIcon />,
    'medicine': <MedicineIcon />
});