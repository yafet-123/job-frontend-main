import { useRouter } from 'next/router'
import { CourseHeadData } from '../../data/courseHead'
import { MdOutlineSubject } from 'react-icons/md'

export function CourseHead({handleChapter,handleCourse}) {
  const router = useRouter()
  const { category_id } = router.query
  return (
    <div className="w-full bg-gray-400 dark:bg-slate-700 flex px-5 lg:px-20 justify-between h-12 lg:h-16">
      <div onClick={handleChapter} className="lg:hidden text-white z-10 flex items-center justify-center">
        <MdOutlineSubject size={30} /> 
      </div>

      <div className="hidden lg:flex h-12 lg:h-16">
        <div className='flex justify-between shadow-2xl w-full' >
          <ul className="flex flex-row w-full">
            { CourseHeadData.map((data,index)=>(
              <li className='flex text-center lg:gap-2 transition-none cursor-pointer hover:text-gray-600'
                key={index}
              >
                <button 
                  onClick = {()=>{
                    router.push({
                      pathname:data.link,
                      query:{CategoryName:data.title,id:1}
                    })
                  }}
                  key={index} 
                  className={
                    router.query.CategoryName == data.title
                      ? "bg-[#009688] text-2xl font-bold text-white p-4 whitespace-nowrap"
                      : "mx-5 text-2xl font-bold text-white hover:border-b-4 border-blue-800 whitespace-nowrap"
                    }
                  >
                    {data.title}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="ml-10 lg:hidden text-white flex overflow-x-scroll scroll_width">
        <div className="flex w-full">
          { CourseHeadData.map((data,index)=>(
            <button 
              onClick = {()=>{
                router.push({
                  pathname:data.link,
                  query:{CategoryName:data.title, id:1}
                })
                handleCourse()
              }}
              key={index} 
              className={`w-full px-3 text-xl font-bold
                ${ router.query.CategoryName == data.title ? "bg-[#009688] text-white" : "text-black hover:bg-gray-700 hover:text-orange-500" }`}
            >
              {data.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}