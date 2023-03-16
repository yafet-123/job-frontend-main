import React, {useState} from "react";
import { AiOutlineSearch, AiOutlineFacebook } from "react-icons/ai";
import { FaFacebookF,FaLinkedinIn,FaTwitter,FaYoutube} from "react-icons/fa";
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { CiTwitter } from "react-icons/ci";
import AboutUsHeroImageOne from '../../public/images/bgImage1.avif';

export function Hero() {
  const [search,setsearch] = useState("job")
  const router = useRouter();
  const [searchValue, setsearchValue] = useState("")
  const SearchList = [
    { type: 1, name: "job Type",},
    { type: 2, name: "Companies",},
  ];

  async function handleSearch(e){
    const data = await axios.post(`api/searchAdmin`,{
        "searchName": getSearchValue,
        "type": e
    }).then(function (response) {
      const objOneData = response.data
          if(Array.isArray(objOneData)){
              setsearchValue(objOneData)
          }else{
              const values = []
              values.push(objOneData)
              setsearchValue(values)
          }
      }).catch(function (error) {
          console.log(error);
      });
  }


  return (
    <div className="w-full h-[20rem] lg:h-[25rem] bg-[#ddd0c8] dark:bg-slate-700 relative">
      <div className="absolute top-0 lg:top-20 flex flex-col justify-between left-0 right-0 m-auto w-full lg:w-[70%]">
        <h1 className={`px-3 lg:px-0 text-2xl mb-5 lg:mb-10 font-bold md:text-4xl lg:text-5xl ${ search == "job" ? " text-green-700 " : "text-amber-800" } `}>
          Better Job. Better Talent
        </h1>
        <div className="flex flex-col lg:flex-row mb-2 lg:mb-5 px-3 lg:px-0">
          <button 
            className={`text-xl md:text-2xl lg:text-3xl lg:mr-5 ${ search == "job" ? "bg-green-700 text-white" : "text-black" } p-4  rounded-xl`} 
            onClick={() => setsearch("job")}
          >Job Type</button>
          <button 
            className={`text-xl md:text-2xl lg:text-3xl lg:mr-5 ${ search == "companies" ? "bg-amber-800 text-white" : "text-black" } p-4 rounded-xl`} 
            onClick={() => setsearch("companies")}
          >Companies</button>
          <button 
            className={`text-black text-xl md:text-2xl lg:text-3xl focus:text-white focus:bg-red-400 p-4 rounded-xl`} 
            onClick={() => router.push("/AdvanceSearch")}
          >Advance Search</button>
        </div>

        { search == "Job" ? (
          <div className="lg:text-lg">
            <div className="flex h-16 w-full lg:w-[60%] border border-green-400 dark:border-slate-800">
              <div className="h-full bg-green-400 text-white lg:px-3 flex items-center justify-center">
                <AiOutlineSearch size={20} />
              </div>
              <input 
                value={searchValue}                            
                onChange={(e) => setsearchValue(e.target.value)}
                className="flex-1 bg-white outline-none md:pl-6 text-sm lg:text-lg border-green-400" />
              <button 
                onClick={()=> router.push({
                  pathname: '/AdvanceSearch',
                  query: { searchName: searchValue, searchtype: 1 },
                })} 
                className="text-xs md:text-xl text-white bg-green-400 lg:px-3 flex items-center justify-center"
              >
                Search
              </button>
            </div>
          </div>
        )
        :(
          <div className="lg:text-lg">
            <div className="flex h-16 w-full lg:w-[60%] border border-green-400 dark:border-slate-800">
              <div className="h-full bg-green-400 text-white lg:px-3 flex items-center justify-center">
                <AiOutlineSearch size={20} />
              </div>
              <input 
                value={searchValue}
                onChange={(e) => setsearchValue(e.target.value)}
                className="flex-1 bg-white outline-none pl-1 md:pl-6 text-lg border-green-400" />
              <button
                onClick={()=> router.push({
                  pathname: '/AdvanceSearch',
                  query: { searchName: searchValue, searchtype: 3 },
                })} 
                className="text-md md:text-xl text-white bg-green-400 px-1 md:px-3 flex items-center justify-center"
              >
                Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}