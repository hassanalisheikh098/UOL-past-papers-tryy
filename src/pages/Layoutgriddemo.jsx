"use client"
import { useHref } from "react-router-dom"
import { LayoutGrid } from "../components/Layoutgrid"
import { useCounter } from "../useCounter"
import me from "../assets/me.png";
import mee from "../assets/mee.png";
import { supabase } from "../lib/supabase.js";
import { useState, useEffect } from "react";

export default function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full px-4 md:px-8">
      <LayoutGrid cards={cards} />
    </div>
  )
}

async function getUserCount() {
  const { count, error } = await supabase
  .from('appusers')  // Replace 'users' with your table name
  .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching user count:', error);
    return 0; // Return 0 or handle the error as needed
  } else {
    console.log('Total users:', count);
    return count; // Return the count value
  }
}

const SkeletonOne = () => {
  const paperCount = useCounter(62);
  const deptCount = useCounter(1);
  const tempuser = useCounter(234);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const userCount = await getUserCount();
      setUsers(userCount);
    };
    fetchUserCount();
  }, []);

  const count = useCounter(users);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="grid grid-cols-3 gap-4 w-full">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
           {tempuser}
          </h1>
          <p className="text-neutral-200 text-sm md:text-base mt-4">Active Users</p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            {paperCount}
          </h1>
          <p className="text-neutral-200 text-sm md:text-base mt-4">Papers</p>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            {deptCount}
          </h1>
          <p className="text-neutral-200 text-sm md:text-base mt-4">Departments</p>
        </div>
      </div>
    </div>
  )
}

// Create a separate hover component for SkeletonOne
const SkeletonOneHover = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        Website Analytics
      </h1>
    </div>
  )
}

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-400 bg-opacity-50">Meet the Founder</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
      Hassan, a 5th-semester BSCS student at UOL. Fueled by a passion for technology and a drive to create impact, he's on a mission to turn ideas into reality. Hassan believes in making a difference—one line of code at a time.
      </p>
    </div>
  )
}

const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">Let's Connect</p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Head down to the end of this landing page to find my socials :)
      </p>
    </div>
  )
}

const SkeletonFour = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 glowing-text">
        Hover to Know About Us
      </h1>
    </div>
  )
}

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    hoverContent: <SkeletonOneHover />,
    className: "md:col-span-2 md:row-span-1 bg-black/40",
    thumbnail: null,
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: me
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: mee
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2 md:row-span-1",
    hoverContent: (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
        Driven by the vision of making exam preparation seamless, Hassan built this platform to empower students with quick access to past papers, ensuring no one has to waste time searching ever again.
        </h1>
      </div>
    ),
    thumbnail: null, // No thumbnail since we're using text
  }
]

