import { BrowserRouter, Routes, Route, useNavigate, redirect } from "react-router";
import LoginPage from "./Login";
import { useContext } from "react";
import { TokenContext } from "@/context/TokenContext";
import { useLocalStorage } from "react-use";
import Protected from "./Protected";
import Students from "./Students";
import Search from "./Search";
import Student from "./StudentDetails";

export default function Navigation() {

    const [value] = useLocalStorage("myToken")
    const token =  useContext(TokenContext) ||value

    return (
        <BrowserRouter>
            <Routes>
                {token ? (
                    <Route path="/" element={<Protected />} >
                        <Route index element={<Students />} />
                        <Route path='/search' element={<Search />} />
                        <Route path='/student/:studentId' element={<Student />} />
                        <Route
                            path="*"
                            element={<Students />                            }
                        />
                    </Route>
                ) : (
                    <>
                        <Route path='/' element={<LoginPage />} />
                        <Route
                            path="*"
                            element={<LoginPage />}
                        />

                    </>
                )}

            </Routes>

        </BrowserRouter>
    )
}