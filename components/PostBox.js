import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";
import { PhotographIcon, LinkIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";

function PostBox() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [openImageBox, setOpenImageBox] = useState(false);


const onSubmit=handleSubmit(async(FormData)=>{
    console.log(FormData)
})

  return (
    <form  onSubmit={onSubmit} className=" sticky top-16 z-50 rounded bg-white border-gray-300 p-2 mt-6 ">
      <div className="flex items-center space-x-3">
        <Avatar />
        <input
          {...register("PostTitle", { required: true })}
          disabled={!session}
          className="flex-1 rounded-md bg-gray-100 p-2 pl-5 outline-none hover:placeholder:text-gray-500"
          type={"text"}
          placeholder={session ? "create a post" : "Sign In to post"}
        />
        <PhotographIcon
          onClick={() => setOpenImageBox(!openImageBox)}
          className={`h-6 text-gray-300 cursor-pointer hover:text-gray-500 ${
            openImageBox && "text-blue-400"
          }`}
        />
        <LinkIcon className="h-6 text-gray-300 cursor-pointer hover:text-gray-500 " />
      </div>

      {/* Open form*/}
      {!!watch("PostTitle") && (
        <div className="flex flex-col py-2">
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 min-h-[150px] p-2 outline-none"
              {...register("PostBody")}
              type="text"
              placeholder="Text(optional)"
            />
          </div>
          <div className="flex flex-col py-2">
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">SubReddit:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register("SubReddit")}
                type="text"
                placeholder="i.e FunnyMemes"
              />
            </div>
          </div>
          {openImageBox ? (
            <div className="flex flex-col py-2">
              <div className="flex items-center px-2">
                <p className="min-w-[90px]">İmageUrl:</p>
                <input
                  className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                  {...register("SubReddit")}
                  type="text"
                  placeholder="Optional"
                />
              </div>
            </div>
          ) : null}
          {/* Erors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.PostTitle?.type === "required" && (
                <div>A post title is required ! </div>
              )}
              {errors.Subredit?.type === "required" && (
                <div>A Subredit is required ! </div>
              )}
            </div>
          )}
        </div>
      )}
      {!!watch("PostTitle")&&(
        <button type="submit" className="w-full bg-blue-400 p-2 rounded text-white">
            Create Post
        </button>
      )}
    </form>
  );
}

export default PostBox;
