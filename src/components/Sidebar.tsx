import type { ProfileState } from '@/utils/types'
import Logo from '../assets/logo.png'
import LogoIcon from '../assets/icon.png'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavLink } from 'react-router'
import { logout } from '@/utils/fn'
import { ChartLine, GraduationCap, Handshake, LogOut, ShieldUser, User, UserRoundPlus } from 'lucide-react'
import { Dialog, DialogHeader } from './ui/dialog'
import { DialogContent, DialogDescription } from '@radix-ui/react-dialog'


export default function MySidebar({ profile }: { profile: ProfileState }) {
    const { role } = profile
    return (
        <Sidebar collapsible="icon" variant='sidebar'>
            <SidebarHeader className='px-10 py-10 group-data-[collapsible=icon]:px-0'>
                <img src={Logo} className='group-data-[collapsible=icon]:hidden' />
                <div className='max-w-8 m-auto hidden group-data-[collapsible=icon]:flex'>
                    <img src={LogoIcon} />
                </div>
            </SidebarHeader>
            <SidebarContent className='p-10 group-data-[collapsible=icon]:p-0'>
                <SidebarMenu className='gap-5 group-data-[collapsible=icon]:gap-3.5'>
                    <SidebarMenuItem className='w-full'>
                        <SidebarMenuButton className='m-auto py-4 px-6' asChild>
                            <NavLink className={({ isActive }) => isActive ? "text-red-700 flex gap-2" : ""} to='/'>
                                <ChartLine size={16} />
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
                                    <SidebarMenuButton className='m-auto py-4 px-6' asChild>
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
                                    <SidebarMenuButton className='m-auto py-4 px-6' asChild>
                                        <NavLink to='/volunteers'>
                                            <UserRoundPlus />
                                            <span>
                                                Volunteers
                                            </span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem className='w-full'>
                                    <SidebarMenuButton className='m-auto py-4 px-6' asChild>
                                        <NavLink to='/staff'>
                                            <User />
                                            <span>
                                                Staff
                                            </span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem className='w-full'>
                                    <SidebarMenuButton className='m-auto py-4 px-6' asChild>
                                        <NavLink to='/partners'>
                                            <Handshake />
                                            <span>
                                                Partners
                                            </span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem className='w-full'>
                                    <SidebarMenuButton className='m-auto py-4 px-6' asChild>
                                        <NavLink to='/participation'>
                                            <ShieldUser />
                                            <span>
                                                Participation
                                            </span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                        )
                    }
                </SidebarMenu>

            </SidebarContent>
            <SidebarFooter className='px-10 pb-10 group-data-[collapsible=icon]:px-0 '>
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
