import React, { useState, useEffect } from "react";
import { Form, ListGroup, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "../assets/css/createPlaylistModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faEye,
  faEyeSlash,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@mui/material";
import LayoutMP from "../Layout/LayoutMP";
import cassette_api from "./../api";

function CreatePlaylist({ confirmUpdate }) {
  const [playlistName, setPlaylistName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  const handleSongSelect = (song) => {
    setSelectedSongs([...selectedSongs, song]);
    const updatedFilteredMusic = searchResults.filter(
      (item) => item.id !== song.id
    );
    setSearchResults(updatedFilteredMusic);
  };

  const reset = () => {
    setPlaylistName("");
    setSearchQuery("");
    setSelectedSongs([]);
    setShowSearchResults(true);
    setSearchResults([]);
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Make API request to fetch matching music data
    cassette_api
      .post("/music/search", { name: searchQuery })
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      });
  }, [searchQuery]);

  const handleClose = () => {
    reset();
  };

  const handleConfirm = () => {
    // Perform validation here
    if (!playlistName) {
      toast.error("Please enter a playlist name");
      return;
    }

    // Extract IDs from selectedSongs array
    const selectedSongIds = selectedSongs.map((song) => song.id);

    const formData = {
      name: playlistName,
      user_id: localStorage.getItem("ID"),
      music_ids: selectedSongIds, // Include the IDs of selected songs
    };

    cassette_api
      .post("/playlist/create", formData)
      .then((response) => {
        toast.success(response.data.message, { autoClose: 2000 });
        confirmUpdate(true);
        reset();
      })
      .catch((err) => toast.error("Error: ", err));
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleRemoveSong = (id) => {
    const removedSong = selectedSongs.find((song) => song.id === id);
    const updatedSelectedSongs = selectedSongs.filter((song) => song.id !== id);
    setSelectedSongs(updatedSelectedSongs);
    setSearchResults([...searchResults, removedSong]); // Add the removed song back to search results
  };

  const toggleSearchResults = () => {
    setShowSearchResults(!showSearchResults); // Toggle visibility of search results
  };

  return (
    <LayoutMP activePage={"CreatePlaylist"}>
      <div className="createPlaylist-modalContainer">
        <ToastContainer />
        <div className="bg-black text-light">
          <Form className="position-relative">
            <Form.Group controlId="playlistName">
              <Form.Label className="mb-1">Playlist Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter playlist name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                required
                className="createPlaylistModal-PlaylistName mb-2"
              />
            </Form.Group>
            <Form.Group controlId="searchMusic" className="position-relative ">
              <Form.Label className="m-0">Search Music</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Enter Music Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="createPlaylistModal-PlaylistName"
                  autoComplete="off"
                />
                {searchQuery && (
                  <>
                    <Tooltip title="Clear">
                      <FontAwesomeIcon
                        icon={faClose}
                        className="createPlaylistModal-clearSearch"
                        onClick={() => handleClearSearch()}
                      />
                    </Tooltip>
                    <Tooltip
                      title={
                        showSearchResults ? "Hide Result(s)" : "Show Result(s)"
                      }
                    >
                      <FontAwesomeIcon
                        icon={showSearchResults ? faEye : faEyeSlash}
                        className={`createPlaylistModal-hideSearch ${
                          !showSearchResults
                            ? "hiddenSearchResult"
                            : "showSearchResult"
                        }`}
                        onClick={() => toggleSearchResults()}
                      />
                    </Tooltip>
                  </>
                )}
              </div>
            </Form.Group>
            {showSearchResults && (
              <ListGroup className="createPlaylistModal-searchResult">
                {searchResults.length > 0 &&
                  searchResults.map((song) => (
                    <ListGroup.Item
                      key={song.id}
                      onClick={() => handleSongSelect(song)}
                    >
                      <div>
                        <p className="mb-0">Song: {song.title}</p>
                        <p className="mb-0 artistName">
                          Artist: {song.artist_name}
                        </p>
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            )}
            <Form.Label className="mb-0 mt-3">Songs (Optional):</Form.Label>
            <ListGroup className="createPlaylistModal-selectedMusic">
              {selectedSongs.length > 0 ? (
                selectedSongs.map((song) => (
                  <ListGroup.Item key={song.id}>
                    <div className="createPlaylistModal-selectedMusic-item">
                      <div className="d-flex flex-column ">
                        <p>{song.title}</p>
                        <p>{song.artist_name}</p>
                      </div>
                      <button variant="danger" size="sm">
                        <Tooltip title="Remove">
                          <FontAwesomeIcon
                            icon={faRemove}
                            onClick={() => handleRemoveSong(song.id)}
                          />
                        </Tooltip>
                      </button>
                    </div>
                  </ListGroup.Item>
                ))
              ) : (
                <div className="no-song-alert">
                  <p>No Song(s) added.</p>
                </div>
              )}
            </ListGroup>
          </Form>
        </div>
        <div className="bg-black">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </LayoutMP>
  );
}

export default CreatePlaylist;
