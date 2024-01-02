import Loader from "@/components/shared/Loader";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesandMutations"
import { multiFormatDateString } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PostStats from "@/components/shared/Poststats";
const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');
  const { user } = useUserContext();
  const handleDeletePost = () => { }
  return (
    <div className="post_details-container">
      {isPending ? <Loader /> : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl}
            alt="post"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">

              <Link to={`/profile/${post?.creator.$id}`} className="flex-between w-full">
                <img
                  src={
                    post?.creator?.imageUrl ||
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 rounded-full h-8  lg:w-12 lg:h-12"
                />


                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="gap-2 flex-center text-light-3">
                    <p className="subtle-semibold lg:small-regular ">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    •
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center "
              > <Link to={`/update-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                  <img src="/assets/icons/edit.svg" width={24} height={24} alt="edit" />
                </Link>
                <Button
                  onClick={handleDeletePost}
                  variant="ghost"
                  className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img
                    src="/assets/icons/delete.svg"
                    alt="delete"
                    width={24}
                    height={24}
                  />
                </Button>

              </div>
            </div>
            <hr className="border w-full border-dark-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular ">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string, index: string) => (
                  <li key={`${tag}${index}`} className="text-light-3 small-regular">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default PostDetails
