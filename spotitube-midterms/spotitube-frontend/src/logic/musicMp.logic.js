import ArtistImg from "../assets/img/jonel2.jpg";
import cassette_api from "../api";
import { useEffect, useState } from "react";

export const artists = [
  { id: 1, name: "Ryan", description: "Artist", image: ArtistImg },
  { id: 2, name: "Franz", description: "Artist", image: ArtistImg },
];

// useEffect(()=> {
//     const [albums, setAlbums] = useState([]);
//     cassette_api.get('/album/all')
//         .then(response => {
//             console.log(response)
//         })
//         .catch(error => {
//             console.error("Error fetching albums: ", error)
//         })
// }, []);

export const albums = [
  { id: 1, name: "Album 1", description: "Description 1" },
  { id: 2, name: "Album 2", description: "Description 2" },
];
