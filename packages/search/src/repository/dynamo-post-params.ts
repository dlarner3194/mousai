import { DynamoDB } from "aws-sdk";

export class DynamoPostParams {
  constructor(
    private readonly tableName: string,
    private readonly item: object
  ) {}

  public toJson(): DynamoDB.DocumentClient.PutItemInput {
    const timestamp = new Date().toISOString();

    return {
      Item: {
        ...this.item,
        timestamp
      },
      TableName: this.tableName
    };
  }
}
