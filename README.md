# 🎶 Multiple Playlist Deleter

![Demo image](https://multiple-playlist-deleter-markkop.vercel.app/ogimage.jpeg)

I've been a long-time user of [mixkeepr](https://mixkeepr.com/) for saving my weekly music recommendations. However, I ended up with a lot of unused playlists and was unable to delete them all at once using Spotify.

To solve this problem, I created a tool with the help of AI to delete multiple playlists easily.

## Demo

https://multiple-playlist-deleter-markkop.vercel.app/

## Usage

1. Click the "Authorize Multiple Playlist Deleter" link to authenticate with your Spotify account.
2. After authorization, you'll be redirected back to the app logged in.
3. Click the "Load Playlists" button to fetch your playlists.
4. Select the playlists you want to delete by clicking on them.
5. Click the "Delete Selected Playlists" button to delete the selected playlists.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have a Spotify account

To run this project on your local machine, you also must have the following installed:

- You have registered a new Spotify app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
- You have installed Node.js and npm

## Installation

1. Clone this repository:

```bash
git clone git@github.com:Markkop/Multiple-Playlist-deleter.git
```

2. Change into the project directory:

```bash
cd Multiple-Playlist-deleter
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

## Contributing

If you want to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
