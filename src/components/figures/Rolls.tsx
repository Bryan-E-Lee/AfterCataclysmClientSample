import './hands.scss';
import React from 'react';
import { Hand, HandTypeName } from '../../entities/rolls/Roll';
import { Die } from './Die';

type SingleValueProps = {
    value: number;
};

type TwoValueProps = {
    valueOne: number;
    valueTwo: number;
};

type RollProps = {
    roll: Hand;
};

export const Roll = (props: RollProps) => (
    <span className="hand rolled"
        aria-roledescription="Represents a hand of dice.">
        {[...props.roll.rolls].map((roll, index) => (
            <Die key={index}>{roll}</Die>
        ))}
    </span>
);

export const BustExample = () => <Roll roll={new Hand(1,2,4,5,6)} />;

export const Pair = (props: SingleValueProps) => <span className="hand">Pair [{props.value}]</span>;
export const PairExample = () => <Roll roll={new Hand(3,3,5,6,1)} />;


export const TwoPair = (props: TwoValueProps) => (
    <span className="hand">
        Two-Pair [{Math.max(props.valueOne, props.valueTwo)}-
        {Math.min(props.valueOne, props.valueTwo)}]
    </span>
);
export const TwoPairExample = () => <Roll roll={new Hand(2,2,5,5,6)} />;


export const Triple = (props: SingleValueProps) => <span className="hand">Triple [{props.value}]</span>;
export const TripleExample = () => <Roll roll={new Hand(4,4,4,1,2)} />;


export const SmallStraight = (props: SingleValueProps) => <span className="hand">Small Straight [{props.value}]</span>;
export const SmallStraightExample = () => <Roll roll={new Hand(2,3,4,5,3)} />;


export const Flush: React.FC<SingleValueProps> = (props: SingleValueProps) => <span className="hand">Flush [{props.value}]</span>;
export const FlushExample = () => <Roll roll={new Hand(2,4,4,6,6)} />;


export const FullHouse: React.FC<TwoValueProps> = (props: TwoValueProps) => <span className="hand">Full House [{props.valueOne}-{props.valueTwo}]</span>;
export const FullHouseExample = () => <Roll roll={new Hand(1,1,1,4,4)} />;


export const BigStraight: React.FC<SingleValueProps> = (props: SingleValueProps) => <span className="hand">Big Straight [{props.value}]</span>;
export const BigStraightExample = () => <Roll roll={new Hand(1,2,3,4,5)} />;


export const Quad: React.FC<SingleValueProps> = (props: SingleValueProps) => <span className="hand">Quad [{props.value}]</span>;
export const QuadExample = () => <Roll roll={new Hand(6,6,6,6,1)} />;


export const Jackpot: React.FC<SingleValueProps> = (props: SingleValueProps) => <span className="hand">Jackpot! [{props.value}]</span>;
export const JackpotExample = () => <Roll roll={new Hand(5,5,5,5,5)} />;


export const HandTriggerExamplesByName: {[key in HandTypeName]: JSX.Element} = {
    'All': <></>,
    'Bust': <></>,
    'Pair': <PairExample />,
    'Two Pair': <TwoPairExample />,
    'Triple': <TripleExample />,
    'Small Straight': <SmallStraightExample />,
    'Flush': <FlushExample />,
    'Full House': <FullHouseExample />,
    'Big Straight': <BigStraightExample />,
    'Quad': <QuadExample />,
    'Jackpot!': <JackpotExample />
}