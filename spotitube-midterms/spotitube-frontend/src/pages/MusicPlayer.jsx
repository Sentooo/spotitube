import React, { useState, useEffect, useRef } from "react";
import "../assets/css/music-player.css";
import {
  PlayArrowOutlined,
  SkipNextOutlined,
  SkipPreviousOutlined,
  PauseOutlined,
  Shuffle,
  Repeat,
} from "@mui/icons-material";

const MusicPlayer = ({ isVisible, onClose }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/fetchMusic", {
          method: "POST",
          body: JSON.stringify({ album_id: index }),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch songs");
        }
        const data = await response.json();
        setSongs(data); // Assuming data is already in the correct format
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const handleSongEnd = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else if (isShuffle) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        setCurrentTrackIndex(randomIndex);
      } else {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % songs.length);
      }
    };

    audio.addEventListener("ended", handleSongEnd);

    return () => {
      audio.removeEventListener("ended", handleSongEnd);
    };
  }, [currentTrackIndex, isRepeat, isShuffle, songs]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    audioRef.current.currentTime = seekTime;
  };

  const playNextSong = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const playPrevSong = () => {
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
    );
  };

  const toggleShuffle = () => {
    setIsShuffle((prevShuffle) => !prevShuffle);
  };

  const toggleRepeat = () => {
    setIsRepeat((prevRepeat) => !prevRepeat);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };

  return (
    <div className={`footer-player ${isVisible ? "visible" : "hidden"}`}>
      {songs.length > 0 && (
        <div className="player-info">
          <img
            src={songs[currentTrackIndex].image}
            alt="Album Cover"
            className="album-cover"
          />
          <div className="song-details">
            <h3>{songs[currentTrackIndex].title}</h3>
            <p>{songs[currentTrackIndex].artist}</p>
          </div>
        </div>
      )}
      <div className="player-controls">
        <audio
          ref={audioRef}
          src={songs.length > 0 ? songs[currentTrackIndex].audio_link : ""}
        ></audio>
        <button onClick={playPrevSong}>
          <SkipPreviousOutlined />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <PauseOutlined /> : <PlayArrowOutlined />}
        </button>
        <button onClick={playNextSong}>
          <SkipNextOutlined />
        </button>
        <button onClick={toggleShuffle} className={isShuffle ? "active" : ""}>
          <Shuffle />
        </button>
        <button onClick={toggleRepeat} className={isRepeat ? "active" : ""}>
          <Repeat />
        </button>
        <div className="progress-container" onClick={handleSeek}>
          <span className="time-display left">{formatTime(currentTime)}</span>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            ></div>
          </div>
          <span className="time-display right">{formatTime(duration)}</span>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MusicPlayer;
