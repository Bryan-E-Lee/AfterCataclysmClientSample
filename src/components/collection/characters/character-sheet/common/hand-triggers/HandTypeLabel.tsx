import React from "react";
import { HandTypeName } from "../../../../../../entities/rolls/Roll"
import { Die } from "../../../../../figures/Die";
import { BigStraightExample, FlushExample, FullHouseExample, JackpotExample, PairExample, QuadExample, SmallStraightExample, TripleExample, TwoPairExample } from "../../../../../figures/Rolls";

type Props = { handTypeName: HandTypeName }

export const HandTypeLabel: React.FC<Props> =  (props: Props) => {
    switch(props.handTypeName) {
        case 'Pair':
            return PairLabel;
        case 'Two Pair':
            return TwoPairLabel;
        case 'Triple':
            return TripleLabel;
        case 'Small Straight':
            return SmallStraightLabel;
        case 'Flush':
            return FlushLabel;
        case 'Full House':
            return FullHouseLabel;
        case 'Big Straight':
            return BigStraightLabel;
        case 'Quad':
            return QuadLabel;
        case 'Jackpot!':
            return JackpotLabel;
        default:
            return null;
    }
}

 const PairLabel = (
    <div className="standout">
        Pair
        (ex.&nbsp;<PairExample />&nbsp;)
    </div>
);

 const TwoPairLabel = (
    <div className="standout">
        Two Pair
        (ex.&nbsp;<TwoPairExample />&nbsp;)
    </div>
);

 const TripleLabel = (
    <div className="standout">
        Triple
        (ex.&nbsp;<TripleExample />&nbsp;)
    </div>
);

 const SmallStraightLabel = (
    <div className="standout">
        Quad
        (ex.&nbsp;<SmallStraightExample />&nbsp;)
    </div>
);

 const FlushLabel = (
    <div className="standout">
        Flush
        (ex.&nbsp;<FlushExample />&nbsp;)
    </div>
);

 const FullHouseLabel = (
    <div className="standout">
        Full House
        (ex.&nbsp;<FullHouseExample />&nbsp;)
    </div>
)

 const BigStraightLabel = (
    <div className="standout">
        Big Straight
        (ex.&nbsp;<BigStraightExample />&nbsp;)
    </div>
)

 const QuadLabel = (
    <div className="standout">
        Quad
        (ex.&nbsp;<QuadExample />&nbsp;)
    </div>
);

 const JackpotLabel = (
    <div className="standout">
        Jackpot!
        (ex.&nbsp;<JackpotExample />&nbsp;)
    </div>
);