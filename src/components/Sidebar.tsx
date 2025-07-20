import type { ProfileState } from '@/utils/types'
import Logo from '../assets/logo.jpg'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger
} from '@/components/ui/sidebar'
import {  NavLink } from 'react-router'
import { logout } from '@/utils/fn'


export default function MySidebar({ profile }: { profile: ProfileState }) {
    const { role } = profile
    return (
        <Sidebar collapsible="offcanvas" variant='sidebar'>
            <SidebarTrigger />
            <SidebarHeader>
                <img src={Logo} />
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to='/'>
                                Dashboard
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {
                        (role === "admin" || role === "editor") && (
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <NavLink to='/students'>
                                            Students
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )
                    }

                    {
                        role === 'admin' && (
                            <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <NavLink to='/volunteers'>
                                            Volunteers
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <NavLink to='/staff'>
                                            Staff
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <NavLink to='/partners'>
                                            Partners
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )
                    }

                </SidebarMenu>

            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuButton onClick={logout}>
                    Logout
                </SidebarMenuButton>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>

    )
}
