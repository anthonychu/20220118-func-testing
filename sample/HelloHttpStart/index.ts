﻿import * as df from "durable-functions"
import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpStart: AzureFunction = async function (context: Context, req: HttpRequest): Promise<any> {
    const client = df.getClient(context);
    const instanceId = await client.startNew("HelloOrchestrator", undefined, req.body);
    context.log(`Started orchestration with ID = '${instanceId}'.`);

    return client.createCheckStatusResponse(req, instanceId);
};

export default httpStart;
