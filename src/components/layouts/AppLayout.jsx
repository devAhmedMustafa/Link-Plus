import { Outlet } from "react-router-dom";
import Navbar from "../containers/Navbar";

export default function AppLayout(){
    return (
        <div className="flex w-full h-screen flex-col lg:flex-row overflow-scroll">

            <Navbar/>
            <div className="py-[24px] p-4 lg:px-[60px] w-full">
                
                <Outlet/>
                
            </div>


        </div>
    )
}