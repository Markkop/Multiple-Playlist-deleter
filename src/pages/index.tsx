import { useState } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

const clientId = process.env.SPOTIFY_CLIENT_ID;

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
});

export default function Home() {
  const [code, setCode] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userId, setUserId] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState(new Set());

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    "http://localhost:3000/"
  )}&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private`;

  async function loginUser() {
    if (!code) return;
    const response = await axios.post("/api/auth", { code });
    const { access_token, refresh_token } = response.data.accessTokenData;
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
  }

  async function loadUserPlaylists() {
    if (!accessToken) {
      return;
    }
    spotifyApi.setAccessToken(accessToken);

    const userData = await spotifyApi.getMe();
    const { id } = userData.body;
    setUserId(id);

    const { body } = await spotifyApi.getUserPlaylists();
    setPlaylists(body.items);
  }

  async function deleteSelectedPlaylists() {
    for (const playlistId of selectedPlaylists) {
      await spotifyApi.unfollowPlaylist(playlistId);
    }
  }

  function selectPlaylist(id: string, checked: boolean) {
    const updatedSelections = new Set(selectedPlaylists);
    if (checked) {
      updatedSelections.add(id);
    } else {
      updatedSelections.delete(id);
    }
    setSelectedPlaylists(updatedSelections);
  }

  return (
    <div>
      <h1>Spotify Playlist Deleter</h1>

      {accessToken ? (
        <>
          <button onClick={loadUserPlaylists}>Load Playlists</button>
          <button
            onClick={deleteSelectedPlaylists}
            disabled={!selectedPlaylists.size}
          >
            Delete Selected Playlists
          </button>
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    selectPlaylist(playlist.id, e.target.checked)
                  }
                />
                {playlist.name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <p>Please authorize the app:</p>
          <a href={authUrl}>Authorize Spotify Playlist Deleter</a>
          <p>
            After authorization, you'll be redirected back to this page with a
            code parameter in the URL. Copy and paste that code below:
          </p>
          <input value={code} onChange={(e) => setCode(e.target.value)} />
          <button onClick={loginUser}>Log in</button>
        </>
      )}
    </div>
  );
}
