// import type { Route } from "../+types/home";
import { useState } from "react";
import type { Route } from "./+types";
import type { Route as LayoutRoute } from "./+types/layout";
import type { Playlist } from "~/lib/data";
import { Play } from "~/icons/musicPlayer";
import { NavLink, useFetcher } from "react-router";

export { loader } from "./layout";
export { action } from "./layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}
function Greeting() {
  const date = new Date();
  const currentHout = date.getHours();

  // REMOVE USESTATE
  const [greeting] = useState(() => {
    if (currentHout < 12) {
      return "Good Morning";
    } else if (currentHout < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  });

  return <h1 className="text-3xl font-bold">{greeting}</h1>;
}

function PlayListItemCard({ playlist }: { playlist: Playlist }) {
  const { id, cover, title, artists, color } = playlist;
  const artistsString = artists.join(", ");
  let fetcher = useFetcher();

  return (
    <article className="group relative transition-all duration-300  rounded-md  hover:bg-zinc-800 shadow-lg hover:shadow-xl bg-zinc-500/30">
      <div className="absolute right-4 bottom-20 translate-y-4 transition-all duration-500 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10">
        {/* <CardPlayButton client:load id={id} /> */}
        <fetcher.Form method="POST" action="/layout">
          <input className="hidden" name="playlistId" defaultValue={id} />
          <input className="hidden" name="songId" defaultValue={1} />
          <button
            type="submit"
            className="card-play-button rounded-full bg-green-500 p-3"
          >
            {/* {isPlayingPlaylist ? <Pause /> : <Play />} */}
            <Play />
          </button>
        </fetcher.Form>
      </div>
      <NavLink
        to={`/playlist/${id}`}
        className="playlist-item w-44 flex flex-col relative p-2 pb-6 overflow-hidden gap-2 "
        // transition:name=`playlist-${id}-box`
      >
        <picture className="aspect-square w-full h-auto flex-none">
          <img
            src={cover}
            alt={`Cover of ${title} by ${artistsString}`}
            className="object-cover w-full h-full rounded-md"
            // transition:name=`playlist-${id}-image`
          />
        </picture>
        <div className="flex flex-auto flex-col truncate">
          <h4
            className="text-white text-sm"
            // transition:name=`playlist-${playlist?.id}-title`
          >
            {title}
          </h4>
          <span
            className="text-xs text-gray-400"
            // transition:name=`playlist-${id}-artists`
          >
            {artistsString}
          </span>
        </div>
      </NavLink>
    </article>
  );
}

export default function Home({ loaderData }: LayoutRoute.ComponentProps) {
  const playlists = loaderData.playlists;
  return (
    <div
      id="playlist-container"
      className="relative transition-all duration-100 bg-green-600 h-full"
    >
      <div className="relative z-10 px-6 pt-10">
        <Greeting />
        <div className="flex flex-wrap mt-6 gap-4">
          {playlists.map((playlist) => (
            <PlayListItemCard playlist={playlist} key={playlist.id} />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80"></div>
    </div>
  );
}
