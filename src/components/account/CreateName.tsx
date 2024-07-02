import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../store/stores/users/UserStore.Actions";
import { ThemedButton } from "../inputs/buttons/ThemedButton";
import { useNavigate } from "react-router";


export const CreateName = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState("");
    return (
        <main>
            <div className="contents">
                <form>
                    Hey there wastelander, we just need you to enter a username to finish setting up your account.
                    <div className="form-field">
                        <label>Username</label>
                        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                    </div>
                    <ThemedButton onClick={() => dispatch(UserActions.submitDisplayName(displayName, () => navigate("/")))}>
                        Submit
                    </ThemedButton>
                </form>
            </div>
        </main>
    );
}