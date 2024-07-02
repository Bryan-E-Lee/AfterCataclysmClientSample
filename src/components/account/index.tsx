import React, { useEffect } from "react"
import { Profile } from "./Profile"
import { CreateName } from "./CreateName"
import { Route, Routes, useNavigate } from "react-router"
import { useAuth0 } from "@auth0/auth0-react"
import { useDispatch } from "react-redux"

export const Account = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [dispatch, navigate, isAuthenticated])
    return (
        <Routes>
            <Route path='CreateName' element={<CreateName />} />
            <Route path="*" element={<Profile />} />
        </Routes>
    )
}