import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddLocation } from "../../../components/Admin/Location/AddLocation";
import {DisplayLocation} from "../../../components/Admin/Location/DisplayLocation";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { getSession } from "next-auth/react";

export async function getServerSideProps(context){
  const session = await getSession(context);
  const userRole = await session?.user?.role
  if (userRole !== 'admin') {
    return {
      redirect: {
        destination: '/auth/error', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }
  const locations = await prisma.Location.findMany({
    orderBy: {
      location_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  });

  const Alllocations = locations.map((data)=>({
      location_id:data.location_id,
      LocationName:data.LocationName,
      Image:data.Image,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  return{
    props:{
      locations:JSON.parse(JSON.stringify(Alllocations)),
    }
  }
}

export default function Location({locations}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="Location Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    				<div className='w-full h-full flex flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddLocation />
            		<DisplayLocation locations={locations} />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
