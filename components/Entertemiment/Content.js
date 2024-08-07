import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import React, {useState,useRef} from "react";
import moment from 'moment';
import { useRouter } from 'next/router'
import {Share} from '../common/Share.js'
import { AiOutlineShareAlt, AiOutlineEye } from 'react-icons/ai'
import Image from 'next/future/image'
 
export function Content({entertainments}) {
    const router = useRouter()
    const shareUrl = router.asPath
    const [viewmodalOn, setviewModalOn] = useState(false)
    const [id, setid] = useState()
    const [getSearchValue,setgetSearchValue] = useState("")
    const [affectRead, setaffectRead ] = useState()
    console.log(entertainments)
    const clickedForview = () => {
      setviewModalOn(true)
    }
     return (
          <div className="w-full h-full my-20 lg:mt-0 px-3 lg:px-10">
               <div className="w-full px-3 lg:px-20 mb-5">
                     <div className="flex flex-col lg:flex-row w-full">
                         <div className="relative flex-1">
                             <input 
                                 id="search" 
                                 type="text" 
                                 className="block w-full px-2 lg:px-3 text-md lg:text-xl text-black dark:text-white bg-[#e6e6e6] dark:bg-[#02201D] py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#009688] focus:outline-none focus:ring-0 focus:border-[#009688] peer" placeholder=" "
                                 value={getSearchValue}
                                 onChange={(e) => setgetSearchValue(e.target.value)}
                             />
                             <label 
                                 htmlFor="floating_outlined" 
                                 className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#e6e6e6] dark:bg-[#02201D] px-2 peer-focus:px-2 peer-focus:text-[#009688] peer-focus:dark:text-[#009688] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                             >
                                 Search
                             </label>
                         </div>
                         <div className="lg:mx-2 mt-5 lg:mt-0 flex items-center justify-center">
                             <div className="dropdown inline-block relative">
                                 <button 
                                    onClick = {()=>{
                                        router.push({
                                          pathname:"/Entertemiment/Search",
                                          query:{searchValue:getSearchValue}
                                        })
                                    }}
                                    className="flex justify-between rounded-xl w-32 text-white bg-[#009688] hover:font-bold focus:ring-4 focus:ring-[#009688] font-medium text-md lg:text-xl px-2 lg:px-4 py-4 text-center inline-flex items-center"
                                >
                                     <span className="mr-1">Search</span>
                                 </button>
                             </div>
                         </div>
                     </div>  
               </div>
   
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-10 mb-5 w-full h-full px-0 lg:px-32">
                    {entertainments.map(({entertainment_id, CreatedDate, Header, ShortDescription, image, Category, view},index)=>(
                        <div key={index}>
                            <button 
                                onClick = {()=>{
                                    router.push({
                                        pathname:"/Entertemiment/Display",
                                        query:{entertainment_id:entertainment_id}
                                    })
                                }}
                                id={entertainment_id} key={index}  className="flex flex-col w-full lg:mt-5 group pt-5"
                            > 
                                <div className="w-full !h-52 lg:!h-72 relative">
                                    <Image src={image} fill className="!bg-cover w-full !h-full border rounded-xl" alt="latest entertainment image"/>
                                </div>

                                <div className="w-full flex flex-col text-left pt-2">
                                    <div className="flex flex-row justify-between items-center w-full mb-2">
                                        <h3 className="flex flex-col justify-between w-full">
                                            { Category.map((data,index)=>(
                                                <span key={index} className="text-xs font-bold dark:text-white text-slate-600 mb-1 w-full group-hover:text-[#009688]">
                                                    {data.CategoryName}
                                                </span>
                                            ))}
                                        </h3>
                                        
                                    </div>

                                    <h1 className="allListHeader group-hover:text-[#009688] text-left group-hover:underline font-extrabold dark:text-[#009688] text-slate-600 tracking-wide leading-snug">
                                        {Header}
                                    </h1>

                                    <div className="group-hover:text-[#009688] bg-transparent text-black dark:!text-white mt-2 text-md" dangerouslySetInnerHTML={{ __html: ShortDescription }} />
                                </div>
                            </button>

                            <div className="w-full flex flex-row justify-between items-center px-2 mt-5">
                                <h3 className="text-left font-normal text-sm lg:text-md dark:text-white text-slate-600">
                                  {moment(CreatedDate).utc().format('MMMM, Do YYYY')}
                                </h3>


                                <p className="flex flex-row items-center text-black dark:text-white hover:text-[#009688] font-bold py-2 hover:scale-110 duration-1000 ease-in-out rounded ">
                                  <AiOutlineEye size={20} />
                                  <span className="ml-3 text-xs">{view}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
     )
}
     