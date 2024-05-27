import { useEffect, useRef, useState } from "react"
import AddLinkForm from "../units/AddLinkForm"

export default function Header({setLinks, data}){

    const [filter, setFilter] = useState("")


    const filterLinks = ()=>{
        const filteredLinks = data.filter((link)=>{
            return link.head.toLowerCase().includes(filter.toLowerCase())
        })
        setLinks(filteredLinks)
    }

    useEffect(()=>{
        if (filter === ""){
            setLinks(data)
        }
        else{
            filterLinks()
        }
    }, [filter])

    const showForm = ()=>{
        document.querySelector("#add_form").style.width = "100vw"
    }

    return (
        <div className="flex flex-col w-full gap-4 sticky top-0 bg-white py-2">

            <div className="flex justify-between items-center">

                <h1 className="font-semibold text-2xl">Links</h1>

                <button onClick={showForm} className="w-8 h-8 rounded-full flex justify-center items-center bg-main-red"><i className="fa-solid fa-plus text-white"></i></button>

            </div>

            <div className="border-2 max-w-full w-80 px-2 py-2 rounded-lg flex items-center gap-2">
                <i className="fa-solid fa-magnifying-glass text-neutral-400"></i>
                <input onChange={(e)=> setFilter(e.currentTarget.value)} type="text" className="" placeholder="Search for links..."/>
            </div>

            <AddLinkForm data={data} setLinks={setLinks}/>

        </div>
    )
}