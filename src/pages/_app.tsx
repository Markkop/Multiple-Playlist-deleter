import Head from "next/head";
import { AppProps } from "next/app";
import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Multiple Playlist Deleter</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Easily delete multiple Spotify playlists at once with this simple web app."
        />
        <meta name="keywords" content="Spotify, playlists, delete, web app" />
        <meta name="author" content="Mark Kop" />
        <meta property="og:title" content="Spotify Playlist Deleter" />
        <meta
          property="og:description"
          content="Easily delete multiple Spotify playlists at once with this simple web app."
        />
        <meta
          property="og:image"
          content="https://multiple-playlist-deleter-markkop.vercel.app/ogimage.jpeg"
        />
        <meta
          property="og:url"
          content="https://multiple-playlist-deleter-markkop.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@heyMarkKop" />
        <meta name="twitter:creator" content="@heyMarkKop" />
        <meta name="twitter:title" content="Multiple Playlist Deleter" />
        <meta
          name="twitter:description"
          content="Easily delete multiple Spotify playlists at once with this simple web app."
        />
        <meta
          name="twitter:image"
          content="https://multiple-playlist-deleter-markkop.vercel.app/ogimage.jpeg"
        />
        <meta name="twitter:image:alt" content="Multiple Playlist Deleter" />
        <meta
          name="twitter:url"
          content="https://multiple-playlist-deleter-markkop.vercel.app/"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
