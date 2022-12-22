import React from "react";
import Link from "next/link";
import { JobRequirement } from "../data/JobRequirement";
import { AiOutlineMenu } from "react-icons/ai";
import Image from 'next/image'
import { LatestJobs } from "../components/LatestJobs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { LatestJobsList } from "../data/LatestJobs"
import { JobsByLocation } from "../data/JobsByLocation";
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client'
import axios from 'axios';
const prisma = new PrismaClient()
import moment from 'moment';

export async function getServerSideProps(context){
	const {params,req,res,query} = context
  const location_id = query.location_id

  const categories = await prisma.Category.findMany()
  
  const latestjobs = await prisma.Job.findMany({
    orderBy: {
      CreatedDate:"desc"
    },
    include:{
      Location:{
        select:{
          LocationName:true
        }
      }
    } 
  });

  const Alllatestjobs = latestjobs.map((data)=>({
    job_id:data.job_id,
    CompanyName:data.CompanyName,
    JobsType:data.JobsType,
    Location:data.Location.LocationName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate
  }))
  
  const Allcategories = categories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
  }))

  return{
    props:{
    	Alllatestjobs:JSON.parse(JSON.stringify(Alllatestjobs)),
      categories:JSON.parse(JSON.stringify(Allcategories)),
    }
  }
}

