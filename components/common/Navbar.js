import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from "next/router";
import { useTheme } from 'next-themes';
import ThemeToggler from './ThemeToggler';
import {signIn} from 'next-auth/react'

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [NavabarText,setNavabarText] = useState("")
  const router = useRouter();
  const handleNav = () => {
    setNav(!nav)
  };

  const NavbarTopic = [
    { path: "/", name: "Home" },
    { path: "/Jobs", name: "Jobs" },
    { path: "/News", name: "News"},
    { path: "/Entertemiment", name: "Entertemiment" },
    { path: "/Course", name: "Courses" },
    { path: "/About", name: "About" },
    { path: "/Blogs", name: "Blogs" },
  ];

  const [colorChange, setColorchange] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 60) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavbarColor);
  }, []);

  return (
    <nav
      className={ router.pathname == "/auth/signin" || router.pathname == "/ResetPassword" || router.pathname == '/Forgotpassword' ? "hidden" : `${
        colorChange ? 'bg-[#e6e6e6] bg-opacity-80 dark:bg-opacity-80 dark:bg-[#02201D] border-b-2 border-slate-700' : `${open ? 'bg-[#e6e6e6] bg-opacity-100 dark:bg-[#02201D]' : 'bg-transparent'}`
      } w-full   lg:h-[80px] top-0 fixed z-50`}
    >
      <div className="lg:justify-between justify-around lg:px-4 mx-0 lg:mx-10 items-center lg:flex lg:py-[10px] ">
        <div className="flex items-center justify-between py-3 ">
          <Link href="/">
            <Image
              src="/images/logo6.png"
              width={170} height={60}
              alt="Navbar"
            />
          </Link>
          <div className="lg:hidden ">
            <button
              className="p-2 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setOpen(!open)}
            >
              {open === true ? (
                <AiOutlineClose className="text-black dark:text-white" size={30} />
              ) : (
                <AiOutlineMenu className="text-black dark:text-white" size={30} />
              )}
            </button>
          </div>
        </div>

        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 lg:block lg:pb-0 lg:mt-0 mx-10 ${
              open ? 'flex' : 'hidden'
            }`}
          >
            <ul className={`${
              colorChange ? 'text-[#000] dark:text-white' : 'text-black dark:text-white lg:dark:text-white' } 
              items-center justify-center space-y-8 lg:flex lg:space-x-8 lg:space-y-0 `}
            >
              {NavbarTopic.map((link) => (
                <li
                  key={link.name}
                  className="md:ml-6 text-lg font-medium md:my-0 my-7"
                >
                  <Link href={link.path}>
                    <a
                      onClick={(e) => setNavabarText(link.text)}
                      className={
                        
                        router.pathname == link.path || ( router.pathname == "/DisplayJobs" && "/Jobs" == link.path ) || ( router.pathname == "/Jobs/Display" && "/Jobs" == link.path ) ||
                        ( router.pathname == "/Jobs/Category" && "/Jobs" == link.path ) || ( router.pathname == "/Jobs/Location" && "/Jobs" == link.path ) ||
                        ( router.pathname == "/AdvanceSearch" && "/Jobs" == link.path ) || ( router.pathname == "/AiSearch" && "/AiSearch" == link.path )  ||
                        ( router.pathname == "/Course/Html" && "/Course" == link.path ) || ( router.pathname == "/Course/Css" && "/Course" == link.path ) ||
                        ( router.pathname == "/Course/javascript" && "/Course" == link.path ) || ( router.pathname == "/Course/python" && "/Course" == link.path ) ||
                        ( router.pathname == "/Advice" && "/Advices" == link.path ) || ( router.pathname == "/DisplayNews" && "/News" == link.path ) ||
                        ( router.pathname == "/EntertemimentByCategory" && "/Entertemiment" == link.path ) || ( router.pathname == "/DisplayEntertemiment" && "/Entertemiment" == link.path ) ||
                        ( router.pathname == "/Search" && "/Entertemiment" == link.path ) || ( router.pathname == "/DisplayBlogs" && "/Blogs" == link.path )|| 
                        ( router.pathname == "/Entertemiment/Display" && "/Entertemiment" == link.path )
                          ? "border-b-4 border-[#009688] text-[#009688] dark:border-white md:ml-2 lg:ml-3 text-md lg:text-lg font-extrabold"
                          : "md:ml-2 lg:ml-3 text-md lg:text-lg font-extrabold hover:border-b-4 border-[#009688] dark:border-[#009688]"
                      }
                    >
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}

              <div className="flex ">
                <ThemeToggler />
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
