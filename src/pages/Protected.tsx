import { Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import useGetProfile from "@/hooks/useGetProfile";
import { useEffect } from "react";
import type { ProfileState } from "@/utils/types";

export default function Protected() {

    let accountType: ProfileState
    let token = sessionStorage.getItem("myToken");
    let profile = sessionStorage.getItem("profile")
    if (profile) {
        accountType = JSON.parse(profile)
    }

    const { data } = useGetProfile(token as string)

        accountType= data
    

    useEffect(() => {
        if (data) {
            sessionStorage.setItem("profile", JSON.stringify(data))
        }
    }, []);

    function logout() {
        sessionStorage.clear();
        window.history.replaceState({}, '', '/');
        window.location.reload();
    }

    return (
        <div>

            <Outlet />
            <div className="flex gap-2 items-center justify-center">

                {
                    (accountType && accountType.role === "admin") && <Button>Admin</Button>
                }

                <Button onClick={logout}>Logout</Button>
            </div>
        </div>
    )
}