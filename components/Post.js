import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  ChatAltIcon,
  DotsHorizontalIcon,
  GiftIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import Avatar from "./Avatar";

import TimeAgo from "react-timeago";
import Tr from "react-timeago/lib/language-strings/tr";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import Image from "next/image";

export default function Post({ id, post }) {
  const build = buildFormatter(Tr);

  return (
    <div className="flex cursor-pointer border border-gray-300 bg-white shadow-sm hover:border hover:border-gray-600  ">
      {/* Votes */}
      <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-50 p-4 text-gray-400">
        <ArrowUpIcon className="voteButtons hover:text-red-400" />
        <p className="text-xs text-black font-bold">0</p>
        <ArrowDownIcon className="voteButtons hover:text-blue-400" />
      </div>
      <div className="p-3 pb-1">
        {/* Header*/}
        <div className="flex items-center space-x-2">
          {/* Normal şartlarda session üzerinden almamız lazım ama şimdilik seed ile random üretelim */}
          <Avatar seed={post.subreddit_id} />
          <p className="text-xs text-gray-400">
            <span className="font-bold text-black hover:text-blue-400 hover:underline">
              r/{post.subreddit?.topic}
            </span>{" "}
            {post.username} Tarafından yollandı{" "}
            <TimeAgo date={post.created_at} />
          </p>
        </div>
        {/*  Body*/}
        <div className="py-4">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-sm font-light">{post.body}</p>
        </div>
        {/* İmage*/}

        <img src="https://preview.redd.it/i68jp8z8upl91.jpg?width=640&crop=smart&auto=webp&s=1d08923abd11fa2886101b49cd9388b9879da03b" />
        {/* Footer*/}
        <div className="flex space-x-4 text-gray-400">
          <div className="postBtn">
            <ChatAltIcon className="h-6 w-6" />
            <p className="hidden sm:inline">{post.commentsList.length} Yorum</p>
          </div>
          <div className="postBtn">
            <GiftIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Ödül</p>
          </div>
          <div className="postBtn">
            <ShareIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Paylşar</p>
          </div>
          <div className="postBtn">
            <BookmarkIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Kaydet</p>
          </div>
          <div className="postBtn">
            <DotsHorizontalIcon className="h-6 w-6" />
              <p className="hidden sm:inline">Daha Fazla</p>
          </div>
        </div>
      </div>
    </div>
  );
}
