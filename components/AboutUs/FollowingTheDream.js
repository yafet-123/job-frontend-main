import React from 'react'
import Image from 'next/future/image';
import Mission from '../../public/images/aboutBackground.jpg';

export const FollowingTheDream = () => {
  const FollowingTheDreamData = [
    {
    id: 1,
    numbers: 200,
    title: 'Happy Travelers',
  },
  {
    id: 2,
    numbers: 20,
    title: 'Destinations',
  },
  {
    id: 3,
    numbers: 5,
    title: 'Team Members',
  },
  ];
  return (
    <React.Fragment>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-8 md:my-32 my-16 md:px-16 px-4">
        <div className="flex flex-col justify-around gap-4">
          <div>
            <Image
              src={Mission}
              alt="sustainablity background"
              //   fill
              priority
              width={500}
              height={200}
              className="md:w-full rounded-lg shadow-md shadow-slate-800"
            />
          </div>
        </div>
        <div className="flex flex-col text-left justify-center gap-4 bg-white text-[#165248]">
          <h1 className="md:text-5xl font-bold text-3xl">
            We are Eco-Travel Ethiopia
          </h1>
          <p className="md:text-2xl font-semibold text-md text-lg">
            We organize the best Ethiopian premium tours covering historical
            routes, mountain trekking and adventure expeditions to remote areas,
            bird and wildlife watching, as well as family-friendly tours.
          </p>
          {/* <div className="justify-self-end">
          <Image
            src="https://jonesbrotherscoffee.com/en/img/asset/bWFpbi9ibG9nL2ltYWdlLWFzc2V0LmpwZw==?w=1200&s=f14631dd1dec01f2a90d6ce25bf50438"
            alt="sustainablity background"
            //   fill
            priority
            width={500}
            height={400}
            className="md:w-full md:h-full rounded-lg shadow-md shadow-slate-800"
          />
        </div> */}
        </div>
      </div>

      <div className="flex flex-col gap-8 text-justify ">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center justify-start md:mt-32 gap-4 md:p-20 p-2 text-white text-left bg-[#165248]">
          <div className="order-last md:order-first md:-mt-40 mt-0">
            <Image
              src={Mission}
              alt="sustainablity background"
              //   fill
              priority
              width={500}
              height={400}
              className="md:h-full md:w-auto rounded-sm shadow-md shadow-slate-800"
            />
          </div>

          <div className="flex gap-8 flex-col">
            <h1 className="md:text-5xl font-bold text-4xl mt-6">OUR VISION</h1>
            <p className="md:text-2xl md:font-semibold text-md text-lg">
              We are proud to offer excellent quality and value for money in our
              tours, which give you the chance to experience your chosen
              destination in an authentic and exciting way.
            </p>
          </div>
        </div>
        <div className="my-16 grid md:grid-cols-2 grid-cols-1 items-center  justify-center md:p-20 md:mt-12 md:mb-32 gap-4 p-2 text-[#165248] text-left">
          <div className="order-first md:order-last md:-mb-40">
            <Image
              src={Mission}
              alt="sustainablity background"
              //   fill
              priority
              width={500}
              height={400}
              className="md:h-full md:w-auto rounded-sm shadow-md shadow-slate-800"
            />
          </div>

          <div className="flex gap-8 flex-col">
            <h1 className="md:text-5xl font-bold text-4xl mt-6">OUR MISSION</h1>
            <p className="md:text-2xl md:font-semibold text-md text-lg">
              Our mission is to provide the ultimate travel planning experience
              while becoming a one-stop shop for every travel service available
              in the industry.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-around items-center bg-[#165248] my-16">
        <h1 className="md:text-5xl font-bold text-4xl text-center text-white mt-6">
          Following the Dream
        </h1>
        <div className="flex md:flex-row flex-col justify-between gap-8 m-8">
          {FollowingTheDreamData.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center bg-white gap-4 p-10 hover:shadow-2xl rounded-xl shadow-lg shadow-slate-800"
              >
                <h1 className="md:text-6xl font-bold text-5xl text-[#165248]">
                  {item.numbers}+
                </h1>
                <h1 className="md:text-3xl font-bold text-2xl text-[#165248]">
                  {item.title}
                </h1>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 text-[#165248] my-16">
        <h1 className="md:text-5xl font-bold text-4xl text-center m-6">
          What Makes Us Different?
        </h1>
        <ul className="text-justify md:px-16 ">
          <li className="md:text-2xl font-semibold text-lg">
            ● We offer every traveller a lifetime loyalty programme to ensure
            that they continue to travel sustainably.
          </li>
          <li className="md:text-2xl font-semibold  text-lg my-2">
            ● We have the experience, skills, and resources to make sure that
            your journey runs smoothly and environmentally friendly.
          </li>
          <li className="md:text-2xl font-semibold  text-lg my-2">
            ● We’ve embraced technology within our fleet and office,
            transforming our processes to ensure that we can monitor all our
            vehicles and journeys in close detail.
          </li>
          <li className="md:text-2xl font-semibold  text-lg my-2">
            ● We ensure that all travel is done with purpose and to create
            positive impact to every community and ecosystem that we visit.
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
