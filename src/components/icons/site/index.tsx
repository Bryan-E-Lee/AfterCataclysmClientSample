import React from "react";
import { MaterialSymbol } from "../MaterialSymbol";
import { GameIcon } from "../GameIcon";

type Props = {
    className?: string;
}

export const BulletEmptyIcon = () => <MaterialSymbol className="bullet">circle</MaterialSymbol>;
export const BulletFilledIcon = () => <MaterialSymbol className="filled bullet">circle</MaterialSymbol>;

export const AddIcon = () => <MaterialSymbol>add_circle</MaterialSymbol>;
export const BookIcon = () => <MaterialSymbol>menu_book</MaterialSymbol>;
export const CloseIcon = () => <MaterialSymbol>cancel</MaterialSymbol>;
export const CopyIcon = () => <MaterialSymbol>content_copy</MaterialSymbol>;
export const DecreaseIcon = () => <MaterialSymbol>remove</MaterialSymbol>;
export const DeleteIcon = () => <MaterialSymbol>delete</MaterialSymbol>;
export const EditIcon = () => <MaterialSymbol>edit</MaterialSymbol>;
export const IncreaseIcon = () => <MaterialSymbol>add</MaterialSymbol>;
export const MoveIcon = () => <MaterialSymbol>pan_tool_alt</MaterialSymbol>;
export const SaveIcon = () => <MaterialSymbol>saved</MaterialSymbol>;

//Notifications
export const ErrorIcon = (props: Props) => <MaterialSymbol {...props}>error</MaterialSymbol>;
export const InfoIcon = (props: Props) => <MaterialSymbol {...props}>info</MaterialSymbol>;
export const SuccessIcon = (props: Props) => <MaterialSymbol {...props}>check_circle</MaterialSymbol>;
export const WarningIcon = (props: Props) => <MaterialSymbol {...props}>warning</MaterialSymbol>;

export const ChevronLeftIcon = () => <MaterialSymbol>chevron_left</MaterialSymbol>;
export const ChevronRightIcon = () => <MaterialSymbol>chevron_right</MaterialSymbol>;

export const CollapseIcon = () => <MaterialSymbol className="collapse-icon">expand_less</MaterialSymbol>;
export const ExpandIcon = () => <MaterialSymbol className="expand-icon">expand_more</MaterialSymbol>;

export const CollapseAllIcon = () => <MaterialSymbol className="collapse-all-icon">keyboard_double_arrow_up</MaterialSymbol>;
export const ExpandAllIcon = () => <MaterialSymbol className="expand-all-icon">keyboard_double_arrow_down</MaterialSymbol>;

export const MenuIcon = () => <MaterialSymbol>menu</MaterialSymbol>;

//Inputs
export const CheckedIcon = () => <MaterialSymbol filled>toggle_on</MaterialSymbol>;
export const CheckedOutlineIcon = () => <MaterialSymbol>toggle_on</MaterialSymbol>;
export const UncheckedIcon = () => <MaterialSymbol filled>toggle_off</MaterialSymbol>;
export const UncheckedOutlineIcon = () => <MaterialSymbol>toggle_off</MaterialSymbol>;

//View Options
export const ListIcon = () => <MaterialSymbol>view_list</MaterialSymbol>;
export const GridIcon = () => <MaterialSymbol>grid_view</MaterialSymbol>;
export const HorizontalIcon = () => <MaterialSymbol>table_rows</MaterialSymbol>;
export const VerticalIcon = () => <MaterialSymbol>view_column</MaterialSymbol>;
export const DiceHandsIcon = () => <span className="game-icon game-icon-rolling-dices"></span>;
export const AttacksIcon = () => <GameIcon>silver-bullet</GameIcon>;
export const SpellsIcon = () => <GameIcon>magic-swirl</GameIcon>;
export const ReactionsIcon = () => <GameIcon>stopwatch</GameIcon>;
export const PassivesIcon = () => <GameIcon>beams-aura</GameIcon>;
export const EquipmentIcon = () => <span className="game-icon game-icon-light-backpack"></span>;
export const FeaturesIcon = () => <GameIcon>flying-flag</GameIcon>;
export const MinionsIcon = () => <span className="game-icon game-icon-bully-minion"></span>;
export const ExpertIcon = () => <GameIcon>upgrade</GameIcon>;