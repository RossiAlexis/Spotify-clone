import path from "path";
import type { Route } from "./+types/song";
import { stat } from "fs/promises";
import { createReadStream } from "fs";

export async function loader({ params }: Route.LoaderArgs) {
  const playlistId = params.playlistId;
  const songId = params.songId;

  const filePath = path.resolve(`public/music/${playlistId}/${songId}.mp3`);

  // Verifica si el archivo existe
  try {
    const fileStat = await stat(filePath);
    console.log("filestat");
    // Devuelve el archivo con un stream
    const stream = createReadStream(filePath);
    const readableStream = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => controller.enqueue(chunk));
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
    });

    return new Response(readableStream, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": fileStat.size.toString(),
      },
    });
  } catch (error) {
    console.log(error)
    throw new Response("File not found", { status: 404 });
  }
}
