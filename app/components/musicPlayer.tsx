import { useRef, useState } from "react";
import { Next, Pause, Play, Prev } from "~/icons/musicPlayer";
import { Slider } from "./ui/slider";
import { VolumeOff } from "~/icons/VolumeIcons";
import type { Song } from "~/lib/data";

const CurrentSong = ({
  image,
  title,
  artists,
}: {
  image?: string;
  title?: string;
  artists: string[];
}) => {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <picture className="w-16 h-16 rounded-mg bg-zinc-800 shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-sm block">{title}</h3>
        <span className="text-xs opacity-80">{artists.join(", ")}</span>
      </div>
    </div>
  );
};

const PlayPauseButton = ({ onClick }: { onClick: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    onClick();
    setIsPlaying(!isPlaying);
  };

  console.log("el button");
  return (
    <button
      onClick={handleClick}
      className="bg-white rounded-full p-2 hover:scale-110"
    >
      {isPlaying ? (
        <Pause className="text-black" />
      ) : (
        <Play className="text-black" />
      )}
    </button>
  );
};

export default function MusicPlayer({ currentSong }: { currentSong?: Song }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  console.log("el music player", currentSong);
  const handleCLick = () => {
    if (!audioRef.current) return;
    // audioRef.current.src = `/music/1/01.mp3`;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    //setIsPlaying(!isPlaying);
    //"https://vinyl.lofirecords.com/cdn/shop/products/ VINYL_MORNING_COFFEE_4-min.png?v=1680526353";
  };

  // const onPrevSong = () => {
  //   const { song, songs, playlist } = currentMusic;
  //   if (!song) return;
  //   const currentIndex = songs.findIndex((s) => s.id === song.id);
  //   if (currentIndex === 0) return;
  //   setCurrentMusic({
  //     playlist,
  //     song: songs[currentIndex - 1],
  //     songs,
  //   });
  // };

  // const onNextSong = () => {
  //   const { song, songs, playlist } = currentMusic;
  //   if (!song) return;
  //   const currentIndex = songs.findIndex((s) => s.id === song.id);
  //   if (currentIndex === songs.length - 1) return;
  //   setCurrentMusic({
  //     playlist,
  //     song: songs[currentIndex + 1],
  //     songs,
  //   });
  // };

  return (
    // create a spotify player
    <div className="flex flex-row justify-between items-center w-full px-4 z-50 text-white h-full">
      {/* 
image={currentMusic.song?.image}
        title={currentMusic.song?.title}
        artists={currentMusic.song?.artists || []} */}

      <CurrentSong
        image={currentSong?.image}
        title={currentSong?.title}
        artists={currentSong?.artists || []}
      />

      <div className="flex gap-4 items-center justify-center">
        <button className="hover:scale-110">
          <Prev />
        </button>
        <PlayPauseButton onClick={handleCLick} />
        <button className="hover:scale-110">
          <Next />
        </button>
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
        <VolumeOff />
        <Slider defaultValue={[100]} min={0} max={100} className="w-[95px]" />
      </div>
      {/* 
            onValueChange={(value) => {
              if (!audioRef.current) return;
              const [newVolume] = value;
              audioRef.current.volume = newVolume / 100;
            }}
           */}
      <audio ref={audioRef} src={`/playlist/1/01`} />
    </div>
  );
}
