import React, {useState} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Image from 'next/future/image'
import { useRouter } from 'next/router'

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
    <div className="w-full h-[25rem] lg:h-[35rem] bg-[#ddd0c8] dark:bg-slate-700 relative px-5">
      <div className="absolute top-32 lg:top-44 flex flex-col justify-between left-0 right-0 m-auto w-full lg:w-[70%] px-2 lg:text-lg">
        <h1 className='text-green-700 text-2xl mb-10 font-bold md:text-4xl lg:text-5xl'>
          Hulu Media Hulu Neger
        </h1>

        <div className="px-2 lg:text-lg">
          <div className="flex h-16 w-full lg:w-[60%] border rounded-2xl border-white dark:border-slate-800 rounded-2xl">
            <div className="h-full bg-blue-800 text-white lg:px-3 flex items-center justify-center">
              <AiOutlineSearch size={20} />
            </div>
            <input 
              value={searchValue}                            
              onChange={(e) => setsearchValue(e.target.value)}
              className="flex-1 bg-white outline-none md:pl-6 text-sm lg:text-lg" />
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
      </div>
    </div>
  );
}