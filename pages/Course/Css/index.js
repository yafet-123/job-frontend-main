import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import { prisma } from '../../../util/db.server.js'
import { CourseHead } from '../../../components/Course/CourseHead'
import { MobileViewCourse } from '../../../components/Course/MobileViewCourse';
import { Main } from '../../../components/Course/Main'
import { MainHeader } from '../../../components/common/MainHeader';

export async function getServerSideProps(context){
  const {params,req,res,query} = context
  const course_id = query.id

  const courses = await prisma.CSSCourse.findMany({
    orderBy: {
      course_id:"asc"
    },

    include:{
      User:{
          select:{
              UserName:true
          }
      },
    }
  })

  const indvidualCourses = await prisma.CSSCourse.findMany({
    where:{
      course_id: Number(course_id),
    },
    include:{
      User:{
          select:{
              UserName:true
          }
      },
    }
  })

  const Allcourses = courses.map((data)=>({
      course_id:data.course_id,
      title:data.title,
      ModifiedDate:data.ModifiedDate,
      categories:data.CourseCategoryRelationship,
  }))

  return{
    props:{
      courses:JSON.parse(JSON.stringify(Allcourses)),
      indvidualCourses:JSON.parse(JSON.stringify(indvidualCourses)),
    }
  }
}

export default function Css({courses, indvidualCourses}) {
	const router = useRouter();
  const { CategoryName } = router.query
  const [chapter, setchapter] = useState(false);
  const handleChapter = () => {
    setchapter(!chapter);
  };

  const [course, setcourse] = useState(false);
  const handleCourse = () => {
    setcourse(!course);
  };

  return (
    <React.Fragment>
      <MainHeader title="HTML Course" />
      <section className="flex flex-col w-full h-full pt-24 py-5 bg-[#e6e6e6] dark:bg-[#02201D]">
        <CourseHead handleChapter={handleChapter} handleCourse={handleCourse}/>
      	<Main CategoryName={CategoryName} handleCourse={handleCourse} courses={courses} handleChapter={handleChapter} indvidualCourses={indvidualCourses}/>
        <MobileViewCourse CategoryName={CategoryName} courses={courses} handleChapter={handleChapter} chapter={chapter} />
      </section>
    </React.Fragment>
  );
}
