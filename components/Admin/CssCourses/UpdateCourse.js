import axios from 'axios';
import React, { useMemo, useRef, useState } from "react"
import { useRouter } from 'next/router'
import Multiselect from 'multiselect-react-dropdown';
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { useSession } from "next-auth/react";
import RotateLoader from "react-spinners/RotateLoader";

const QuillNoSSRWrapper = dynamic(
  async () => {
    const QuillNoSSRWrapper = (await import("react-quill")).default
    function Imagehandle({ forwardedRef, ...rest }){
        return <QuillNoSSRWrapper ref={forwardedRef} {...rest} />
    }
    return Imagehandle
  },
  {
    ssr: false,
  },
)

export function UpdateCourse({categorie, setupdateModalOn, updatecourseid, updatetitle ,setupdatetitle ,updatecontent ,setupdatecontent }) {
    const router = useRouter();
    const [categoryId, setCategoryId] = useState([])
    const { status, data } = useSession();
    const [loading, setLoading] = useState(false);
    const UserData = data.user;
    const quillRef = useRef(null)
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],

                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                    [{ 'direction': 'rtl' }],                         // text direction
            
                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                    [{ 'font': [] }],
                    [{ 'align': [] }],

                    ["link","image", "video"],
                ],
            handlers: {
                image: imageHandler,
            },
        },

        clipboard: {
            matchVisual: false,
        },
    }),[])

    function imageHandler() {
        console.log(quillRef)
        if (!quillRef.current) return
        
        const editor = quillRef.current.getEditor()
        const range = editor.getSelection()
        const value = prompt("Please enter the image URL")
        console.log(value)
        console.log(range)
        console.log(editor)
        if (value && range) {
          editor.insertEmbed(range.index, "image", value, "user")
        }
    }

	const handleOKClickForupdate = async() => {
        setLoading(true)
        const data = await axios.patch(`../api/updatecsscourse/${updatecourseid}`,{
            "title": updatetitle,
            "content": updatecontent,
            "categoryId":categoryId,
            "user_id": UserData.user_id,
        }).then(function (response) {
            console.log(response.data);
            router.reload()
        }).catch(function (error) {
            console.log(error);
            setLoading(false)
        });
        setupdateModalOn(false)
        
    }

    const handleCancelClickForupdate = () => {
        setupdateModalOn(false)
    }

	return(
		<div className="bg-neutral-300 dark:bg-slate-800 opacity-95 fixed inset-0 z-50 h-full overflow-y-scroll ">
            <div className="flex justify-center items-center">
                <div className="flex-col justify-center bg-neutral-200 dark:bg-slate-500 py-24 px-5 lg:px-10 border-4 border-sky-500 rounded-xl ">
                    <div className="flex text-center text-xl text-zinc-600 font-bold mb-10 dark:text-white" >Update Course</div>
                    <div className="flex flex-col justify-between items-center">
                        <div className="relative flex-1 w-full my-5">
                            <input  
                                id="title" 
                                type="text" 
                                required
                                className="block w-full px-3 text-md lg:text-xl text-black dark:text-white bg-white py-4 border-2 border-black rounded-xl appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" "
                                value={updatetitle}
                                onChange={(e) => setupdatetitle(e.target.value)}
                            />
                            <label 
                                htmlFor="floating_outlined" 
                                className="absolute text-md lg:text-xl text-black dark:text-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-slate-700 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                                Title
                            </label>
                        </div>

                        <QuillNoSSRWrapper 
                            value={updatecontent} 
                            onChange={setupdatecontent} 
                            modules={modules} className="!bg-white dark:!bg-white dark:!text-black !mx-2 my-5" 
                            theme="snow" 
                        />
                    </div>
                    <div className="flex">
                        <button 
                            disabled={loading}
                            onClick={handleOKClickForupdate} 
                            className={`rounded px-4 py-4  ${loading ? "text-black bg-gray-200" : "text-white  bg-green-400 hover:bg-green-600"}`}
                        >
                            Yes
                        </button>
                        <button onClick={handleCancelClickForupdate} className="rounded px-4 py-4 ml-4 text-white bg-blue-400 hover:bg-blue-600">No</button>
                    </div>

                    <div className="flex justify-center items-center mt-5">
                        <RotateLoader 
                            color="#36d7b7"
                            loading={loading}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            </div>
        </div>
	)
}