import './hand-triggers-view.scss';
import React from "react";
import { HandTypeName, HandTypeNames } from "../../../../../entities/rolls/Roll";
import { HandTrigger } from "../../../../../entities/rolls/HandTrigger";
import { HandTriggerExamplesByName } from "../../../../figures/Rolls";
import { MarkdownContainer } from '../../../../theming/MarkdownContainer';

type Props = {
    handTriggers: HandTrigger[];
    restrictToHand?: HandTypeName;
}

type HandTriggerCollectionItem = {
    key: string;
    contents: React.ReactNode;
}

type HandTriggerCollections = {
    [handTypeName in HandTypeName]: HandTriggerCollectionItem[];
}

const DefaultHandTriggerCollections: HandTriggerCollections = {
    'Bust': [],
    'Pair': [],
    'Two Pair': [],
    'Triple': [],
    'Small Straight': [],
    'Flush': [],
    'Full House': [],
    'Big Straight': [],
    'Quad': [],
    'Jackpot!': [],
    'All': []
}

export const AggregateHandTriggersView = (props: Props) => {
    const { handTriggers, restrictToHand } = props;
    const handTriggerCollections: HandTriggerCollections = { ...DefaultHandTriggerCollections };
    for (let handTrigger of handTriggers) {
        for (let handTypeName of handTrigger.handTypes) {
            const collection = handTriggerCollections[handTypeName];
            const descriptions = collection.map(c => c.contents);
            const description = handTrigger.description;
            if (descriptions.contains(description)) {
                continue;
            }

            let sourceText = <></>;
            if (handTrigger.source) {
                sourceText = <label className='standout'>({handTrigger.source})&nbsp;</label>;
            }
            const contents = <>{sourceText}<MarkdownContainer>{handTrigger.description}</MarkdownContainer></>;
            const collectionItem = {
                key: `${handTrigger.source}${handTrigger.description}`,
                contents
            }
            handTriggerCollections[handTypeName] = [...collection, collectionItem];
        }
    }
    return (
        <div>
            {HandTypeNames.filter(htn => restrictToHand == null || htn == restrictToHand)
                .map(htn => {
                    const collections = handTriggerCollections[htn];
                    if (!collections.any()) {
                        return null;
                    }
                    return (
                        <div key={htn} className="hand-trigger">
                            {restrictToHand == null && (<header>{htn} (e.g. {HandTriggerExamplesByName[htn]})</header>)}
                            {restrictToHand != null && (<header>Effects</header>)}
                            <ul>
                                {collections.map(item => (
                                    <li key={item.key}>{item.contents}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                )}
        </div>
    );
}

export const SplitHandTriggersView = (props: Props) => {
    const { handTriggers, restrictToHand } = props;
    return (
        <div>
            {handTriggers.filter(htn => restrictToHand == null || htn.handTypes.contains(restrictToHand))
                .map(ht => (
                    <div key={ht.handTypes.join()}>
                        {restrictToHand == null && (<header>
                            {ht.handTypes.map((type => <span key={type}>{type} (e.g. {HandTriggerExamplesByName[type]})<br /></span>))}
                        </header>)}
                        {restrictToHand != null && (<header>Effects</header>)}
                        <div className='trigger-description'><MarkdownContainer>{ht.description}</MarkdownContainer></div>
                    </div>
                ))}
        </div>
    )
}