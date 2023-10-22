import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "../Logo";

export const AppLayout = ({ children, availableTokens, posts, postId }) => {
  const { user } = useUser();
  return (
    <div className="grid grid-cols-[300px_1fr] h-screen max-h-screen">
      <div className="flex flex-col text-white overflow-hidden bg-gradient-to-b from-slate-800 to-cyan-800">
        <div className="px-2">
          <Logo />
          <Link href="/post/new" className="btn">
            New Post
          </Link>
          <Link href="/token-topup" className="block mt-2 mx-auto w-fit">
            <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
            <span className="pl-2">{availableTokens} tokens available</span>
          </Link>
        </div>
        <div className="px-4 flex-1 overflow-auto">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/post/${post._id}`}
              className={`py-1 border border-white/0 block text-ellipsis overflow-hidden whitespace-nowrap my-1 px-2 bg-white/10 cursor-pointer rounded-sm ${
                postId === post._id ? "bg-white/20 border-white" : ""
              }`}
            >
              {post.topic}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-black/50 h-20 px-2">
          {user != null ? (
            <>
              <div>
                <Image
                  src={user.picture}
                  alt={user.name}
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              </div>
              <div>
                <div className="font-bold">{user.email}</div>
                <Link className="text-sm" href="/api/auth/logout">
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <Link href="/api/auth/login">Login</Link>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
