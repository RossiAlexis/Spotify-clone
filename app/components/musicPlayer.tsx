import { useCallback, useEffect, useRef, useState } from "react";
import { Next, Pause, Play, Prev } from "~/icons/musicPlayer";
import { Slider } from "./ui/slider";
import {
  VolumeHigh,
  VolumeLow,
  VolumeMedium,
  VolumeOff,
} from "~/icons/VolumeIcons";
import { useMusicPlayer } from "~/lib/store";

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
    <div className="flex items-center gap-5 relative overflow-hidden w-44">
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

const MusicControls = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    isPlaying,
    setIsPlaying,
    currentSong,
    currentPlaylist,
    updateCurrentSong,
  } = useMusicPlayer();

  const [volume, setVolume] = useState(0);

  const VolumeIcon = useCallback(() => {
    if (volume === 0) return <VolumeOff />;
    if (volume < 0.3) return <VolumeLow />;
    if (volume < 0.7) return <VolumeMedium />;
    return <VolumeHigh />;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentSong, isPlaying]);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  const isLastSong = () => {
    const currentINdex = currentPlaylist?.songs.findIndex(
      (s) => s.id === currentSong?.id
    );

    return currentINdex === currentPlaylist?.songs.length! - 1;
  };
  const isFirstSong = () => {
    const currentIndex = currentPlaylist?.songs.findIndex(
      (s) => s.id === currentSong?.id
    );
    return currentIndex === 0;
  };

  const onPrevSong = () => {
    const currentIndex = currentPlaylist?.songs.findIndex(
      (s) => s.id === currentSong?.id
    );

    if (
      currentIndex === undefined ||
      currentIndex === -1 ||
      !currentPlaylist?.songs
    ) {
      return;
    }
    const nextSong = currentPlaylist?.songs[currentIndex - 1];
    console.log(nextSong, currentIndex);

    if (nextSong) {
      console.log(nextSong);
      updateCurrentSong(nextSong);
    }
  };

  const onNextSong = () => {
    console.log(currentPlaylist);
    const currentIndex = currentPlaylist?.songs.findIndex(
      (s) => s.id === currentSong?.id
    );
    console.log(currentIndex);
    if (
      currentIndex === undefined ||
      currentIndex === -1 ||
      !currentPlaylist?.songs
    )
      return;

    const nextSong = currentPlaylist?.songs[currentIndex + 1];

    if (nextSong) {
      updateCurrentSong(nextSong);
    }
  };
  return (
    <>
      <div className="flex gap-4 items-center justify-center">
        <button
          className="hover:scale-110"
          onClick={onPrevSong}
          disabled={isFirstSong()}
        >
          <Prev />
        </button>
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
        <button
          className="hover:scale-110"
          onClick={onNextSong}
          disabled={isLastSong()}
        >
          <Next />
        </button>
      </div>

      <div className="flex flex-row items-center justify-center gap-2">
        {/* {audioRef?.current && audioRef?.current?.volume < 0.3 ? (
          <VolumeOff />
        ) : (
          <VolumeLow />
        )} */}
        <VolumeIcon />
        <Slider
          defaultValue={[100]}
          min={0}
          max={100}
          className="w-[95px]"
          onValueChange={(value) => {
            if (!audioRef.current) return;
            const [newVolume] = value;

            audioRef.current.volume = newVolume / 100;
            setVolume(newVolume / 100);
          }}
        />
      </div>

      <audio
        ref={audioRef}
        src={`/playlist/${currentPlaylist?.id}/0${currentSong?.id}`}
      />
    </>
  );
};

export default function MusicPlayer() {
  const { currentSong } = useMusicPlayer();

  //   const handleCLick = () => {
  //     if (!audioRef.current) return;
  //     // audioRef.current.src = `/music/1/01.mp3`;

  //     if (audioRef.current.paused) {
  //       audioRef.current.play();
  //     } else {
  //       audioRef.current.pause();
  //     }
  //     //setIsPlaying(!isPlaying);
  //     //"https://vinyl.lofirecords.com/cdn/shop/products/ VINYL_MORNING_COFFEE_4-min.png?v=1680526353";
  //   };

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
      <CurrentSong
        image={currentSong?.image}
        title={currentSong?.title}
        artists={currentSong?.artists || []}
      />

      <MusicControls />
    </div>
  );
}
