import { inject, injectable } from "inversify";
import { IDENTIFIERS } from "./identifiers";
import SpotifyWebApi = require("spotify-web-api-node");
import { config } from "./config";

@injectable()
export class Manager {
  constructor(
    @inject(IDENTIFIERS.SPOTIFY_API)
    private readonly spotifyApi: SpotifyWebApi
  ) {}

  public async search(trackName: string) {
    console.log("searching");
    console.log(config.SPOTIFY_CLIENT_ID);
    const response = await this.spotifyApi.searchTracks(trackName, {
      limit: 5,
      market: "US"
    });
    if (!response.body.tracks) {
      throw new Error("No tracks");
    }
    return response.body.tracks.items;
  }
}
