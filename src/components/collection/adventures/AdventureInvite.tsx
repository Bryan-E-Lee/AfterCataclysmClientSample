import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Adventure } from "../../../entities/adventures/Adventure"
import { AdventureActions } from "../../../store/stores/adventures/AdventureStore.Actions";
import { ThemedButton } from "../../inputs/buttons/ThemedButton";
import { CopyableText } from "../../theming/clipboard/CopyableText";

type Props = { adventure: Adventure };
type State = { resettingInviteId: string | null }

export const AdventureInvite: React.FC<Props> = (props: Props) => {
    const { adventure } = props;
    const dispatch = useDispatch();
    const [state, setState] = useState<State>({
        resettingInviteId: null
    });

    useEffect(() => {
        if (state.resettingInviteId != null && state.resettingInviteId != adventure.inviteId) {
            setState({ ...state, resettingInviteId: null });
        }
    }, [adventure, state.resettingInviteId, adventure.inviteId]);

    const onResetInvite = () => {
        if (state.resettingInviteId != null) {
            return;
        }
        setState({ resettingInviteId: adventure.inviteId });
        dispatch(AdventureActions.resetInvite(adventure));
    };

    const resettingInviteId = state.resettingInviteId == adventure.inviteId;
    return (
        <div className="adventure-invite">
            <div>
                <CopyableText disabled={resettingInviteId} description='Share this invitation link with others and have them join the adventure.'>
                    {`${window.location.origin}/Adventures/${adventure.inviteId}/Join`}
                </CopyableText>
            </div>
            <ThemedButton onClick={onResetInvite}>
                Recreate Invite Link
            </ThemedButton>
        </div>
    )
}