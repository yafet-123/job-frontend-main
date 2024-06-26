import React from "react";
import { useState,useEffect, useContext} from 'react'
import { AddNews } from "../../../components/Admin/News/AddNews";
import { DisplayNews } from "../../../components/Admin/News/DisplayNews";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
import { prisma } from '../../../util/db.server.js'

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
  const news = await prisma.News.findMany({
    orderBy : {
      ModifiedDate:'desc'
    },
    include:{
      User:{
        select:{
          UserName:true
        }
      },
      NewsCategoryRelationship:{
        include:{
          NewsCategory:{
            select:{
              category_id:true,
              CategoryName:true
            }
          }
        }
      },
    }
  });

  const allnews = news.map((data)=>({
    news_id:data.news_id,
    Header:data.Header,
    image:data.Image,
    ShortDescription:data.ShortDescription,
    Description : data.Description,
    userName:data.User.UserName,
    CreatedDate:data.CreatedDate,
    ModifiedDate:data.ModifiedDate,
    Category:data.NewsCategoryRelationship
  }))

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
      news:JSON.parse(JSON.stringify(allnews)),
    }
  }
}

export default function News({categories, news}) {
    const { status, data } = useSession();
    return (
    	
        <React.Fragment>
          <MainHeader title="News Dashboard" />
        	<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
    		    <div className='w-full h-full flex flex-row'>
    		        <VerticalNavbar data={data} />
    		        <div className="w-full">
            		    <AddNews categories={categories} />
                    <DisplayNews news={news} categories={categories} />
            	    </div>
    		    </div> 
  			</section>
      	</React.Fragment>
        
    );
}
