import { getAssetFromKV, Options } from "@cloudflare/kv-asset-handler";

import { upload } from "./upload";

const DEBUG = true;
let options: Partial<Options> = {};

export async function handleEvent(event: FetchEvent): Promise<Response> {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method === "POST") {
    const formData = await request.formData();
    return await upload(formData);
  }
  try {
    if (DEBUG) {
      options.cacheControl = {
        bypassCache: true
      };
    }
    return await getAssetFromKV(event, options);
  } catch (e) {
    if (DEBUG) {
      return new Response(e.message || e.toString(), {
        status: 500
      });
    }
    return new Response(`${request.url} not found`, {
      status: 404,
      statusText: "not found"
    });
  }
}
