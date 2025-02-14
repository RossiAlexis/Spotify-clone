import { NavLink } from "react-router";
import type { Playlist } from "~/lib/data";

interface Props {
  playlist: Playlist;
}
export default function SideMenuCard({ playlist }: Props) {
  const { id, title, cover, artists } = playlist;
  const artistsString = artists.join(", ");
  return (
    <NavLink
      to={`playlist/${id}`}
      className="playlist-item flex relative p-2 overflow-hidden items-center gap-5 rounded-md hover:bg-zinc-800"
    >
      <picture className="h-12 w-12 flex-none">
        <img
          src={cover}
          alt={`Cover of ${title} by ${artistsString}`}
          className="object-cover w-full h-full rounded-md"
        />
      </picture>
      <div className="flex flex-auto flex-col truncate">
        <h4 className=" text-white text-sm">{title}</h4>
        <span className="text-xs text-gray-400">{artistsString}</span>
      </div>
    </NavLink>
  );
}
