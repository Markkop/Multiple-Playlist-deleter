import { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
  redirectUri: redirectUri,
});

export async function getAccessToken(code: string) {
  try {
    const { body } = await spotifyApi.authorizationCodeGrant(code);
    return body;
  } catch (err) {
    console.error(`Error getting access token: ${err.message}`);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!req.body || !req.body.code) {
      res.status(400).json({ error: "Invalid request" });
      return;
    }

    const accessTokenData = await getAccessToken(req.body.code);

    if (accessTokenData) {
      res.status(200).json({ accessTokenData });
    } else {
      res.status(500).json({ error: "Failed to get access token" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
