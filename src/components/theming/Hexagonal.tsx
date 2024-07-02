import React from "react";
import { JSXChildProps } from "../../entities/utils/jsx/Children";

type Props = {
    className?: string;
} & JSXChildProps;

export const Hexagonal: React.FC<Props> = (props: Props) => (
    <div className={`hexagonal ${props.className}`}>
        <div className='contents'>
            {props.children}
        </div>
    </div>
)