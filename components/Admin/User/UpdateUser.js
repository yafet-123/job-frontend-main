import axios from 'axios';
import { useRouter } from 'next/router'
export function UpdateUser({setupdateModalOn, updateuserid, updateemail, updateusername, setupdateemail , setupdateusername}) {
    const router = useRouter();
    const handleOKClickForupdate = async() => {
        const data = await axios.patch(`api/updateUser/${updateuserid}`,{
            "UserName": updateusername,
            "email": updateemail
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.log(error);
        });
        setupdateModalOn(false)
        router.reload()
    }

    const handleCancelClickForupdate = () => {
        setupdateModalOn(false)
    }

	return(
		<div className="bg-gray-200 dark:bg-slate-800 opacity-95 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center ">
                <div className="flex-col justify-center bg-white dark:bg-slate-500 py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-center text-xl text-zinc-600 font-bold mb-10 dark:text-white" >Update User</div>
                        <div className="flex flex-col justify-between items-center">
                            <div className="relative mb-10">
                                <input 
                                id="username" 
                                type="text" 
                                className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={updateusername}
                                onChange={(e) => setupdateusername(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Username
                            </label>
                        </div>

                        <div className="relative mb-10">
                            <input 
                                id="email" 
                                type="email" 
                                className="block w-full px-3 text-xl text-black dark:text-white bg-transparent py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={updateemail}
                                onChange={(e) => setupdateemail(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-2xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-500 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Email
                            </label>
                        </div>
                    </div>
                    <div className="flex">
                        <button onClick={handleOKClickForupdate} className=" rounded px-4 py-4 text-white  bg-green-400 hover:bg-green-600">Yes</button>
                        <button onClick={handleCancelClickForupdate} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                    </div>
                </div>
           	</div>
        </div>
	)
}