import axios from "axios";

export default function AddLinkForm({data, setLinks}){

    const HandleSubmit = (e)=>{
        e.preventDefault();

        console.log(e.target.isPersistent.checked)

        axios.post(`${process.env.BACKEND}/links/add`, {
            head: e.target.head.value,
            content: e.target.content.value,
            isPersistent: e.target.isPersistent.checked
        }, {
            headers:
            {
                "Authorization": localStorage['token'],
                "Content-Type": 'application/json'
            }
        }).then(res=>{
            console.log(res.data)
            hideForm()
            setLinks([...data, res.data])
        }).catch(err=>{
            console.error(err)
        })

    }

    const hideForm = ()=>{
        document.querySelector('#add_form').style.width = '0'
    }

    return (
        <div id="add_form" className="w-0 h-screen overflow-hidden fixed top-0 left-0 bg-[#1818188f] flex justify-center items-center transition-all duration-1000 flex-col">
            <form onSubmit={HandleSubmit} className="flex bg-white flex-col p-10 rounded-xl gap-4">

                <Input name="head" type="text"/>
                <Input name="content" type="text"/>

                <div className="flex gap-2">
                <label htmlFor="persistent">Persistent</label>
                <input type="checkbox" name="isPersistent" id="persistent"/>
                </div>

                <button className="p-2 bg-main-red text-white rounded-full" type="submit">Add Link</button>
            </form>

            <button onClick={hideForm} className="w-10 h-10 justify-center bg-main-red rounded-full mt-2 text-white flex gap-2 items-center">
                <i className="fa-solid fa-arrow-left-long"></i>
            </button>
        </div>
    )
}

function Input({name, type}){
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name}>{name[0].toUpperCase()+name.slice(1)}</label>
            <input className="border-2 rounded-lg p-2" id={name} type={type} name={name} placeholder={`Enter a ${name}`} />
        </div>
    )
}