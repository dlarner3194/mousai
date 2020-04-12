import { APIGatewayEvent, Context, Callback } from "aws-lambda";
import { Manager } from "./manager";
import { Controller } from "./controller";
import { LambdaEvent } from "@DillonSykes/lambda-event";
import { PostContainer } from "./container";

export async function handler(
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
): Promise<void> {
  const body = event.body;
  console.log(body);

  const lambdaEvent = new LambdaEvent(event);
  const container = new PostContainer().bind();

  const controller = container.getController();

  await controller;

  controller.createRecord(lambdaEvent);
  callback(null, body);
}
