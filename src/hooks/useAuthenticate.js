import { useState, useEffect } from "react";
import useFetch from "./useFetch";

export default function useAuthenticate(){

    const [authenticated, setAuthenticated] = useState()

    const {error} = useFetch(`/users/${localStorage['id']}`, {headers: {'Authorization' : localStorage['token']}})
    
    useEffect(()=>{
        error === false && setAuthenticated(true);
        error === true && setAuthenticated(false);
        console.log(error)
    }, [error])

    return authenticated;

}