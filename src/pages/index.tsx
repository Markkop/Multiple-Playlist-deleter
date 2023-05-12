import { useState, useEffect } from "react";
import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import Spinner from "../components/Spinner";
import Image from "next/image";

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
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    loadUserPlaylists();
  }, [accessToken]);

  async function loginUser(code: string) {
    if (!code) return;
    const response = await axios.post("/api/auth", { code });
    const { access_token, refresh_token } = response.data.accessTokenData;
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    window.history.pushState({}, "", "/");
  }

  async function fetchAllPlaylists(offset = 0, limit = 50) {
    const { body } = await spotifyApi.getUserPlaylists({ offset, limit });
    if (body.next) {
      return [...body.items, ...(await fetchAllPlaylists(offset + limit))];
    }
    return body.items;
  }

  async function loadUserPlaylists() {
    if (!accessToken) {
      return;
    }
    setIsLoading(true);

    spotifyApi.setAccessToken(accessToken);

    const userData = await spotifyApi.getMe();
    const { id } = userData.body;
    setUserId(id);

    const allPlaylistsItems = await fetchAllPlaylists();
    setPlaylists(allPlaylistsItems);
    setIsLoading(false);
  }

  async function deleteSelectedPlaylists() {
    for (const playlistId of selectedPlaylists) {
      await spotifyApi.unfollowPlaylist(playlistId);
    }
    setSelectedPlaylists(new Set());
    await loadUserPlaylists();
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

  return [
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto max-w-screen-lg">
        <div className="flex gap-2 mb-2 md:gap-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="my-auto w-10 h-10 md:w-14 md:h-14"
          />
          <h1 className="text-2xl font-bold my-auto md:text-5xl">
            Spotify Playlist Deleter
          </h1>
        </div>

        {accessToken ? (
          <>
            <div className="pt-3 pb-5 sticky top-0 flex flex-wrap gap-2 bg-gradient-to-b from-gray-100 from-0% via-gray-100 via-80% to-transparent to-100%">
              <button
                onClick={loadUserPlaylists}
                className={`text-white px-4 py-2 rounded flex gap-4 ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Loading Playlists" : "Load Playlists"}{" "}
                {isLoading && <Spinner />}
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
            </div>

            <ul className="mt-4 space-y-2">
              {playlists.map((playlist) => (
                <li key={playlist.id} className="flex items-center">
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        selectPlaylist(playlist.id, e.target.checked)
                      }
                      className="mr-2"
                    />
                    <span className="text-xl">{playlist.name}</span>
                  </label>
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

      <footer className="fixed bottom-0 left-0 right-0 py-4 bg-gradient-to-t from-gray-300 from-0% via-gray-300 via-80% to-transparent to-100%">
        <p className="font-bold text-center text-gray-500 my-3">
          Made by Mark Kop
        </p>

        <div className="container mx-auto max-w-screen-lg flex justify-center items-center gap-8 md:gap-6">
          {[
            {
              href: "https://github.com/MarkKop",
              src: "/icons/github.svg",
              alt: "GitHub icon",
            },
            {
              href: "https://twitter.com/heyMarkKop",
              src: "/icons/twitter.svg",
              alt: "Twitter icon",
            },
            {
              href: "https://www.linkedin.com/in/marcelo-kopmann",
              src: "/icons/linkedin.svg",
              alt: "LinkedIn icon",
            },
          ].map(({ href, src, alt }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" key={href}>
              <Image
                src={src}
                alt={alt}
                width={24}
                height={24}
                className="w-12 h-12 md:w-8 md:h-8"
              />
            </a>
          ))}
        </div>
      </footer>
    </div>,
  ];
}
