import { Outlet } from "react-router";
import { useLocalStorage } from "react-use";
import { Button } from "@/components/ui/button";

export default function Protected() {

    const [, , remove] = useLocalStorage("myToken")

    function logout() {
        remove();
      
        window.history.replaceState({}, '', '/');  
        window.location.reload();  
        
      }
    return (
        <div>

            <Outlet />
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}