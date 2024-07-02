import React from "react";

export const BackpackIcon: React.FC = () => <i className="game-icon game-icon-light-backpack"></i>;
export const ChestIcon: React.FC = () => <i className="game-icon game-icon-chest"></i>;
export const FridgeIcon: React.FC = () => <i className="game-icon game-icon-fridge"></i>;
export const JerrycanIcon: React.FC = () => <i className="game-icon game-icon-jerrycan"></i>;
export const TestTubeSetIcon: React.FC = () => <i className="game-icon game-icon-transparent-tubes"></i>
export const ToolboxIcon: React.FC = () => <i className="game-icon game-icon-toolbox"></i>;

export const ContainerIcons = Object.freeze({
    'backpack': <BackpackIcon />,
    'chest': <ChestIcon />,
    'fridge': <FridgeIcon />,
    'jerrycan': <JerrycanIcon />,
    'toolbox': <ToolboxIcon />,
    'test-tubes set': <TestTubeSetIcon />
});