import {
  streamText,
  UIMessage,
  convertToModelMessages,
  tool,
  stepCountIs,

  //toUIMessageStream,
} from "ai";
import { openai } from "@ai-sdk/openai";
import z from "zod";
import { queryTool } from "../tools/tool_function";
import { SYSTEM_PROMPT } from "../prompt/propmt";
import { db } from "@/app/db/db";
export const maxDuration: number = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const SYSTEM_MSG = SYSTEM_PROMPT();

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(5),
    system: SYSTEM_MSG,
    tools: {
      schema: tool({
        description: "Call the tool to get database schema information",
        inputSchema: z.object({}),
        execute: async () => {
          const result = await queryTool();
          return result;
        },
      }),
      db: tool({
        description: "Call this tool to query a database",
        inputSchema: z.object({
          query: z.string().describe("The SQL query to be run"),
        }),
        execute: async ({ query }) => {
          //db call//
          console.log("Query:", query);
          // Important:make sure you sanitize/validate (somehow) check the query //
          return await db.run(query) //<- this query is created by LLM
          
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();

  /*return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });*/
}
