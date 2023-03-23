import React , { useState } from "react";
import Link from "next/link";
import moment from 'moment';
import { useRouter } from "next/router";
import { AiOutlineClose } from 'react-icons/ai'
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
  LineShareButton,
  LineIcon,
} from 'next-share';


export function Share({shareUrl,id,setviewModalOn,quote}) {
  const [deletemodalOn, setdeleteModalOn] = useState(false);

  const handleCancelClickForview = () => {
    setviewModalOn(false)
  }

  const clickedFordelete = () => {
    setdeleteModalOn(true)
  }
  return (
    <div className="bg-neutral-100 bg-opacity-80 dark:bg-slate-800 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white dark:bg-slate-500 py-5 px-5 lg:px-10 border-4 border-sky-500 rounded-xl overflow-y-scroll">
          <div className="flex items-center justify-between mb-3 lg:mb-10">
            <h1 className="text-[#009688] font-bold text-lg lg:text-2xl">Share</h1>
            <button
                onClick={() => {
                  handleCancelClickForview()
                }} 
                className="text-[#009688] hover:text-white hover:bg-[#009688] font-bold py-2 px-4 hover:scale-110 duration-1000 ease-in-out rounded ">
                <AiOutlineClose size={32} />
              </button>
          </div>
          <div className="flex flex-row lg:flex-col">
            <div className="flex flex-col lg:flex-row justify-between w-full mb-5">
              <div className="m-3">
                <FacebookShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  quote={quote}
                  hashtag={'#huluMedia'}
                >
                  <span className="text-sm lg:text-xl font-bold text-[#009688] pb-5">
                    Facebook
                  </span>
                  <FacebookIcon className="block m-auto mt-5" size={40} round />
                </FacebookShareButton>
              </div>

              <div className="m-3">
                <TelegramShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  quote={quote}
                  hashtag={'#huluMedia'}
                  className="flex flex-col items-center justify-between"
                >
                  <span className="text-sm lg:text-xl font-bold text-[#009688]">
                    Telegram
                  </span>
                  <TelegramIcon className="block m-auto mt-5" size={40} round />
                </TelegramShareButton>
              </div>

              <div className="m-3">
                <TwitterShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  quote={quote}
                  hashtag={'#huluMedia'}
                  className="flex flex-col items-center justify-between"
                >
                  <span className="text-sm lg:text-xl font-bold text-[#009688]">
                    Twitter
                  </span>
                  <TwitterIcon className="block m-auto mt-5" size={40} round />
                </TwitterShareButton>
              </div>

              <div className="m-3">
                <EmailShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  quote={quote}
                  hashtag={'#huluMedia'}
                  className="flex flex-col items-center justify-between"
                >
                  <span className="text-sm lg:text-xl font-bold text-[#009688]">
                    Email
                  </span>
                  <EmailIcon className="block m-auto mt-5" size={40} round />
                </EmailShareButton>
              </div>

              <div className="m-3">
                <ViberShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  quote={quote}
                  hashtag={'#huluMedia'}
                  className="flex flex-col items-center justify-between"
                >
                  <span className="text-sm text-center lg:text-xl font-bold text-[#009688]">
                    Viber
                  </span>
                  <ViberIcon className="block m-auto mt-5"  size={40} round />
                </ViberShareButton>
              </div>    
            </div>

            <div className="flex flex-col lg:flex-row justify-between w-full ">
              
              <div className="m-3">
                <WhatsappShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  quote={quote}
                  hashtag={'#huluMedia'}
                  className="flex flex-col items-center justify-between"
                >
                  <span className="text-sm lg:text-xl font-bold text-[#009688] pb-5">
                    Whatsapp
                  </span>
                  <WhatsappIcon className="block m-auto mt-5" size={40} round />
                </WhatsappShareButton>
              </div>

              <div className="m-3">
                <LinkedinShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  quote={quote}
                  hashtag={'#huluMedia'}
                >
                  <span className="text-sm lg:text-xl font-bold text-[#009688] pb-5">
                    Linkedin
                  </span>
                  <LinkedinIcon className="block m-auto mt-5" size={40} round />
                </LinkedinShareButton>
              </div>

              <div className="m-3">
                <FacebookMessengerShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  quote={quote}
                  hashtag={'#huluMedia'}
                >
                  <span className="text-sm lg:text-xl font-bold text-[#009688] pb-5">
                    Facebook Messenger
                  </span>
                  <FacebookMessengerIcon className="block m-auto mt-5" size={40} round />
                </FacebookMessengerShareButton>
              </div>

               <div className="m-3">
                <PinterestShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  quote={quote}
                  hashtag={'#huluMedia'}
                >
                  <span className="text-sm lg:text-xl font-bold text-[#009688] pb-5">
                    Pinterest
                  </span>
                  <PinterestIcon className="block m-auto mt-5" size={40} round />
                </PinterestShareButton>
              </div>

              <div className="m-3">
                <RedditShareButton
                  url={`https://job-frontend-main.vercel.app${shareUrl}#${id}`}
                  quote={quote}
                  hashtag={'#huluMedia'}
                >
                  <span className="text-sm lg:text-xl font-bold text-[#009688] pb-5">
                    Reddit
                  </span>
                  <RedditIcon className="block m-auto mt-5" size={40} round />
                </RedditShareButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
