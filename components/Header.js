import Image from "next/image";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  SpeakerphoneIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";

function Header() {
  const { data: session } = useSession();

  return (
    <div className=" p-4 flex flex-row items-center sticky top-0 z-50 bg-white">
      {/* Logo*/}
      <div className="relative w-28 h-14 flex-shrink-0 cursor-pointer">
        <Image src="/Reddit-Logo.png" layout="fill" objectFit="contain" />
      </div>

      {/* Home Btn*/}
      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
      {/* SearchBar*/}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded px-3 py-1 bg-gray-100">
        <SearchIcon className="w-6 h-6 text-gray-400" />
        <input
          className="bg-transparent max-w-[250px] h-12 outline-none"
          placeholder="Search in Reddit "
        />
        <button type="submit" hidden />
      </form>
      {/* DEsktop Icons*/}
      <div className="hidden lg:inline-flex space-x-2 text-gray-500 items-center mx-5">
        <SparklesIcon className="icon" />
        <GlobeIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <SpeakerphoneIcon className="icon" />
      </div>

      {/*  MenuIcon   */}
      <div className="lg:hidden ml-5 flex items-center">
        <MenuIcon className="icon" />
      </div>
      {/*  Login/ LogOut Btn   */}

      <div
        onClick={() => signIn()}
        className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
      >
        <div className="relative h-5 w-5 flex-shrink-0">
          <Image
            src={"/Btn-Logo.png"}
            objectFit="contain"
            layout="fill"
            alt=""
          />
        </div>
        {session ? (
          <p className="text-gray-500">{session.user.name}</p>
        ) : (
          <p className="text-gray-500">Log In</p>
        )}
      </div>
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden cursor-pointer items-center space-x-2 border border-gray-100 p-2 lg:flex"
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src={"/Btn-Logo.png"}
              objectFit="contain"
              layout="fill"
              alt=""
            />
          </div>
          <p className="text-gray-500">Log Out</p>
        </div>
      ) : null}
    </div>
  );
}

export default Header;
