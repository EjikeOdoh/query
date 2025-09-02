import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./Login";
import { useContext } from "react";
import { TokenContext } from "@/context/TokenContext";
import Protected from "./Protected";
import Students from "./Students";
import Search from "./Search";
import Student from "./StudentDetails";
import AddStudent from "./AddStudent";
import useGetProfile from "@/hooks/useGetProfile";
import type { ProfileState } from "@/utils/types";
import Staff from "./Staff";
import Volunteers from "./Volunteers";
import Partners from "./Partners";
import AddStaff from "./AddStaff";
import StaffDetails from "./StaffDetails";
import VolunteerDetails from "./VolunteerDetails";
import AddVolunteer from "./AddVolunteer";
import AddPartner from "./AddPartner";
import Dashboard from "./Dashboard";
import Upload from "./Upload";
import Target from "./Target";
import PartnerDetails from "./PartnerDetails";

export default function Navigation() {

    const value = sessionStorage.getItem("myToken")
    const token = useContext(TokenContext) || value


    const { data, isLoading, isError, error, isSuccess } = useGetProfile(token as string)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    if (isSuccess) {
        sessionStorage.setItem('profile', JSON.stringify(data))
    }

    const accountType: ProfileState = data

    return (
        <BrowserRouter>
            <Routes>
                {token ? (
                    <Route path="/" element={<Protected />} >
                        <Route index element={<Dashboard />} />
                        {
                            (accountType.role === "editor" || accountType.role === "admin") && <>
                                {/* Routes for students */}
                                <Route path='/students' element={<Students />} />
                                <Route path='/students/search' element={<Search />} />
                                <Route path='/add-student' element={<AddStudent />} />
                                <Route path='/students/:studentId' element={<Student />} />
                            </>
                        }

                        {
                            accountType.role === 'admin' && (
                                <>
                                    {/* Routes for volunteers */}
                                    <Route path='/volunteers' element={<Volunteers />} />
                                    <Route path='/add-volunteer' element={<AddVolunteer />} />
                                    <Route path='/volunteers/:volunteerId' element={<VolunteerDetails />} />

                                    {/* Routes for staff */}
                                    <Route path='/staff' element={<Staff />} />
                                    <Route path='/add-staff' element={<AddStaff />} />
                                    <Route path='/staff/:staffId' element={<StaffDetails />} />

                                    {/* Routes for partners */}
                                    <Route path='/partners' element={<Partners />} />
                                    <Route path='/add-partner' element={<AddPartner />} />
                                    <Route path='/partners/:partnerId' element={<PartnerDetails />} />

                                    {/* Admin routes */}
                                    <Route path='/upload' element={<Upload />} />
                                    <Route path='/target' element={<Target />} />
                                </>
                            )
                        }


                        {/* Handle random routes */}
                        <Route
                            path="*"
                            element={<Dashboard />}
                        />
                    </Route>
                ) : (
                    <>
                        <Route path='/' element={<LoginPage />} />
                        <Route
                            path="*"
                            element={<Dashboard />}
                        />

                    </>
                )}

            </Routes>

        </BrowserRouter>
    )
}