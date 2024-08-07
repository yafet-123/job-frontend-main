import Link from "next/link";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import moment from 'moment'
import { useRouter } from 'next/router' 
import Image from 'next/image'

export function LatestJobs({latestjobs}) {
  const router = useRouter()
  return (
    <section className="w-full h-[50rem] md:px-10 md:py-10 bg-[#e6e6e6] dark:bg-[#02201D] flex flex-col brightness-100">
      <div className="flex justify-between items-center py-5 px-2 lg:px-10">
        <div className="flex items-center font-bold text-md md:text-2xl lg:text-3xl hover:text-4xl text-[#009688] dark:text-white capitalize">
          <AiOutlineClockCircle size={30} />
          <span className="ml-5">Latest Jobs</span>
        </div>
        <Link href="/Jobs">
          <a className="font-bold text-sm md:text-xl lg:text-2xl hover:text-3xl text-white p-3 lg:p-4 hover:p-5 bg-[#009688] capitalize border rounded-2xl">
            view all jobs
          </a>
        </Link>
      </div>

      <div className="md:max-w-7xl md:mx-auto bg-neutral-100 dark:bg-[#1B2637] w-full h-[40rem] border dark:border-[#000] rounded-lg md:mt-10 shadow-2xl shadow-zinc-900 flex flex-col overflow-y-scroll">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5 py-10">
          {latestjobs.map((data, index) => (
            <button
              className="flex justify-around items-center mb-5 px-10 py-5 group hover:bg-[#009688]"
              key={index}
              type = "button"
              onClick = {()=>{
                router.push({
                  pathname:"/Jobs/Display",
                  query:{job_id:data.job_id}
                })
              }}
            >
              <div className="flex flex-row w-full">
                <Image src={data.Image == "" || data.Image == null ? "/images/bgImage1.avif" : data.Image} width={100} height={100} alt="image" required className="my-5" />
                <div className="flex flex-col pt-2 lg:pt-0 ml-2 lg:ml-5">
                  <h1 className="text-left font-bold text-sm md:text-lg lg:text-xl text-[#009688] dark:text-white group-hover:text-white">
                    {data.JobsName}
                  </h1>
                  <h1 className="text-left font-light text-xs md:text-sm lg:text-lg text-[#009688] dark:text-white group-hover:text-white">
                    {data.CompanyName}
                  </h1>
                  <h1 className="font-light text-xs md:text-sm lg:text-lg text-[#009688] dark:text-white text-left group-hover:text-white">
                    {moment(data.createDate).utc().format('YYYY-MM-DD')}
                  </h1>
                </div>
              </div>
             </button>
            ))}
        </div>
      </div>
    </section>
  );
}

