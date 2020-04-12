import { Manager } from "../manager";
import { LambdaEvent } from "./lambda-event";
import { inject, injectable } from "inversify";
import { IDENTIFIERS } from "../identifiers";

export interface IController {
  search(lambdaEvent: LambdaEvent): Promise<void>;
}

@injectable()
export class Controller implements IController {
  constructor(@inject(IDENTIFIERS.MANAGER) private readonly manager: Manager) {}

  public async search(lambdaEvent: LambdaEvent): Promise<any> {
    try {
      const trackName = lambdaEvent.getSearchQueryParam();

      const listOfTracks = await this.manager.search(trackName);
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(listOfTracks),
        isBase64Encoded: false
      };
      return response;
    } catch (e) {
      console.error(e);
      return e;
    }
  }
}