export default function JobsByCategory({categories,Alllatestjobs}) {
	const router = useRouter();
	const { category, howmany } = router.query
  return (
    <section className="bg-gray-200 dark:bg-slate-700 flex flex-col w-full h-full py-20 px-0 md:px-32">
    	<div className="flex flex-col bg-white dark:bg-slate-800 w-full h-full px-5 py-10 border rounded-xl">
	    	<h1 className="text-black dark:text-white text-3xl capitalize font-bold mb-10">{howmany} {category} Jobs</h1>
      	<div className="flex flex-col md:flex-row w-full ">
      		<div className="flex flex-col w-full lg:w-1/4 bg-white p-3 dark:bg-slate-800">
      			<h1 className="text-2xl text-black dark:text-white font-bold capitalize text-center mb-10">Jobs By Category</h1>
      				<div className="flex flex-col h-96 lg:h-[40rem] overflow-y-scroll bg-gray-200 dark:bg-slate-700 p-3">
	      				{categories.map((data, index) => (
	      					<button 
	      						className="flex items-center justify-between group hover:bg-white py-2 mb-5 px-2" 
	      						key={index}
	      						onClick = {()=>{
                      router.push({
                        pathname:"/JobsByCategory",
                        query:{category:"Computer Science", howmany:data.howmany}
                      })
                    }}
	      					>
		      					<h1 className="text-left font-normal text-sm md:text-lg lg:text-xl capitalize group-hover:text-orange-500">
		                	{data.CategoryName}
		                </h1>

		                <h1 className="text-left text-blue-800 font-bold text-sm md:text-lg lg:text-xl group-hover:text-orange-500 group-hover:border-orange-200">
                      {data.howmany}
                    </h1>
		              </button>
	      				))}
	      			</div>
      		</div>
      		<div className="flex flex-col w-full lg:w-2/4 bg-white dark:bg-slate-800 p-3 lg:border-l-2">
      			<div className="flex flex-col w-full bg-gray-200 mb-10 p-3 border rounded-lg">
      				<div className="flex justify-between items-center">
	      				<Link href="/DisplayJobs">
      						<a className="text-2xl text-blue-600 font-bold">Job Type: Purchasing Officer</a>
      					</Link>
	      				<p className="text-lg text-blue-500">Posted: Today</p>
      				</div>

	      			<div className="flex flex-col-reverse md:flex-row justify-between items-center">
		      			<ul className="mt-10">
				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Company Name:</h1>
				      			<p className="text-lg text-left w-1/2"> Holland Dairy P.L.C</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Location:</h1>
				      			<p className="text-lg text-left w-1/2">Addis Ababa</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
				      			<p className="text-lg text-left w-1/2">Junior Level (1+ - 2 years experience)</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Dead Line</h1>
				      			<p className="text-lg text-left w-1/2">Nov 10, 2022</p>
				      		</li>
		      			</ul>

		      			 <Image src="/images/vercel.svg" width={100} height={100} alt="vercel" />
		      		</div>

		      		<p className="text-lg font-normal mb-5">
		      			Collect proformas from suppliers and price negotiation  Negotiate price while receiving 
		      			Priorate purchases Deliver products to storekeeper on time and in good quality Cross-check 
		      			prices from different suppliers  Proper checking of invoices for tin number and amount  
		      			Identify fake suppliers with the right ones  Perform purchases in honest and trustworthy
		      		</p>

		      		<Link href="/DisplayJobs">
		      			<a className="my-5 text-yellow-600 text-xl">
		      				view detail
		      			</a>
		      		</Link>

		      		<hr className="w-full bg-blue-900 mb-5" />
      			</div>

      			<div className="flex flex-col w-full bg-gray-200 mb-10 p-3 border rounded-lg">
      				<div className="flex justify-between items-center">
	      				<Link href="/DisplayJobs">
      						<a className="text-2xl text-blue-600 font-bold">Job Type: Purchasing Officer</a>
      					</Link>
	      				<p className="text-lg text-blue-500">Posted: Today</p>
      				</div>

	      			<div className="flex flex-col-reverse md:flex-row justify-between items-center">
		      			<ul className="mt-10">
				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Company Name:</h1>
				      			<p className="text-lg text-left w-1/2"> Holland Dairy P.L.C</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Location:</h1>
				      			<p className="text-lg text-left w-1/2">Addis Ababa</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Career Level:</h1>
				      			<p className="text-lg text-left w-1/2">Junior Level (1+ - 2 years experience)</p>
				      		</li>

				      		<li className="flex flex-row justify-between w-full mb-5">
				      			<h1 className="text-xl font-bold capitalize text-left w-1/2">Dead Line</h1>
				      			<p className="text-lg text-left w-1/2">Nov 10, 2022</p>
				      		</li>
		      			</ul>

		      			 <Image src="/images/vercel.svg" width={100} height={100} alt="vercel" />
		      		</div>

		      		<p className="text-lg font-normal mb-5">
		      			Collect proformas from suppliers and price negotiation  Negotiate price while receiving 
		      			Priorate purchases Deliver products to storekeeper on time and in good quality Cross-check 
		      			prices from different suppliers  Proper checking of invoices for tin number and amount  
		      			Identify fake suppliers with the right ones  Perform purchases in honest and trustworthy
		      		</p>

		      		<Link href="/DisplayJobs">
		      			<a className="my-5 text-yellow-600 text-xl">
		      				view detail
		      			</a>
		      		</Link>

		      		<hr className="w-full bg-blue-900 mb-5" />
      			</div>
      		</div>
      		<div className="flex flex-col w-full lg:w-1/4 h-[45rem] p-3 border rounded-lg bg-white dark:bg-slate-800">
      			<div className="flex justify-between items-center p-10 md:p-0">
			        <div className="flex items-center font-bold text-xl text-black dark:text-white capitalize">
			          <AiOutlineClockCircle size={20} />
			          <span className="ml-5">Latest Jobs</span>
			        </div>
			        <Link href="">
			          <a className="font-bold text-lg text-white p-4 bg-blue-700 capitalize border rounded-2xl">
			            view all jobs
			          </a>
			        </Link>
      			</div>

			      <div className="md:max-w-7xl md:mx-auto bg-gray-200 dark:bg-slate-800 w-full h-[40rem] border rounded-lg md:mt-10 shadow-2xl shadow-sky-200 flex flex-col overflow-y-scroll">
			        {Alllatestjobs.map((data, index) => (
			          <Link 
			          	href={{
            				pathname: '/DisplayJobs',
            				query:{job_id:data.job_id}
          				}}
			          	key={index}
			          >
			            <a className="flex justify-around items-center mb-5 even:bg-white even:dark:bg-slate-600 px-5 py-5 group">
			              <div className="flex flex-col w-3/4">
			                <h1 className="font-bold text-sm text-blue-500 group-hover:text-orange-500">
			                  {data.JobsType}
			                </h1>
			                <h1 className="font-light md:text-xs text-blue-500 group-hover:text-orange-500">
			                  {data.CompanyName}
			                </h1>
			              </div>
			              <div className="flex flex-col w-1/4">
			                <h1 className="font-light text-sm text-blue-500 text-right group-hover:text-orange-500">
			                  {moment(data.CreatedDate).utc().format('MMM DD YYYY')}
			                </h1>
			                <h1 className="font-light text-sm text-blue-500 text-right group-hover:text-orange-500">
			                  {data.Location}
			                </h1>
			              </div>
			            </a>
			          </Link>
			        ))}
			      </div>
      		</div>
     		</div>
    	</div>
    </section>
  );
}
