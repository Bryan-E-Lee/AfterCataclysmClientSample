import './close-button.scss';
import React from "react";
import { CloseIcon } from "../../icons";

type Props = {
    close: () => unknown;
}

export const CloseButton = (props: Props) => (
    <button className="close-button" onClick={props.close}>
        <CloseIcon />
    </button>
)