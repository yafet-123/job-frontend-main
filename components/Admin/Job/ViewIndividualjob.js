import moment from 'moment';
import {DeleteJob} from './DeleteJob'
import {UpdateJob} from './UpdateJob'
import React from "react";
import { useState,useEffect, useContext} from 'react'

export function ViewIndividualjob({dataposttojob, setviewModalOn, categories, locations}) {
	const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletejobid,setdeletejobid] = useState()
    const [category, setcategory] = useState(dataposttojob.categories)
    const [location, setlocation] = useState(dataposttojob.Location)
    const [categorydata, setcategorydata] = useState([])
    console.log(category)
    // for (var i=0;i<category.length;i++){
    //     setcategorydata((categorydata) => [...categorydata, category[i].Category])
    // }

    // console.log(categorydata)
    const handleCancelClickForview = () => {
        setviewModalOn(false)
    }

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

	return(
		<div className="bg-neutral-100 dark:bg-slate-800 fixed inset-0 z-50">
            <div className="flex h-screen justify-center items-center ">
               	<div className="overflow-y-scroll lg:overflow-none flex-col w-full h-screen mx-2 lg:mx-10 justify-center bg-neutral-200 dark:bg-slate-500 py-5 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
               	    <h1 className="text-xl lg:text-2xl text-zinc-600 font-bold mb-10 dark:text-white text-center">Detail Job</h1>
               	    <div className="flex flex-col justify-between">
               	        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
               	            <h1 className="flex flex-col font-bold hover:underline">
               	                <span className="text-left text-md lg:text-xl text-black dark:text-white mb-3">Id</span>
               	                <span className="text-left text-xs lg:text-lg text-black dark:text-white break-words">{dataposttojob.job_id}</span>
                             </h1>

               	            <h1 className="flex flex-col font-bold hover:underline">
               	                <span className="text-left text-md lg:text-xl text-black dark:text-white mb-3">Created Date</span>
               	                <span className="text-left text-xs lg:text-lg text-black dark:text-white break-words">{moment(dataposttojob.CreatedDate).utc().format('YYYY-MM-DD')}</span>
               	            </h1>

                            <h1 className="flex flex-col font-bold hover:underline">
                                <span className="text-left text-md lg:text-xl text-black dark:text-white mb-3">Modified Date</span>
                                <span className="text-left text-xs lg:text-lg text-black dark:text-white break-words">{moment(dataposttojob.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                            </h1>
                                    
                            <h1 className="flex flex-col font-bold hover:underline">
                                <span className="text-left text-md lg:text-xl text-black dark:text-white mb-3">Created By</span>
                                <span className="text-left text-xs lg:text-lg text-black dark:text-white break-words">{dataposttojob.userName}</span>
                            </h1>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                            <h1 className="flex flex-col font-bold hover:underline">
                                <span className="text-left text-md lg:text-xl text-black dark:text-white mb-5">Company Name</span>
                                <span className="text-left text-xs lg:text-lg text-black dark:text-white break-words">{dataposttojob.CompanyName}</span>
                            </h1>

                            <h1 className="flex flex-col font-bold hover:underline">
                                <span className="text-left text-md lg:text-xl text-black dark:text-white mb-5">Career Level</span>
                                <span className="text-left text-xs lg:text-lg text-black dark:text-white break-words">{dataposttojob.CareerLevel}</span>
                            </h1>
                                    
                            <h1 className="flex flex-col font-bold hover:underline">
                                <span className="text-left text-md lg:text-xl text-black dark:text-white mb-5">Jobs Name</span>
                                <span className="text-left text-xs lg:text-lg text-black dark:text-white break-words">{dataposttojob.JobsName}</span>
                            </h1>

                            <h1 className="flex flex-col font-bold hover:underline">
                                <span className="text-left text-md lg:text-xl text-black dark:text-white mb-5">Salary</span>
                                <span className="text-left text-xs lg:text-lg text-black dark:text-white break-words">{dataposttojob.Salary}</span>
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                           	<h1 className="flex flex-col font-bold hover:underline">
                           	    <span className="text-left text-md lg:text-xl text-black dark:text-white mb-5">DeadLine</span>
                           	    <span className="text-left text-xs lg:text-lg text-black dark:text-white break-words">{dataposttojob.DeadLine}</span>
                           	</h1>

                            <h1 className="flex flex-col font-bold hover:underline">
                                <span className="text-md lg:text-xl text-black dark:text-white mb-3 text-left">Categories</span>
                                <div className="flex flex-col">
                                    { category.map((data,index)=>(
                                        <span key={index} className="text-xs lg:text-lg text-black dark:text-white text-left break-words">
                                            {data.CategoryName}
                                        </span>
                                    ))}
                                </div>
                            </h1>

                            <h1 className="flex flex-col font-bold hover:underline">
                                <span className="text-md lg:text-xl text-black dark:text-white mb-3 text-left">Location</span>
                                <div className="flex flex-col">
                                    { location.map((data,index)=>(
                                        <span key={index} className="text-xs lg:text-lg text-black dark:text-white text-left break-words">
                                            {data.LocationName}
                                        </span>
                                    ))}
                                </div>
                            </h1>
                        </div>

                       	<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-5">
                            <h1 className="flex flex-col font-bold">
                               	<span className="text-left text-md lg:text-xl text-black dark:text-white mb-3">Descreption</span>
                            	<div 
                                	className="h-52 w-full text-sm lg:text-lg text-black dark:text-white overflow-y-scroll" 
                                    dangerouslySetInnerHTML={{ __html: dataposttojob.Descreption }} 
                                />
                            </h1>

                            <h1 className="flex flex-col font-bold">
                                <span className="text-left text-md lg:text-xl text-black dark:text-white mb-3">Short Descreption</span>
                                <div 
                                    className="h-52 w-full text-sm lg:text-lg text-black dark:text-white overflow-y-scroll" 
                                        dangerouslySetInnerHTML={{ __html: dataposttojob.shortDescreption }} 
                                />
                            </h1>
                        </div>
                    </div>
                    <div className="flex lg:float-right">
                        <button 
                            onClick={
                                () => { 
                                    clickedForupdate()
                                }
                            }
                            className="bg-[#009688] text-white font-bold py-2 px-2 lg:px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded mx-2"
                       	>
                            Edit
                       	</button>
                       	<button onClick={() => {
                       	        clickedFordelete()
                       	        setdeletejobid(dataposttojob.job_id)
                       	    }} 
                       	    className="bg-red-500 text-white font-bold py-2 px-2 lg:px-4 border-b-4 border-red-500 hover:scale-110 duration-1000 ease-in-out rounded mx-2"
                       	>
                       	    Delete
                       	</button>

                       	<button
                            onClick={handleCancelClickForview} 
                            className="bg-blue-500 text-white font-bold py-2 px-2 lg:px-4 border-b-4 border-blue-500 hover:scale-110 duration-1000 ease-in-out rounded mx-2"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            {deletemodalOn && 
                <DeleteJob setdeleteModalOn={setdeleteModalOn} deletejobid={deletejobid}/>
            }

            {updatemodalOn && 
                <UpdateJob 
                    setupdateModalOn={setupdateModalOn} 
                    dataposttojob={dataposttojob}
                    categories={categories}
                    locations={locations}
                />
            }

        </div>
	)
}