import { useState, useEffect } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
});

export default function Home() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [userId, setUserId] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState(new Set());

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private`;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      loginUser(code);
    }
  }, []);

  async function loginUser(code: string) {
    if (!code) return;
    const response = await axios.post("/api/auth", { code });
    const { access_token, refresh_token } = response.data.accessTokenData;
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    window.history.pushState({}, "", "/");
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
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Spotify Playlist Deleter</h1>

        {accessToken ? (
          <>
            <button
              onClick={loadUserPlaylists}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
            >
              Load Playlists
            </button>
            <button
              onClick={deleteSelectedPlaylists}
              disabled={!selectedPlaylists.size}
              className={`${
                !selectedPlaylists.size ? "opacity-50" : ""
              } bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded`}
            >
              Delete Selected Playlists
            </button>
            <ul className="mt-4 space-y-2">
              {playlists.map((playlist) => (
                <li key={playlist.id} className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      selectPlaylist(playlist.id, e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-xl">{playlist.name}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p className="mb-2">Please authorize the app:</p>
            <a
              href={authUrl}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded inline-block mb-4"
            >
              Authorize Spotify Playlist Deleter
            </a>
          </>
        )}
      </div>
    </div>
  );
}
