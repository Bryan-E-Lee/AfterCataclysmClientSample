import React from "react";
import { Character } from "../../../../../entities/characters/Character";
import { Rhetoric } from "../../../../../entities/library/socials/Rhetoric";

type Props = {
    character: Character;
    rhetoric: Rhetoric;
    onClick?: () => void;
}

export const RhetoricSheetComponent: React.FC<Props> = (props: Props) => {
    const { character, rhetoric, onClick } = props;
    const level = rhetoric.getLevel(character);
    return (
        <div key={rhetoric.instanceId} className="rhetoric">
            <label>{rhetoric.name}</label>
            <div className="midsection">
                {level != undefined && <div className="numeric-value" onClick={onClick}>{level}</div>}
                {level == undefined && "Not Set"}
            </div>
            {level != undefined &&
                <div className="undersection">
                    {rhetoric.getRoller(character).diceBoons && <div className="rolls">{rhetoric.getRoller(character).diceBoons}</div>}
                </div>
            }
        </div>
    );
}