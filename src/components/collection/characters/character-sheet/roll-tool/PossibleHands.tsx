import React from "react";
import { useSelector } from "react-redux";
import { Hand } from "../../../../../entities/rolls/Roll";
import { ApplicationState } from "../../../../../store/stores/ApplicationState";

export const PossibleRolls: React.FC = () => {
    const { communalRolls, hand } = useSelector((app: ApplicationState) => app.sheet);
    const totalRolls = communalRolls.length + hand.length;
    if (totalRolls < Hand.MinHandSize) {
        return null;
    }
    const finalHand = new Hand(...communalRolls, ...hand);
    return (
        <div className="possible-hands">
            <label className="standout">Possible Rolls:</label>
            <ul>
                <li>Bust</li>
                {finalHand.isPair && <li>Pair</li>}
                {finalHand.isTwoPair && <li>Two Pair</li>}
                {finalHand.isTriple && <li>Triple</li>}
                {finalHand.isSmallStraight && <li>Small Straight</li>}
                {finalHand.isFlush && <li>Flush</li>}
                {finalHand.isFullHouse && <li>Full House</li>}
                {finalHand.isBigStraight && <li>Big Straight</li>}
                {finalHand.isQuad && <li>Quad</li>}
                {finalHand.isJackpot && <li>Jackpot!</li>}
            </ul>
        </div>
    );
}