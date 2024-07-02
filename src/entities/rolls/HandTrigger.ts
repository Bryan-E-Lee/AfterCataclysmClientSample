import { HandTypeName, Hands } from "./Roll";

export interface HandTrigger {
    handTypes: HandTypeName[];
    description: string;
    source?: string;
}

export const GetHandTriggerKey = (ht: HandTrigger) => ht.handTypes.join(', ');

const GetLowestHandType = (handTrigger: HandTrigger) => handTrigger.handTypes.min(ht => {
    return Hands[ht].value;
});

export const HandOrderer = (handTriggerOne: HandTrigger, handTriggerTwo: HandTrigger) => {
    const handOneLow = GetLowestHandType(handTriggerOne);
    const handTwoLow = GetLowestHandType(handTriggerTwo);
    if (handOneLow < handTwoLow) {
        return -1;
    }
    if (handOneLow > handTwoLow) {
        return 1;
    }
    return 0;
}