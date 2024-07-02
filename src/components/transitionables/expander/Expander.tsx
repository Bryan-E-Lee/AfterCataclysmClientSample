import './expander.scss';
import React, { useRef } from "react";
import { Transition } from "react-transition-group";
import { getHeightWithMargins } from "../../../entities/utils/elements/Elements";
import { JSXChildProps } from "../../../entities/utils/jsx/Children";
import { TransitionCssClassMappings } from '../TransitionCssClassMappings';

type Props = {
    className?: string;
    expand: boolean;
} & JSXChildProps;

export const Expander: React.FC<Props> = (props: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    const onEnter = () => ref.current!.style.height = (0).toString();
    const onEntering = () => ref.current!.style.height = `${ref.current!.scrollHeight}px`;
    const onEntered = () => ref.current!.style.height = '';
    const onExit = () => ref.current!.style.height = `${getHeightWithMargins(ref.current!)}px`;
    const onExiting = () => ref.current!.style.height = (0).toString();

    return (
        <Transition nodeRef={ref}
            timeout={350}
            onEnter={onEnter}
            onEntering={onEntering}
            onEntered={onEntered}
            onExit={onExit}
            onExiting={onExiting}>
            {(state: string, subprops: any) => (
                <div ref={ref} className={`${props.className} collapse ${TransitionCssClassMappings[state]}`} {...subprops}>
                    {props.children}
                </div>
            )}
        </Transition>
    );
}