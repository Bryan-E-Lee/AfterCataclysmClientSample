import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useParams } from "react-router"
import { AdventureActions } from "../../../store/stores/adventures/AdventureStore.Actions";
import { LoadingText } from "../../theming/loader/LoadingText";
import { useNavigate } from "react-router";

export const JoinAdventure: React.FC = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const inviteId = params["inviteId" as keyof typeof params];
    useEffect(() => {
        if (inviteId != null) {
            dispatch(AdventureActions.join(inviteId, (id: string) => navigate(id), () => navigate("/Adventures")));
        }
    }, [dispatch, inviteId]);
    
    if (inviteId == null) {
        navigate("/Adventures");
    }
    return <LoadingText>Joining Adventure...</LoadingText>;
}