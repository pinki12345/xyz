import { IF } from '../url';

const HomePosts = ({ post }) => {

  console.log("Post", post);
  console.log("If",IF);
  const imageUrl = post.photo ? `${IF}${post.photo}` : 'path/to/fallback-image.jpg';
   console.log("Image URL", imageUrl);
  return (
    <div className="w-full flex mt-8 space-x-4">
    
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        {/* <img src={IF + post.photo} alt="" className="h-full w-full object-cover rounded-lg"/> */}

        <img src={imageUrl} alt={post.title || 'Post Image'} className="h-full w-full object-cover rounded-lg" />
      </div>
      
     
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          {post.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2 text-sm">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm md:text-lg">
          {post.desc.slice(0, 200)}{" "}
          <span className="text-blue-500 cursor-pointer">
            ...Read more
          </span>
        </p>
      </div>
    </div>
  );
};

export default HomePosts;
