# 🎶 Spotify Playlist Deleter

This is a simple Next.js, Tailwind CSS, and TypeScript project that allows users to delete their Spotify playlists. The app uses the Spotify Web API to authenticate users, fetch their playlists, and delete selected playlists.

## Features

- Authenticate with Spotify
- Fetch user's playlists
- Select and delete multiple playlists

# Demo

https://multiple-spotify-playlist-deleter.vercel.app/

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a Spotify account

To run this project on your local machine, you also must have the following installed:

- You have registered a new Spotify app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
- You have installed Node.js and npm

## Installation

1. Clone this repository:

```bash
git clone https://github.com/your-username/spotify-playlist-deleter.git
```

2. Change into the project directory:

```bash
cd spotify-playlist-deleter
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env.local` file in the root of the project and add your Spotify app credentials:

```bash
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/
```

Replace `your_client_id` and `your_client_secret` with the values from your Spotify app.

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Usage

1. Click the "Authorize Spotify Playlist Deleter" link to authenticate with your Spotify account.
2. After authorization, you'll be redirected back to the app logged in.
3. Click the "Load Playlists" button to fetch your playlists.
4. Select the playlists you want to delete by clicking on them.
5. Click the "Delete Selected Playlists" button to delete the selected playlists.

## Contributing

If you want to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
