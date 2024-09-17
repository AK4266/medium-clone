import { signupInput } from '@anandkomati/medium-clone-common';
import axios from 'axios';
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config';

function Auth({ type }: { type: "signup" | "signin" }) {
    const [postInputs, setPostInputs] = useState<signupInput>({
        email: "",
        username: "",
        password: ""
    })
    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const response = axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs
            )
            const jwt = (await response).data;
            localStorage.setItem("token", jwt);
            navigate('/blogs')
        } catch (error) {

        }
    }

    return (
        <div className='h-screen flex flex-col justify-center'>
            <div className='flex justify-center'>
                <div>
                    <div className='px-10'>
                        <div className='text-3xl font-bold '>
                            {type === "signup" ? "Create an account" : "Sign in to your account"}
                        </div>
                        <div className='text-slate-400'>
                            {type === "signin" ? "Don't have an account" : "Already have an acount?"}
                            <Link className='pl-2 underline' to={type === "signup" ? "/signin" : "/signup"}>{type === "signup" ? "Sign in" : "Sign up"}</Link>
                        </div>
                    </div>
                    <div className='flex flex-col pt-2'>
                        <LabelledInput label="Email" placeholder="Anand" onChange={(e) => {
                            setPostInputs(prev => ({
                                ...prev,
                                email: e.target.value
                            }))
                        }} />
                        {type === "signup" && <LabelledInput label="Username" placeholder="username..." onChange={(e) => {
                            setPostInputs(prev => ({
                                ...prev,
                                username: e.target.value
                            }))
                        }} />}
                        <LabelledInput label="Password" type='password' placeholder="password..." onChange={(e) => {
                            setPostInputs(prev => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }} />
                        <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 w-full focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-8">{type === 'signup' ? "Sign up" : "Sign in"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-gray-900 text-black font-semibold pt-4">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
    )
}
