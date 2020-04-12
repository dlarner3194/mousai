import "reflect-metadata";

import { Container } from "inversify";
import { config } from "./config";
import { Controller, IController } from "./controller";
import { IDENTIFIERS } from "./identifiers";
import { Manager } from "./manager";
import SpotifyWebApi = require("spotify-web-api-node");

import { PostRepository } from "./repository";

export interface ISearchContainer {
  bind(): Promise<ISearchContainer>;

  getController(): IController;
}

export class SearchContainer implements ISearchContainer {
  private readonly container: Container;

  constructor() {
    this.container = new Container();
  }

  public async bind(): Promise<ISearchContainer> {
    await this.bindSpotifyApi();
    this.container.bind(IDENTIFIERS.MANAGER).to(Manager);
    this.container.bind(IDENTIFIERS.CONTROLLER).to(Controller);

    return this;
  }

  public async bindSpotifyApi(): Promise<void> {
    const spotifyApi = new SpotifyWebApi({
      clientId: config.SPOTIFY_CLIENT_ID,
      clientSecret: config.SPOTIFY_CLIENT_SECRET
    });
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body.access_token);

    this.container.bind(IDENTIFIERS.SPOTIFY_API).toConstantValue(spotifyApi);
  }

  public getController(): IController {
    return this.container.get(IDENTIFIERS.CONTROLLER);
  }
}
