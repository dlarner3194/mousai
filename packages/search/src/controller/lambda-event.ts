import { APIGatewayEvent } from "aws-lambda";

export class LambdaEvent {
  constructor(private readonly event: APIGatewayEvent) {}

  public getSearchQueryParam(): string {
    if (
      !this.event.queryStringParameters ||
      !this.event.queryStringParameters.track
    ) {
      throw new Error("No Query string params");
    }
    return this.event.queryStringParameters.track;
  }
}
