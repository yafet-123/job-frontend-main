import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../util/db.server.js'
import { AddCourse } from "../../components/Admin/jsCourses/AddCourse";
import { DisplayCourse} from "../../components/Admin/jsCourses/DisplayCourse";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../components/MainHeader';

export async function getServerSideProps(){
  const courses = await prisma.CSSCourse.findMany({
    orderBy: {
      course_id:"asc"
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      }
    }
  })

  const Allcourses = courses.map((data)=>({
      course_id:data.course_id,
      title:data.title,
      content:data.content,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      userName:data.User.UserName
  }))

  return{
    props:{
      courses:JSON.parse(JSON.stringify(Allcourses)),
    }
  }
}

export default function JavascriptCourses({courses}) {
    const { status, data } = useSession();
    return (
      <React.Fragment>
        <MainHeader title="JavaScript Courses Dashboard" />
          <section className="flex flex-col w-full h-full bg-[#ddd0c8] dark:bg-slate-700 pt-10">
            <div className='w-full h-full flex flex-row'>
              <VerticalNavbar data={data} />
              <div className="w-full">
                <AddCourse />
                <DisplayCourse courses={courses} />
              </div>
            </div> 
          </section>
        </React.Fragment>
        
    );
}
