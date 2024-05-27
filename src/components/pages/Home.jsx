import { redirect, useNavigate } from "react-router-dom";
import useAuthenticate from "@hooks/useAuthenticate"
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import LinkUnit from "../units/LinkUnit";
import Header from "../containers/Header";

export default function Home(){

    const authenticated = useAuthenticate();
    const navigate = useNavigate();
    const [links, setLinks] = useState([])

    const {data, loading} = useFetch('/links', {headers: {'Authorization': localStorage['token']}})

    useEffect(()=>{

        if (authenticated === false){
            navigate('/auth')
        }
        
    }, [authenticated])

    useEffect(()=>{
        if (data != undefined){
            setLinks(data)
        }
    }, [data])

    return (
        <div className="w-full flex flex-col gap-6 relative">

            <Header setLinks={setLinks} data={data}/>

            {
                links &&
                    
                <table className="w-full text-start overflow-scroll">
                    <thead>
                        <tr>
                            <th className="font-bold">Head</th>
                            <th className="font-bold">Content</th>
                            <th className="font-bold hidden md:table-cell">Date</th>
                            <th className="font-bold"><span className="hidden md:table-cell">Status</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            links.map((link)=>{
                                return <LinkUnit key={link.uuid} link={link}/>
                            })
                        }

                    </tbody>
                </table>
            }
            

        </div>
    )
}