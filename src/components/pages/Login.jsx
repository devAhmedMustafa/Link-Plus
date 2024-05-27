import { useEffect, useRef, useState } from "react"
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../../hooks/useAuthenticate";
import { isDefined } from "../../../utils/TypeValid";

export default function Login(){

    const navigate = useNavigate();

    // Navigations
    const emailSectionRef = useRef();
    const passwordSectionRef = useRef();
    const container = useRef();

    // Email Configurations
    const emailBtnRef = useRef();
    const [emailExists, setEmailExists] = useState(false);
    
    // Inputs
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("");
    
    // Handle navigate to password ability
    useEffect(()=>{
        if (email.length == 0){
            emailBtnRef.current.disabled = true;
        }
        else{
            emailBtnRef.current.disabled = false;
        }
    }, [email])

    const ScrollToPassword = ()=>{
       
        axios.get(`${process.env.BACKEND}/users/checkEmail/${email}`).then(data=>{
            setEmailExists(true)
        }).catch(err=>{
            setEmailExists(false);
        });

        container.current.scrollTo({
            top: 0,
            left: 4000+window.screenX,
            behavior: "smooth",
        });

    }

    const ScrollBack = ()=>{
        container.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    const HandleSubmit = ()=>{

        // Validation
        if (password.length == 0) return;

        if (emailExists){
            axios.post(`${process.env.BACKEND}/users/authenticate`, {
                email: email,
                password: password,
            }, {headers: {'Content-Type': 'application/json'}}).then((res)=>{
                localStorage['token'] = res.data.token;
                localStorage['id'] = res.data.id;
                navigate('/');
            })
        }
        else{
            if (password != passwordConfirm) return;

            axios.post(`${process.env.BACKEND}/users/add`, {
                name: name,
                email: email,
                password: password,
            }, {headers: {'Content-Type': 'application/json'}}).then((res)=>{
                axios.post(`${process.env.BACKEND}/users/authenticate`, {
                    email: email,
                    password: password,
                }, {headers: {'Content-Type': 'application/json'}}).then((res)=>{
                    localStorage['token'] = res.data.token;
                    localStorage['id'] = res.data.id;
                    navigate('/');
                })
            })
        }
    }

    const authenticated = useAuthenticate();
    useEffect(()=>{

        if (authenticated === true){
            navigate('/')
        }
        
    }, [authenticated])

    return (
        <div className="flex flex-col w-full h-screen">
            <div className="p-[24px] flex justify-between items-center">
                <h1 className="text-[20px] font-semibold">Link+</h1>
                <h1 className="text-[14px] font-semibold">Developed by <a href="https://starplusgames.vercel.app" target="_blank">Star Plus Games</a> </h1>
            </div>
            
            <div className="w-full flex h-4/5 relative overflow-x-scroll" ref={container}>

                <div className="w-full h-full flex justify-center items-center" ref={emailSectionRef}>
                    <div className="w-full md:w-[400px] p-3 h-1/2 md:h-[184px] text-center transition-all duration-700" >

                        <section>
                            <h1 className="text-[24px] font-semibold">Create an account</h1>
                            <p>Enter your email to sign up for this app</p>
                        </section>

                        <input required onChange={(e)=> setEmail(e.currentTarget.value)} type="text" placeholder="email@domain.com" className="w-full border-2 border-solid border-[#E0E0E0] focus:outline-none p-2 rounded-lg mt-5"/>
                        <button ref={emailBtnRef} onClick={ScrollToPassword} className="w-full bg-main-red text-white text-sm p-2 rounded-lg mt-3 hover:bg-red-600 transition-all duration-500">Sign up with email</button>

                    </div>
                </div>

                <div className={`w-full h-full absolute -right-[1920px] flex justify-center items-center`} ref={passwordSectionRef}>
                    <div className="w-full md:w-[400px] p-3 h-1/2 md:h-[184px] text-center transition-all duration-700" >

                        <section>
                            <h1 className="text-[24px] font-semibold">Password</h1>
                            <p>Enter your password</p>
                        </section>

                        {!emailExists&&
                            <>
                            <input onChange={(e)=> setName(e.currentTarget.value)} type="text" placeholder="Enter your name" className="w-full border-2 border-solid border-[#E0E0E0] focus:outline-none p-2 rounded-lg mt-2"/>
                            </>
                        }

                        <input onChange={(e)=> setPassword(e.currentTarget.value)} type="text" placeholder="Password" className="w-full border-2 border-solid border-[#E0E0E0] focus:outline-none p-2 rounded-lg mt-5"/>

                        {!emailExists&&
                            <>
                            <input onChange={(e)=> setPasswordConfirm(e.currentTarget.value)} type="text" placeholder="Confirm password" className="w-full border-2 border-solid border-[#E0E0E0] focus:outline-none p-2 rounded-lg mt-2"/>
                            </>
                        }

                        <button onClick={HandleSubmit} className="w-full bg-main-red text-white text-sm p-2 rounded-lg mt-3 hover:bg-red-600 transition-all duration-500">Continue</button>

                        <button onClick={ScrollBack} className="w-fit px-4 py-1 bg-main-red rounded-full mt-2 text-white flex gap-2 items-center">
                            <i className="fa-solid fa-arrow-left-long"></i>Back
                        </button>

                    </div>
                </div>                

                

            </div>
        </div>
    )
}