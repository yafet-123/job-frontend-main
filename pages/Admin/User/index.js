import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddUser } from "../../../components/Admin/User/AddUser";
import {DisplayUser} from "../../../components/Admin/User/DisplayUser";
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
  const users = await prisma.User.findMany({orderBy : {ModifiedDate:'desc'}});
  const Allusers = users.map((data)=>({
      user_id:data.user_id,
      email:data.email,
      firstName:data.firstName,
      lastName:data.lastName,
      age:data.age,
      role:data.role,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      UserName:data.UserName
  }))

  return{
    props:{
      users:JSON.parse(JSON.stringify(Allusers)),
    }
  }
}

export default function User({users}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="User Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddUser />
            			<DisplayUser users={users} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
