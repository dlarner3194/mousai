import "reflect-metadata";
import { DynamoDB } from "aws-sdk";
import { DynamoPostParams } from "./dynamo-post-params";
import { injectable } from "inversify";

export interface IPostRepository {
  createRecord(clientRecord: object): Promise<void>;
}

@injectable()
export class PostRepository implements IPostRepository {
  private readonly dynamo: DynamoDB.DocumentClient;

  constructor(region: string, private readonly dynamoTable: string) {
    this.dynamo = new DynamoDB.DocumentClient({
      convertEmptyValues: true,
      region
    });
  }

  public async createRecord(clientRecord: object): Promise<void> {
    const params = new DynamoPostParams(this.dynamoTable, clientRecord);
    await this.dynamo.put(params.toJson()).promise();
  }
}
