import React from "react";
import { HandTrigger } from "../../../../../entities/rolls/HandTrigger";
import { HandTriggerComponent } from "../common/hand-triggers/HandTriggerComponent";
type Props = {
    handTriggers: HandTrigger[]
}

export const AbilityHands: React.FC<Props> = (props: Props) => {
    const { handTriggers } = props;
    return (
        <div className="content-divider">
            <header>Hands</header>
            {handTriggers.map(ht => <HandTriggerComponent key={ht.handTypes.join(', ')} handTrigger={ht} />)}
        </div>
    );
}