import "reflect-metadata";

import { Container } from "inversify";
import { config } from "./config";
import { Controller, IController } from "./controller";
import { IDENTIFIERS } from "./identifiers";
import { Manager } from "./manager";

import { PostRepository } from "./repository";

export interface IPostContainer {
  bind(): IPostContainer;

  getController(): IController;
}

export class PostContainer implements IPostContainer {
  private readonly container: Container;

  constructor() {
    this.container = new Container();
  }

  public bind(): IPostContainer {
    this.bindPostRepositories();
    this.container.bind(IDENTIFIERS.MANAGER).to(Manager);
    this.container.bind(IDENTIFIERS.CONTROLLER).to(Controller);

    return this;
  }

  public getController(): IController {
    return this.container.get(IDENTIFIERS.CONTROLLER);
  }

  private bindPostRepositories(): void {
    const postRepository = new PostRepository(
      config.REGION,
      config.DYNAMO_TABLE
    );
    this.container
      .bind(IDENTIFIERS.POST_REPOSITORY)
      .toConstantValue(postRepository);
  }
}
