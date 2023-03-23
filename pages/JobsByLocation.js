import React from "react";
import Link from "next/link";
import { JobRequirement } from "../data/JobRequirement";
import { AiOutlineMenu } from "react-icons/ai";
import Image from 'next/image'
import { AiOutlineClockCircle } from "react-icons/ai";
import { useRouter } from 'next/router'
import axios from 'axios';
import { prisma } from '../util/db.server.js'
import moment from 'moment';
import { MainHeader } from '../components/MainHeader';
import { GroupLatestJobs } from '../components/jobs/GroupLatestJobs'
import { CompanyJobs } from '../components/jobs/CompanyJobs'
import { Location } from '../components/jobs/Location'

export async function getServerSideProps(context){
	const {params,req,res,query} = context
  const location_id = query.location_id

  const locations = await prisma.Location.findMany({
  	include:{
       _count:{
        select:{
          Job:true
        }
      },
    }
  })
  const jobsByLocation = await prisma.Job.findMany({
  	where:{
  		location_id: Number(location_id)
  	},
    orderBy: {
      job_id:"asc"
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      Location:{
        select:{
          LocationName:true
        }
      }
    } 
  });

  const latestjobs = await prisma.Job.findMany({
    take:-5,
    orderBy: {
      ModifiedDate:"asc"
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

  const Alljobs = jobsByLocation.map((data)=>({
    job_id:data.job_id,
    CompanyName:data.CompanyName,
    image:data.Image,
    JobsType:data.JobsType,
    Location:data.Location.LocationName,
    CareerLevel:data.CareerLevel,
    EmploymentType:data.EmploymentType,
    Salary:data.Salary,
    JobsDescreption:data.JobsDescreption,
    JobsRequirement:data.JobsRequirement,
    DeadLine:data.DeadLine,
    Apply:data.Apply,
    location_id:data.location_id,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate
  }))
  
  const reversejob = Alljobs.reverse();

  const reversejoblatest = Alllatestjobs.reverse();

  return{
    props:{
    	Alllatestjobs:JSON.parse(JSON.stringify(reversejoblatest)),
    	jobsbylocation:JSON.parse(JSON.stringify(reversejob)),
      locations:JSON.parse(JSON.stringify(locations)),
    }
  }
}

export default function JobsByLocation({locations, jobsbylocation, Alllatestjobs}) {
	const router = useRouter();
  const { location, howmany, image } = router.query
  const shareUrl = router.asPath
  return (
  	<React.Fragment>
      <MainHeader title="Hulu Media : Jobs By Location" />
	    <section className="bg-[#e6e6e6] dark:bg-[#02201D] flex flex-col w-full h-full px-0 md:px-24 py-44">
	    	<div className="flex flex-col bg-neutral-100 dark:bg-[#1B2637] w-full h-full lg:px-5 py-10 border rounded-xl dark:border-slate-800">
	    		<div className="flex flex-col lg:flex-row justify-between items-center mb-10 bg-neutral-200 dark:bg-slate-700 px-10">
	    			<div className="flex flex-col items-center lg:flex-row mb-5 mt-10">
	    				<Image src={image} width={100} height={100} alt="image" className="rounded-2xl" />
		    			<h1 className="lg:ml-5 text-[#009688] text-xl md:text-3xl lg:text-5xl capitalize font-bold mt-10 lg:mt-0 text-center lg:text-left">Jobs in {location}</h1>
	    			</div>
	    			<div className="flex flex-col items-center lg:flex-row mb-10 mt-10">
	    				<div className="flex flex-col lg:mr-5 mb-10 lg:mb-0">
	    					<p className="text-lg lg:text-3xl text-black dark:text-white font-bold capitalize mb-5 lg:mb-0 text-center lg:text-left">Population of {location}</p>
	    					<p className="text-md lg:text-2xl text-black dark:text-white font-bold capitalize text-center">2,739,551 </p>
	    				</div>

	    				<div className="flex flex-col items-center justify-center lg:ml-5 border rounded-xl bg-[#009688] text-white p-2 lg:p-5">
	    					<p className="text-lg lg:text-3xl font-bold capitalize">Jobs</p>
	    					<p className="text-md lg:text-xl font-bold capitalize">{howmany}</p>
	    				</div>
	    			</div>
	    		</div>	
	      	<div className="flex flex-col md:flex-row w-full">
	      		<div className="flex flex-col-reverse lg:flex-row w-full">
		      		<div className="flex flex-col w-full lg:w-1/4 h-[20rem] lg:h-[50rem] p-3 bg-neutral-200 dark:bg-slate-700 sticky top-32">
		      				<h1 className="text-lg md:text-xl lg:text-2xl text-black dark:text-white font-bold capitalize text-center mb-10">Jobs in ethopia</h1>
		      				<Location locations={locations} />
		      		</div>
		      		<div className="flex flex-col w-full lg:w-3/4 p-3 lg:border-l-2 px-3 lg:px-10">
		      			{ jobsbylocation == "" ? 
		      				<h1 className="text-black dark:text-white text-lg lg:text-xl font-bold text-center italic">
		      					There is No job posted in {location}
		      				</h1>
		      			:
			      			<CompanyJobs jobs={jobsbylocation} shareUrl={shareUrl} />
		      			}
		      		</div>
		      	</div>

	      		<GroupLatestJobs Alllatestjobs={Alllatestjobs} />
	     		</div>
	    	</div>
	    </section>
	  </React.Fragment>
  );
}
