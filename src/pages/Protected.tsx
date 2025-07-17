import { Outlet } from "react-router";
import { useLocalStorage } from "react-use";
import { Button } from "@/components/ui/button";
import useGetProfile from "@/hooks/useGetProfile";
import { useEffect } from "react";
import type { ProfileState } from "@/utils/types";

export default function Protected() {

    const [token, , removeToken] = useLocalStorage("myToken");
    const [profile, setProfile, removeProfile] = useLocalStorage("profile");

    let accountType: ProfileState = profile as ProfileState

    const { data } = useGetProfile(token as string)

    useEffect(() => {
        if (data) {
            setProfile(data);
        }
    }, [data, setProfile]);

    function logout() {
        removeToken();
        removeProfile();
        window.history.replaceState({}, '', '/');
        window.location.reload();
    }



    return (
        <div>

            <Outlet />
            <div className="flex gap-2 items-center justify-center">

                {
                    (!!accountType && accountType.role === "admin") && <Button>Admin</Button>
                }

                <Button onClick={logout}>Logout</Button>
            </div>
        </div>
    )
}