import { LambdaEvent } from "@DillonSykes/lambda-event";
import { Manager } from "../manager";

export class Controller {
  constructor(private readonly manager: Manager) {}

  public async createRecord(lambdaEvent: LambdaEvent): Promise<void> {
    const body = lambdaEvent.getBody();

    const response = await this.manager.createRecord(body);
  }
}
