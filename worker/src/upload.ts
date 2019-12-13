// @ts-nocheck
import { Buffer} from "node-buffer"

export async function upload(formData: FormData): Promise<Response> {
  let image = new Buffer(formData.get("image-upload"))
  console.log(image)
  return new Response("Uploaded form data")
}
