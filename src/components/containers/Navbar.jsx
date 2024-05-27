export default function Navbar(){
    return(
        <nav className="flex lg:flex-col p-[24px] w-full lg:w-[15%] items-center lg:items-start lg:h-full justify-between border-r-2 border-r-slate-200 sticky top-0">
                <h1 className="text-[20px] font-semibold">Link+</h1>
                <h1 className="text-[14px] font-semibold">Developed by <a href="https://starplusgames.vercel.app" target="_blank">Star Plus Games</a> </h1>
        </nav>
    )
}