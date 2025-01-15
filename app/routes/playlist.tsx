import { allPlaylists, songs } from "~/lib/data";
import type { Route } from "./+types/playlist";

export async function loader({ params }: Route.LoaderArgs) {
  const playlist = allPlaylists.find(
    (playlist) => playlist.id === params.playlistId
  );
  const playlistSongs = songs.filter(
    (song) => song.albumId === playlist?.albumId
  );

  return { playlistSongs, playlist };
}

// renders after the loader is done
export default function Playlist({ loaderData }: Route.ComponentProps) {
  //   return <h1>{loaderData.name}</h1>;
  const { playlist, playlistSongs } = loaderData;
  return (
    <>
      <div
        id="playlist-container"
        className="relative flex flex-col h-full bg-zinc-900 overflow-x-hidden"
        //transition:name=`playlist-${id}-box`
      >
        <header className="flex flex-row gap-8 px-6 mt-12">
          <picture className="aspect-square w-52 h-52 flex-none">
            <img
              src={playlist?.cover}
              alt={`Cover of ${playlist?.title}`}
              className="object-cover w-full h-full shadow-lg"
              //transition:name=`playlist-${playlist?.id}-image`
            />
          </picture>
          <div className="flex flex-col justify-between">
            <h2 className="flex flex-1 items-end text-gray-300">Playlist</h2>
            <div>
              <h1 className="title-clamp font-bold block text-white text-3xl">
                {playlist?.title}
                <span
                  className="text-gray-400"
                  //transition:name=`playlist-${playlist?.id}-title`
                ></span>
              </h1>
            </div>

            <div className="flex-1 flex items-end">
              <div className="text-sm text-gray-300 font-normal">
                <div
                // transition:name=`playlist-${id}-artists`
                >
                  <span>{playlist?.artists.join(", ")}</span>
                </div>
                <p className="mt-1`">
                  <span className="text-white">
                    {playlistSongs.length} songs
                  </span>{" "}
                  3 h aprox
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 px-6 pt-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 -z-10"></div>
        </header>
      </div>
    </>
  );
}
