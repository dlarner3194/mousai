import { inject } from "inversify";
import { IDENTIFIERS } from "./identifiers";
import { IPostRepository } from "./repository";

export class Manager {
  constructor(
    @inject(IDENTIFIERS.POST_REPOSITORY)
    private readonly postRepository: IPostRepository
  ) {}

  public async createRecord(body: object) {}
}
