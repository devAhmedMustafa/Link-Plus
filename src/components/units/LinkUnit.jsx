import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function LinkUnit({link}){

    const [isLink, setIsLink] = useState(false)

    const checkIfHref = ()=>{

        if(link.content.search(/\bhttp/) != -1 || link.content.search(/\bwww./) != -1 ){
            setIsLink(true)
        }
            
    }

    useEffect(()=>{
        checkIfHref()
    }, [link.content])

    return (

        <tr className="border-b-[1px]">
            <th>{link.head}</th>
            <th className="w-1/2 flex gap-4 items-center">
                <p className="border-2 rounded-full bg-neutral-100 py-1 px-3 text-ellipsis h-max-full overflow-hidden whitespace-nowrap">

                    {
                        isLink?
                        <>

                            <a target="_blank" href={link.content}>{link.content}</a>
                        </>:
                        <p>{link.content}</p>
                    }

                </p>

                {
                    isLink&&
                    <i className="fa-solid fa-link text-neutral-400"></i>
                    
                }
            </th>
            <th className="text-ellipsis h-max-full overflow-hidden whitespace-nowrap hidden md:table-cell">
                {link.date.slice(0, 10)}
            </th>
            <th className="flex items-center gap-2">{
                link.isPersistent? 
                <>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="hidden md:table-cell">Permanent</span>
                </> : 
                <> 
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="hidden md:table-cell">Temporary</span>
                </>
            }</th>
        </tr>

    )
}