import React from "react";
import { Rhetoric } from "../../../../../../entities/library/socials/Rhetoric";

type Props = { rhetoric: Rhetoric }

export const BaseRhetoric: React.FC<Props> = (props: Props) => {
    const { rhetoric } = props;
    return (
        <div className='value-modifier'>
            <label>Base:</label>
            <div className='value'>{rhetoric.level}</div>
        </div>
    );
}