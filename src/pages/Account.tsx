import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import Heading from "@/components/Heading";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dateFormatter, extractInitials, extractNames, getStaff, getVolunteer, updateData } from "@/utils/fn";
import type { ProfileState, StaffDetails, VolunteerDetails } from "@/utils/types";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function Account() {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [changePasswordDto, setChangePasswordDto] = useState({ password: "" })

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    function togglePassVisibility() {
        setIsPasswordVisible(prev => !prev)
    }

    const queryClient = useQueryClient()
    const profile = queryClient.getQueryData(["profile"]) as ProfileState

    function handlePasswordChange() {

    }

    const initials = profile.staff ? extractInitials(profile.staff.firstName, profile.staff.lastName) : (profile.volunteer) ?
        extractInitials(profile.volunteer.firstName, profile.volunteer.lastName) : (profile.firstName && profile.lastName) ? extractInitials(profile.firstName, profile.lastName) : `VF`


    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['account', profile.staff?.id ?? profile.volunteer?.id],
    //     queryFn: async () => {
    //       if (profile.staff?.id) {
    //         return { type: 'staff' as const, data: await getStaff(profile.staff.id) };
    //       }
    //       if (profile.volunteer?.id) {
    //         return { type: 'volunteer' as const, data: await getVolunteer(String(profile.volunteer.id)) };
    //       }
    //       throw new Error('No active profile');
    //     },
    //     enabled: !!profile.staff?.id || !!profile.volunteer?.id,
    //   });



    return (
        <Container label="Account Information">
            <div className="space-y-10">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#B0E6FF] border-2 border-[#D9F3FF] p-2">
                        <p className="text-xl font-bold text-[#008BCC]">{initials}</p>
                    </div>
                    <div className="space-y-[-6px]">
                        <h6 className="text-[#171717] text-lg font-bold">{extractNames(profile)}</h6>
                        {/* <small className="text-[#808080] text-[10px]">{profile?.role}</small> */}
                    </div>
                </div>
                <Button onClick={openModal}>Change Password</Button>
            </div>

            {profile.staff && <>
                <div className="flex flex-col md:flex-row gap-10">

                    <div className="flex-1 flex flex-col gap-10">
                        <div>
                            <Heading
                                text="Personal Details"
                            />
                            <div className="mt-4 flex flex-col gap-2">
                                <Row
                                    label="Start Date"
                                    value={dateFormatter(profile.staff.startDate ? profile.staff.startDate : "")}
                                />

                                <Row
                                    label="Role"
                                    value={profile.staff?.role}
                                />

                                <Row
                                    label="Staff ID"
                                    value={profile.staff?.staffId}
                                />
                            </div>
                        </div>

                        <div>
                            <Heading
                                text="Contact"
                            />
                            <div className="mt-4 flex flex-col gap-2">
                                <Row
                                    label="Phone Number"
                                    value={profile.staff?.phone}
                                />

                                <Row
                                    label="Email Address"
                                    value={profile.staff?.email}
                                />

                                <Row
                                    label="Location"
                                    value={profile.staff?.location}
                                />

                                <Row
                                    label="House Address"
                                    value={profile.staff?.address}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-10">
                        <div className="">
                            <Heading
                                text="Emergency Contact"
                            />
                            <div className="mt-4 flex flex-col gap-2">

                                <Row
                                    label="Name"
                                    value={profile.staff?.cpName1}
                                />

                                <Row
                                    label="Relation"
                                    value={profile.staff?.cpRel1}
                                />

                                <Row
                                    label="Contact"
                                    value={profile.staff?.cpPhone1}
                                />
                            </div>
                        </div>
                        <div className="">
                            <Heading
                                text="Emergency Contact"
                            />
                            <div className="mt-4 flex flex-col gap-2">

                                <Row
                                    label="Name"
                                    value={profile.staff?.cpName2}
                                />

                                <Row
                                    label="Relation"
                                    value={profile.staff?.cpRel2}
                                />

                                <Row
                                    label="Contact"
                                    value={profile.staff?.cpPhone2}
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </>}

            {/* Change password modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <Heading text="Change Password" />
                <form action={handlePasswordChange}>
                    <div className="flex gap-2 items-end mb-5">
                        <Input
                            name="password"
                            placeholder="Password"
                            type={isPasswordVisible ? "text" : "password"}
                            minLength={6}
                            required
                            className="flex-1"
                            showLabel={true}
                            value={changePasswordDto?.password ?? ""}
                            onChange={e => updateData(e, setChangePasswordDto)}
                        />
                        <Button variant="ghost" size="icon" onClick={togglePassVisibility}>
                            {
                                isPasswordVisible ? <EyeOff /> : <Eye />
                            }
                        </Button>
                    </div>
                    <Button className="w-full">Change Password</Button>
                </form>
            </Modal>
        </Container>
    )
}