import React from 'react';
import { Hand } from '../../../entities/rolls/Roll';
import { ArticleNavLink } from '../../articles/navigation/article-navigation/ArticleNavLink';
import {
    BigStraightExample,
    BustExample,
    FlushExample,
    FullHouseExample,
    JackpotExample,
    PairExample,
    QuadExample,
    Roll,
    SmallStraightExample,
    TripleExample,
    TwoPairExample,
} from '../../figures/Rolls';
import { RollValuesFigure } from '../figures/RollValuesFigure';
import { CollapsibleSection } from '../../articles/CollapsibleSection';

export const ActionRollRulesLink = new ArticleNavLink({
    name: 'Rolls & Values',
    path: '#RollValues',
    render: () => <ActionRollRules />,
    sublinks: [
        new ArticleNavLink({ name: 'Bust', path: '#Bust' }),
        new ArticleNavLink({ name: 'Pair', path: '#Pair' }),
        new ArticleNavLink({ name: 'Two-Pair', path: '#TwoPair' }),
        new ArticleNavLink({ name: 'Triple', path: '#Triple' }),
        new ArticleNavLink({ name: 'Small Straight', path: '#SmallStraight' }),
        new ArticleNavLink({ name: 'Flush', path: '#Flush' }),
        new ArticleNavLink({ name: 'Full House', path: '#FullHouse' }),
        new ArticleNavLink({ name: 'Big Straight', path: '#BigStraight' }),
        new ArticleNavLink({ name: 'Quad', path: '#Quad' }),
        new ArticleNavLink({ name: 'Jackpot!', path: '#Jackpot' }),
        new ArticleNavLink({ name: 'Tie Breakers', path: '#TieBreaking' }),
    ],
});

