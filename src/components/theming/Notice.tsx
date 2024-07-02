import React from "react";
import { JSXChildProps } from "../../entities/utils/jsx/Children"

type Props = JSXChildProps;

export const Notice: React.FC<Props> = (props: Props) => (
    <div className="notice">
        {props.children}
    </div>
)