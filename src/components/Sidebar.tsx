import type { CallFn, ProfileState } from '@/utils/types'
import Logo from '../assets/logo.png'
import LogoIcon from '../assets/icon.png'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar'
import { NavLink, useLocation } from 'react-router'
import { ChartLine, CircleUser, FileUp, GraduationCap, Handshake, History, LogOut, Target, User, UserRoundPlus, Users } from 'lucide-react'



export default function MySidebar({ profile, logout }: { profile: ProfileState, logout: CallFn }) {
    const { role} = profile
    const { pathname } = useLocation();


    const activeLink: string = "m-auto py-4 px-6 rounded-[6px] bg-[#00AEFF] border-2 border-[#B0E6FF] hover:bg-[#00AEFF] hover:text-white text-white"
    const normalLink: string = "m-auto py-4 px-6"

    const { setOpenMobile } = useSidebar()

    function closeSideBar() {
        setOpenMobile(false)
    }

    return (
        <Sidebar collapsible="icon" variant='sidebar' className='border-2'>
            <SidebarHeader className='px-10 py-10 group-data-[collapsible=icon]:px-0'>
                <img src={Logo} className='group-data-[collapsible=icon]:hidden' />
                <div className='max-w-8 m-auto hidden group-data-[collapsible=icon]:flex'>
                    <img src={LogoIcon} />
                </div>
            </SidebarHeader>
            <SidebarContent className='p-10 group-data-[collapsible=icon]:p-0'>
                <SidebarMenu className='gap-5 group-data-[collapsible=icon]:gap-3.5'>
                    <SidebarMenuItem className='w-full'>
                        <SidebarMenuButton className={pathname === "/" ? activeLink : normalLink} asChild onClick={closeSideBar}>
                            <NavLink to='/'>
                                <ChartLine />
                                <span>
                                    Dashboard
                                </span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    {
                        (role === "admin" || role === "editor") && (
                            <>
                                <SidebarMenuItem className='w-full'>
                                    <SidebarMenuButton className={pathname === "/students" ? activeLink : normalLink} asChild
                                        onClick={closeSideBar}
                                    >
                                        <NavLink to='/students'>
                                            <GraduationCap />
                                            <span>
                                                Students
                                            </span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )
                    }

                    {
                        role === 'admin' && (
                            <>
                                <SidebarMenuItem className='w-full'>
                                    <SidebarMenuButton className={pathname === "/volunteers" ? activeLink : normalLink} asChild
                                        onClick={closeSideBar}
                                    >
                                        <NavLink to='/volunteers'>
                                            <UserRoundPlus />
                                            <span>
                                                Volunteers
                                            </span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem className='w-full'>
                                    <SidebarMenuButton className={pathname === "/staff" ? activeLink : normalLink} asChild
                                        onClick={closeSideBar}
                                    >
                                        <NavLink to='/staff'>
                                            <User />
                                            <span>
                                                Staff
                                            </span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem className='w-full'>
                                    <SidebarMenuButton className={pathname === "/partners" ? activeLink : normalLink} asChild
                                        onClick={closeSideBar}
                                    >
                                        <NavLink to='/partners'>
                                            <Handshake />
                                            <span>
                                                Partners
                                            </span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                {/* Admin specials */}
                                <SidebarGroup>
                                    <SidebarGroupLabel>Admin</SidebarGroupLabel>
                                    <SidebarGroupContent className='space-y-2'>
                                        <SidebarMenuItem className='w-full'>
                                            <SidebarMenuButton className={pathname === "/upload" ? activeLink : normalLink} asChild
                                                onClick={closeSideBar}
                                            >
                                                <NavLink to='/upload'>
                                                    <FileUp />
                                                    <span>
                                                        Upload attendance
                                                    </span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem className='w-full'>
                                            <SidebarMenuButton className={pathname === "/target" ? activeLink : normalLink} asChild
                                                onClick={closeSideBar}>
                                                <NavLink to='/target'>
                                                    <Target />
                                                    <span>
                                                        Target
                                                    </span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem className='w-full'>
                                            <SidebarMenuButton className={pathname === "/upload-history" ? activeLink : normalLink} asChild onClick={closeSideBar}>
                                                <NavLink to='/upload-history'>
                                                    <History />
                                                    <span>
                                                        History
                                                    </span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem className='w-full'>
                                            <SidebarMenuButton className={pathname === "/accounts" ? activeLink : normalLink} asChild onClick={closeSideBar}>
                                                <NavLink to='/accounts'>
                                                <Users />
                                                    <span>
                                                       Users
                                                    </span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            </>
                        )
                    }
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter className='mt-5 px-10 pb-10 group-data-[collapsible=icon]:px-0 '>
                <SidebarMenuItem className='w-full list-none'>
                    <SidebarMenuButton className={pathname === "/profile" ? activeLink : normalLink} asChild onClick={closeSideBar}>
                        <NavLink to='/profile'>
                            <CircleUser />
                            <span>
                                Account
                            </span>
                        </NavLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuButton className='py-4 px-6 m-auto' onClick={logout}>
                    <LogOut />
                    <span>
                        Logout
                    </span>
                </SidebarMenuButton>
            </SidebarFooter>
        </Sidebar>
    )
}
