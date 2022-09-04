import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";
import { PhotographIcon, LinkIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDİT } from "../graphql/mutations";
import client from "../apollo-client";
import { GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import toast from "react-hot-toast";
function PostBox() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [addPost] = useMutation(ADD_POST);
  const [addSubreddit]=useMutation(ADD_SUBREDDİT);

  const [openImageBox, setOpenImageBox] = useState(false);

  const onSubmit = handleSubmit(async (FormData) => {
    console.log(FormData);
    //Subredit daha önce var mı kontrol etmeliyiz varsa oluşturma yoksa oluştur.
    try {
      const { data } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: FormData.SubReddit,
        },
      });

      const { getSubredditListByTopic } = data;
      const subredditcreated=getSubredditListByTopic.length>0;
      console.log(getSubredditListByTopic)
      console.log(subredditcreated)
      if(subredditcreated){
        //insert exist subredit.
        const notification=toast.loading(`${FormData.SubReddit} is already exist`)
        const image=FormData.İmageUrl || "";
        const x=await addPost({
          variables:{
            body: FormData.PostBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id, //Burada o an eklenen son subredit'in id adresini tanımladık.
            title: FormData.PostTitle,
            username: session.user.name
          }
        })
        toast.success(`Konunuz ${FormData.SubReddit} altına eklendi.`,{id:notification})
      }
      else{
        //create new subredit.
        const notification=toast.loading(`${FormData.SubReddit} isminde bir subreddit bulunamadı.`)
        toast.loading(`${FormData.SubReddit} Yeni bir subreddit oluşturuluyor`,{id:notification})
        const {data}=await addSubreddit({
          variables:{
            topic:FormData.SubReddit
          }
        })
        //Ekledikten sonra bu eklenen değeri bizim bir şekilde  hafızamızda tutmamız lazım.
        //Bu sayede konuyu ona entegre edebilelim.

        const image=FormData.İmageUrl || "";
        const id=data.insertSubreddit.id
        console.log(id)
        const x=await addPost({
          variables:{
            body: FormData.PostBody,
            image: image,
            subreddit_id: id, //Burada o an eklenen son subredit'in id adresini tanımladık.
            title: FormData.PostTitle,
            username: session.user.name
          }
        })
        toast.success(`${FormData.PostTitle} başarıyla post edildi.`,{id:notification})
      }
    } 
    
    
    catch (error) {
      toast.error(`Bir şeyler yanlış gitti .`,{id:notification})
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className=" sticky top-16 z-50 rounded bg-white border-gray-300 p-2 mt-6 "
    >
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
                  {...register("İmageUrl")}
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
      {!!watch("PostTitle") && (
        <button
          type="submit"
          className="w-full bg-blue-400 p-2 rounded text-white"
        >
          Create Post
        </button>
      )}
    </form>
  );
}

export default PostBox;
