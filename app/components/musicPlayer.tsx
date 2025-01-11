import { useRef } from "react";
import { Pause, Play } from "~/icons/musicPlayer";

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

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleCLick = () => {
    if (!audioRef.current) return;

    audioRef.current.src = `/music/1/01.mp3`;

    audioRef.current.pause();
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
    <div className="flex flex-row justify-between w-full px-4 z-50 text-white">
      {/* <CurrentSong
        image={currentMusic.song?.image}
        title={currentMusic.song?.title}
        artists={currentMusic.song?.artists || []}
      /> */}
      <div className="flex gap-4 items-center justify-center">
        {/* <button onClick={onPrevSong} className="hover:scale-110">
            <Prev />
          </button> */}
        <button
          className="bg-white rounded-full p-2 hover:scale-110"
          onClick={handleCLick}
        >
          {/* {isPlaying ? (
              <Pause className="text-black" />
            ) : ( */}
          <Play className="text-black" />
          {/* )} */}
        </button>
        {/* <button onClick={onNextSong} className="hover:scale-110">
            <Next />
          </button> */}
      </div>
      {/* <div className="flex flex-row items-center justify-center gap-2">
          <VolumeOff />
  
          <Slider
            defaultValue={[100]}
            min={0}
            max={100}
            className="w-[95px]"
            onValueChange={(value) => {
              if (!audioRef.current) return;
              const [newVolume] = value;
              audioRef.current.volume = newVolume / 100;
            }}
          />
        </div> */}
      <audio ref={audioRef} />
    </div>
  );
}
