import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UiConfig } from "../../../config/UIConfig";
import { Adventure } from "../../../entities/adventures/Adventure"
import { AdventureEvent } from "../../../entities/adventures/AdventureEvent";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { BreakdownWindow } from "../../theming/breakdown-window";

/**
 * Unfinished component. Intended to contain adventure events.
 * Deemed unnecessary for MVP.
 */

type Props = { adventure: Adventure }

export const AdventureEventLog: React.FC<Props> = (props: Props) => {
    const { adventure } = props;
    const dispatch = useDispatch();
    const [viewingLog, setViewLog] = useState(false);
    const onScroll = (e: React.UIEvent) => {
        const element = e.currentTarget;
        const scrollOffset = element.scrollHeight - element.scrollTop;
        if (scrollOffset  >= UiConfig.infiniteScrollThreshold) {
            // dispatch()
        }
    }
    return (
        <div>
            <ThemedButton onClick={() => setViewLog(true)}>View Adventure Log</ThemedButton>
            <BreakdownWindow visible={viewingLog} close={() => setViewLog(false)}
                onScroll={onScroll}>
                {adventure.events.map(event => <AdventureEventComponent key={event.id} event={event} />)}
            </BreakdownWindow>
        </div>
    );
}

type EventProps = { event: AdventureEvent }

const AdventureEventComponent: React.FC<EventProps> = (props: EventProps) => {
    const { event } = props;
    const occurred = new Date(event.occurred).toDateString();
    return (
        <div>
            <div>{occurred}</div>
            <div className="text">
                {event.text}
            </div>
        </div>
    );
}