import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { AddNewsCategory } from "../../components/Admin/NewsCategory/AddNewsCategory";
import { DisplayNewsCategory } from "../../components/Admin/NewsCategory/DisplayNewsCategory";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/MainHeader';
export async function getServerSideProps(){
  const newscategories = await prisma.NewsCategory.findMany({
    orderBy: {
      category_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  })

  const AllNewscategories = newscategories.map((data)=>({
      category_id:data.category_id,
      CategoryName:data.CategoryName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  return{
    props:{
      categories:JSON.parse(JSON.stringify(AllNewscategories)),
    }
  }
}

export default function NewsCategory({categories}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      	<MainHeader title="News Category Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#ddd0c8] dark:bg-slate-700 pt-10">
    				<div className='w-full h-full flex flex-col lg:flex-row'>
    		      <VerticalNavbar data={data} />
    		      <div className="w-full">
            		<AddNewsCategory />
            		<DisplayNewsCategory categories={categories} />
            	</div>
    		    </div> 
  			  </section>
      	</React.Fragment>
        
    );
}
