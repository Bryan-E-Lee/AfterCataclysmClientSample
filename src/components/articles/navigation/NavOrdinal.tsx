import './nav-ordinal.scss';
import React from 'react';

type Props = { ordinal: number };

export const NavOrdinal: React.FC<Props> = (props: Props) => (
    <span className="nav-ordinal">{props.ordinal}.</span>
);
