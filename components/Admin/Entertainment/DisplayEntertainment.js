import React from "react";
import { useState,useEffect, useContext} from 'react'
import moment from 'moment';
import { useRouter } from 'next/router'
import Multiselect from 'multiselect-react-dropdown';
import {DeleteEntertainment} from './DeleteEntertainment' 
import {UpdateEntertainment} from './UpdateEntertainment'

export function DisplayEntertainment({categories, entertainment}) {
    const router = useRouter();
    const [categoryId, setCategoryId] = useState([])
    const [deletemodalOn, setdeleteModalOn] = useState(false);
    const [updatemodalOn, setupdateModalOn] = useState(false);
    const [deleteentertainmentid,setdeleteentertainmentid] = useState()
    const [updateentertainmentid,setupdateentertainmentid] = useState()
    const [updateheader,setupdateheader] = useState("")
    const [updateShortDescription,setupdateShortDescription] = useState("")
    const [updateDescription,setupdateDescription] = useState("")

    const clickedFordelete = () => {
        setdeleteModalOn(true)
    }

    const clickedForupdate = () => {
        setupdateModalOn(true)
    }

    return (
        <div className="px-0 lg:px-10">
            <div className="m-2 lg:m-">
                <div className="overflow-auto rounded-lg shadow hidden lg:block">
                    <table className="w-full">
                        <thead className="bg-neutral-100 dark:bg-slate-800 border-b-2 border-gray-200">
                            <tr>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Id</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Header</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Modified Date</th>
                              <th className="text-black dark:text-white p-3 text-lg font-semibold tracking-wide text-left">Created By</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {entertainment.map((data,index)=>(
                                <tr key={index} className="even:bg-neutral-300 odd:bg-neutral-200 even:dark:bg-gray-900 odd:dark:bg-gray-800 w-full">
                                    <td className="p-2 text-lg text-gray-700">
                                        <p className="font-bold text-[#009688] dark:text-white hover:underline">{data.entertainment_id}</p>
                                    </td>
                                    <td className="p-2 text-lg text-gray-700 dark:text-white">
                                        {data.Header}
                                    </td>
                                    <td className="p-2 text-lg text-gray-700 dark:text-white">
                                        {moment(data.createDate).utc().format('YYYY-MM-DD')}
                                    </td>
                                    <td className="p-2 text-lg text-gray-700 dark:text-white">
                                        {moment(data.ModifiedDate).utc().format('YYYY-MM-DD')}
                                    </td>

                                    <td className="p-2 text-lg text-gray-700 dark:text-white">
                                        {data.userName}
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white">
                                        <button
                                            onClick={() => {
                                                clickedForupdate()
                                                setupdateentertainmentid(data.entertainment_id)
                                                setupdateheader(data.Header)
                                                setupdateShortDescription(data.ShortDescription)
                                                setupdateDescription(data.Description)
                                            }}
                                            className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                            Edit
                                        </button>
                                    </td>

                                    <td className="p-3 text-lg text-gray-700 dark:text-white">
                                        <button 
                                            onClick={() => {
                                                clickedFordelete()
                                                setdeleteentertainmentid(data.entertainment_id)
                                            }}
                                            className="bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
                    {entertainment.map((data,index)=>(
                        <div key={index} className="bg-neutral-200 dark:bg-slate-800 space-y-3 p-2 lg:p-4 rounded-lg shadow">
                            <div>
                                <p className="text-blue-500 dark:text-white font-bold hover:underline">
                                    <span className="text-lg">Id : </span> 
                                    <span className="text-sm ">{data.entertainment_id}</span>
                                </p>
                            </div>
                            <div className="text-gray-700 dark:text-white font-bold">
                                <span className="text-lg">Header : </span>
                                <span className="text-sm ">{data.Header}</span>
                            </div>

                            <div className="text-gray-700 dark:text-white font-bold overflow-x-scroll">
                                <span className="text-lg">Link : </span>
                                <span className="text-sm ">{data.link}</span>
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
                                        setupdateentertainmentid(data.entertainment_id)
                                        setupdateheader(data.Header)
                                        setupdateShortDescription(data.ShortDescription)
                                        setupdateDescription(data.Description)
                                    }} 
                                    className="bg-[#009688] text-white font-bold py-2 px-4 border-b-4 border-[#009688] hover:scale-110 duration-1000 ease-in-out rounded">
                                    Edit
                                </button>

                                <button
                                    onClick={() => {
                                        clickedFordelete()
                                        setdeleteentertainmentid(data.entertainment_id)
                                    }}  
                                    className="bg-red-500 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:scale-110 duration-1000 ease-in-out rounded">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {deletemodalOn && 
                <DeleteEntertainment setdeleteModalOn={setdeleteModalOn} deleteentertainmentid={deleteentertainmentid}/>
            }

            {updatemodalOn && 
                <UpdateEntertainment 
                    setupdateModalOn={setupdateModalOn} 
                    updateentertainmentid={updateentertainmentid} 
                    updateheader = {updateheader}
                    setupdateheader = {setupdateheader}
                    updateShortDescription = {updateShortDescription}
                    setupdateShortDescription = {setupdateShortDescription}
                    updateDescription = {updateDescription}
                    setupdateDescription = {setupdateDescription}
                    categories={categories}
                />
            }
        </div>
  );
}