const ActionRollRules: React.FC = () => {
    return (
        <section id={ActionRollRulesLink.hash}>
            <h2>{ActionRollRulesLink.name}</h2>
            <p>
                Each roll has an associated value known as its <em>Roll Value</em>. When two rolls are opposing one another, the roll with the higher roll value overrides a roll with a lesser value. Below is a list of all possible rolls in increasing order of strength (and likelihood); <em>e.g.</em> a Jackpot is better than a Flush:
            </p>
            <RollValuesFigure />
            
            <h4>Notation</h4>
            <p>
                Rolls are represented as such: <Roll roll={new Hand(1, 2, 3, 4, 5)} />. Sometimes, you may notice rolls with more than 5 dice, this indicates that additional dice were included in the roll as part of a skill or special effect.
            </p>
            <p>
                Below is a description of each roll, how that roll will be represented in this document in the future, and how to break ties with this roll. In the event ties must be broken between two rolls and all tie breaking rules have been exhausted, whichever roll preserves the current state of the game wins the tie. If neither preserves the current state of the game, then roll a d6 and choose one roll to win on a 1-3 and the other to win on 4-6.
            </p>

            <section id="Bust">
                <h3>Bust (e.g. <BustExample />)</h3>
                <p>
                    You roll a Bust when you have no other roll you can declare. There are only two possible Busts: <Roll roll={new Hand(6, 5, 4, 2, 1)} /> and <Roll roll={new Hand(6, 5, 3, 2, 1)} />. Busts have a roll value of 1.
                </p>
                <CollapsibleSection header="Tie Breaker">
                    <p>
                        In the unfortunate event that two Busts need a tie broken, the bust with the higher total sum of dice is the winner. For example, <Roll roll={new Hand(6, 5, 4, 2, 1)} /> will defeat <Roll roll={new Hand(6, 5, 3, 2, 1)} />.
                    </p>
                </CollapsibleSection>
            </section>

            <section id="Pair">
                <h3>Pair (e.g. <PairExample />)</h3>
                <p>
                    A Pair is a roll where at least two dice have matching faces. Pairs have a roll value of 2.
                </p>
                <CollapsibleSection header="Tie Breaker">
                    <p>
                        The higher pair die value wins. For example, <Roll roll={new Hand(6, 6, 4, 2, 1)} /> will defeat <Roll roll={new Hand(5, 5, 3, 2, 1)} />.
                    </p>
                </CollapsibleSection>
            </section>

            <section id="TwoPair">
                <h3>Two-Pair (e.g. <TwoPairExample />)</h3>
                <p>
                    A Two-Pair is a roll where at least two sets of two dice have matching faces. Two-Pairs have a roll value of 3.
                </p>
                <CollapsibleSection header="Tie Breaker">
                    <p>
                        The higher die valued pair wins. If those are the same, the die faces of the other pair are compared. For example, a roll of <Roll roll={new Hand(6, 6, 4, 4, 1)} /> will defeat <Roll roll={new Hand(4, 4, 3, 3, 2)} /> and <Roll roll={new Hand(6, 6, 4, 4, 2)} /> will defeat <Roll roll={new Hand(6, 6, 3, 3, 2)} />.
                    </p>
                </CollapsibleSection>
            </section>

            <section id="Triple">
                <h3>Triple (e.g. <TripleExample />)</h3>
                <p>
                    A Triple is a roll where at least three dice have matching faces. Triples have a roll value of 4.
                </p>
                <CollapsibleSection header="Tie Breaker">
                    <p>
                        The highest value of the tripled dice wins. For example, a roll of <Roll roll={new Hand(5, 5, 5, 4, 1)} /> will defeat <Roll roll={new Hand(4, 4, 4, 3, 2)} />.
                    </p>
                </CollapsibleSection>
            </section>

            <section id="SmallStraight">
                <h3>Small Straight (e.g. <SmallStraightExample />)</h3>
                <p>
                    A Small Straight is four dice in sequential order. Small Straights have a roll value of 5.
                </p>
                <CollapsibleSection header="Tie Breaker">
                    <p>
                        The highest die value in the straight wins. For example, <Roll roll={new Hand(5, 4, 3, 2, 2)} /> will defeat <Roll roll={new Hand(4, 3, 2, 1, 4)} />.
                    </p>
                </CollapsibleSection>
            </section>

            <section id="Flush">
                <h3>Flush (e.g. <FlushExample />)</h3>
                <p>
                    A Flush is a roll where all faces on the dice are odd, or all faces on the dice are even. Flushes have a hand value of 6.
                </p>
                <CollapsibleSection header="Tie Breaker">
                    <p>
                        The highest valued die wins. If those values are tied, the next highest die values are compared until all dice have been compared. For example, <Roll roll={new Hand(6, 4, 4, 4, 2)} /> will defeat <Roll roll={new Hand(5, 5, 3, 3, 1)} /> and <Roll roll={new Hand(6, 6, 4, 4, 2)} /> will defeat <Roll roll={new Hand(6, 6, 4, 2, 2)} />.
                    </p>
                </CollapsibleSection>
            </section>

            <section id="FullHouse">
                <h3>Full House (e.g. <FullHouseExample />)</h3>
                <p>
                    A Full House is a roll where at least three dice have matching faces, and the remaining two dice also have matching faces. Full Houses have a roll value of 7.
                </p>
                <CollapsibleSection header="Tie Breaker">
                    <p>
                        The roll with the highest die face for their three matching dice wins. If those are the same, the roll with the highest value for their two matching dice wins. For example, <Roll roll={new Hand(5, 5, 5, 2, 2)} /> will defeat <Roll roll={new Hand(3, 3, 3, 6, 6)} /> and <Roll roll={new Hand(4, 4, 4, 3, 3)} /> will defeat <Roll roll={new Hand(4, 4, 4, 2, 2)} />.
                    </p>
                </CollapsibleSection>
            </section>

            <section id="BigStraight">
                <h3>Big Straight (e.g. <BigStraightExample />)</h3>
                <p>
                    A Big Straight is five dice in sequential order. Big Straights have a roll value of 8.
                </p>
                <CollapsibleSection header="Tie Breaker">
                    <p>
                        The highest die value wins. For example, <Roll roll={new Hand(6, 5, 4, 3, 2)} /> will defeat <Roll roll={new Hand(5, 4, 3, 2, 1)} />.
                    </p>
                </CollapsibleSection>
            </section>

            <section id="Quad">
                <h3>Quad (e.g. <QuadExample />)</h3>
                <p>
                    A Quad is a roll where at least four dice have matching faces. Quads have a roll value of 9.
                </p>
                <CollapsibleSection header="Tie Breaker">
                    <p>
                        The highest quadrupled value wins. For example, <Roll roll={new Hand(4, 4, 4, 4, 1)} /> will defeat <Roll roll={new Hand(3, 3, 3, 3, 2)} />.
                    </p>
                </CollapsibleSection>
            </section>

            <section id="Jackpot">
                <h3>Jackpot! (e.g. <JackpotExample />)</h3>
                <p>
                    A Jackpot! is a roll where all five dice have matching faces. Jackpots! have a roll value of 10.
                </p>
                <CollapsibleSection header="Tie Breaker">
                    <p>
                        The highest die value wins. For example, <Roll roll={new Hand(2, 2, 2, 2, 2)} /> will defeat <Roll roll={new Hand(1, 1, 1, 1, 1)} />.
                    </p>
                </CollapsibleSection>
            </section>
        </section>
    );
};
