import { create } from "zustand";
import type { Playlist, Song } from "./data";

type CurrentPlaylist = Playlist & { songs: Song[] };

type CurrentSong = {
  currentSong: Song | undefined;
  isPlaying: boolean;
  currentPlaylist: CurrentPlaylist | undefined;
  setCurrentPlaylist: (playlist: CurrentPlaylist) => void;
  updateCurrentSong: (newSong: Song) => void;
  setIsPlaying: (isPlaying: boolean) => void;
};

const useMusicPlayer = create<CurrentSong>((set) => ({
  currentSong: undefined,
  isPlaying: false,
  currentPlaylist: undefined,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),
  updateCurrentSong: (newSong) =>
    set({ currentSong: newSong, isPlaying: true }),
  //   updateBears: (newBears) => set({ bears: newBears }),
}));

export { useMusicPlayer };
