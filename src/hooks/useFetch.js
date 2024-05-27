import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url, options = null){

    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    
    const fetchData = async (url)=>{
        const response = await axios.get(`${process.env.BACKEND}${url}`, options);
        return response;
    }

    useEffect(()=>{

        setLoading(true);

        fetchData(url).then((response)=>{
            setData(response.data);
            setError(false)
        }).catch((err)=>{
            setError(true);
        })

        setLoading(false);
    }, [url])

    return {data: data, error: error, loading: loading}

}