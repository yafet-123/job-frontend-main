import React, {useState,useEffect} from "react";
import Link from "next/link";
import Image from 'next/image'
import { useRouter } from 'next/router'
import db from '../../../db.js'
import { CourseHead } from '../../../components/Course/CourseHead'
import { MobileViewCourse } from '../../../components/Course/MobileViewCourse';
import { Main } from '../../../components/Course/Main'
import { MainHeader } from '../../../components/common/MainHeader';

export async function getServerSideProps(context) {
  const { query } = context;
  const course_id = query.id;

  const coursesQuery = `
    SELECT jc.course_id, jc.title, jc."ModifiedDate", u."UserName"
    FROM "CSSCourse" jc
    INNER JOIN "User" u ON jc.user_id = u.user_id
    ORDER BY jc.course_id ASC
  `;

  const individualCoursesQuery = `
    SELECT jc.course_id, jc.title, jc."ModifiedDate", u."UserName"
    FROM "CSSCourse" jc
    INNER JOIN "User" u ON jc.user_id = u.user_id
    WHERE jc.course_id = $1
  `;

  try {
    const coursesResult = await db.query(coursesQuery);
    const courses = coursesResult;

    // Fetch individual courses
    const individualCoursesResult = await db.query(individualCoursesQuery, [Number(course_id)]);
    const individualCourses = individualCoursesResult;

    // Process the data to match the required format
    const allCourses = courses.map((data) => ({
      course_id: data.course_id,
      title: data.title,
      ModifiedDate: data.ModifiedDate,
      UserName: data.UserName, // Adding UserName directly as part of the result
    }));

    return {
      props: {
        courses: JSON.parse(JSON.stringify(allCourses)),
        individualCourses: JSON.parse(JSON.stringify(individualCourses)),
      },
    };
  } catch (err) {
    console.error('Database Query Error:', err);
    return {
      props: {
        courses: [],
        individualCourses: [],
      },
    };
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
