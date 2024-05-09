import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/spotify-style-music-player.css"; // Updated CSS file with Spotify-like styles
import {
  PlayCircleFilled,
  SkipNext,
  SkipPrevious,
  PauseCircleFilled,
  Shuffle,
  Repeat,
} from "@mui/icons-material";
import cassette_api from "../api";

const MusicPlayer = ({ isVisible, onClose }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState([]);
  const audioRef = useRef(null);
  const { type, index } = useParams();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await cassette_api.get(
          `/fetchMusic?album_id=${index}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to fetch songs");
        }
        setSongs(response.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
        // Display an error message to the user here (optional)
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
    <div className={`spotify-music-player ${isVisible ? "visible" : "hidden"}`}>
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
        <div className="player-buttons">
          <button
            onClick={toggleShuffle}
            className={`control-button ${isShuffle ? "active" : ""}`}
          >
            <Shuffle />
          </button>
          <button onClick={playPrevSong} className="control-button">
            <SkipPrevious />
          </button>
          <button onClick={togglePlayPause} className="control-button">
            {isPlaying ? <PauseCircleFilled /> : <PlayCircleFilled />}
          </button>
          <button onClick={playNextSong} className="control-button">
            <SkipNext />
          </button>
          <button
            onClick={toggleRepeat}
            className={`control-button ${isRepeat ? "active" : ""}`}
          >
            <Repeat />
          </button>
        </div>
        <div className="progress-container" onClick={handleSeek}>
          <div
            className="progress-bar"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <div className="time-display">
          <span className="current-time">{formatTime(currentTime)}</span>
          <span className="duration">{formatTime(duration)}</span>
        </div>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
