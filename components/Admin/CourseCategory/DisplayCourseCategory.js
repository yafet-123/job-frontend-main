import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import {DeleteCategory} from './DeleteCategory'
import {UpdateCategory} from './UpdateCategory'

export function DisplayCourseCategory({categories}) {
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deletecategoryid,setdeletecategoryid] = useState()
    const [updatecategoryid,setupdatecategoryid] = useState()
    const [updatecategoryname,setupdatecategoryname] = useState("")
    const [updateShortDescription,setupdateShortDescription] = useState("")
    const [updatecolor,setupdatecolor] = useState("")
    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }
    return (
        <div className="px-0 lg:px-10 ">
            <div className="p-2 lg:p-5">
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                    <table className="w-full">
                        <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Category Name</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Color</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="p-3 text-lg text-gray-700 whitespace-nowrap">
                                        <p className="font-bold text-blue-500 dark:text-white hover:underline">{data.category_id}</p>
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.CategoryName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <div className={`${ data.color} w-10 h-10`}>
                                        </div>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        {data.userName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdatecategoryid(data.category_id)
                                                setupdatecategoryname(data.CategoryName)
                                                setupdateShortDescription(data.ShortDescription)
                                                setupdatecolor(data.color)
                                            }}
                                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white whitespace-nowrap">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeletecategoryid(data.category_id)
                                            }}
                                            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                    {categories.map((data,index)=>(
                        <div key={index} className="bg-neutral-200 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow">
                            <div>
                                <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.category_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Category Name : </span>
                                <span className="text-sm ">{data.CategoryName}</span>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Color : </span>
                                <div className={`${ data.color} w-10 h-10`}>
                                </div>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Created By : </span>
                                <span className="text-sm ">{data.userName}</span>
                            </div>
                            <div className="text-black font-bold dark:text-white">
                                <span className="text-lg">createDate : </span>
                                <span className="text-sm ">{moment(data.createDate).utc().format('YYYY-MM-DD')}</span>
                            </div>
                            <div className="text-black font-bold dark:text-white">
                                <span className="text-lg">Modified Date : </span>
                                <span className="text-sm">{moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <button
                                    onClick={() => {
                                        clickedForupdate()
                                        setupdatecategoryid(data.category_id)
                                        setupdatecategoryname(data.CategoryName)
                                        setupdateShortDescription(data.ShortDescription)
                                        setupdatecolor(data.color)
                                    }} 
                                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeletecategoryid(data.category_id)
                                    }}  
                                    className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {deletemodalOn && 
                <DeleteCategory setdeleteModalOn={setdeleteModalOn} deletecategoryid={deletecategoryid}/>
            }

            {updatemodalOn && 
                <UpdateCategory setupdateModalOn={setupdateModalOn} updatecolor={updatecolor} setupdatecolor={setupdatecolor} updatecategoryid={updatecategoryid} updatecategoryname={updatecategoryname} setupdateShortDescription={setupdateShortDescription} updateShortDescription={updateShortDescription} setupdatecategoryname={setupdatecategoryname}/>
            }
        </div>
  );
}