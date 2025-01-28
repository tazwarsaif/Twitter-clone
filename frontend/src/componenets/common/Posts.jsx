import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../skeletons/PostSkeleton";
import Post from "./Post";

const Posts = ({ feedType, username, userId }) => {
  const getPostEndpoint = (feedType = () => {
    switch (feedType) {
      case "forYou":
        return "api/posts/all";
      case "following":
        return "api/posts/following";
      default:
        return "api/posts/all";
    }
  });
  const POST_ENDPOINT = getPostEndpoint();
  const {
    data: posts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["posts", feedType],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    enabled: !!feedType,
  });

  return (
    <>
      {isLoading && (
        <div className="flex flex-col justify-center">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}
      {!isLoading && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. Switch 👻</p>
      )}
      {!isLoading && posts && (
        <div>
          {posts.map((post) => {
            console.log(post);
            return <Post key={post._id} post={post} />;
          })}
        </div>
      )}
    </>
  );
};
export default Posts;
