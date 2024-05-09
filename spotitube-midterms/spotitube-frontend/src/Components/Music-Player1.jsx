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

const MusicPlayer1 = ({ isVisible, onClose }) => {
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

export default MusicPlayer1;
