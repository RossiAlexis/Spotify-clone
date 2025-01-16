import { data, Outlet } from "react-router";
import SideMenuItem from "~/components/sideMenuItem";
import HomeIcon from "~/icons/home";
import LibraryIcon from "~/icons/library";
import SearchIcon from "~/icons/search";
import { playlists, songs, type Playlist, type Song } from "~/lib/data";
import SideMenuCard from "~/components/sideMenuCard";
import MusicPlayer from "~/components/musicPlayer";
import type { Route } from "./+types/layout";

export async function loader() {
  return {
    playlists,
  };
}

export default function HomeLayout({
  loaderData,
}: Route.ComponentProps) {
  const { playlists } = loaderData;
  return (
    <div className="flex flex-col relative h-screen p-2 gap-2">
      <div className="flex flex-1 h-[85%] w-full">
        <aside className="w-[350px] flex flex-col overflow-y-auto">
          <nav className="flex flex-col gap-2 h-screen">
            <div className="bg-zinc-900 rounded-lg p-2">
              <ul>
                <SideMenuItem href="/">
                  <HomeIcon />
                  Home
                </SideMenuItem>
                <SideMenuItem href="/">
                  <SearchIcon />
                  Search
                </SideMenuItem>
              </ul>
            </div>
            <div className="bg-zinc-900 rounded-lg flex-1">
              <ul>
                <SideMenuItem href="/">
                  <LibraryIcon />
                  Your Library
                </SideMenuItem>
                {playlists.map((playlist) => (
                  <SideMenuCard playlist={playlist} key={playlist.id} />
                ))}
              </ul>
            </div>
          </nav>
        </aside>
        <main className="overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
      <footer className="basis-1/12 h-16 flex-shrink-0">
        <MusicPlayer />
      </footer>
    </div>
  );
}
