import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import { SearchContainer } from "./container";
import { LambdaEvent } from "./controller/lambda-event";

export async function handler(event: APIGatewayEvent): Promise<void> {
  try {
    const lambdaEvent = new LambdaEvent(event);
    const container = await new SearchContainer().bind();

    const controller = await container.getController();

    return await controller.search(lambdaEvent);
  } catch (e) {
    console.error(e);
    return e;
  }
}
