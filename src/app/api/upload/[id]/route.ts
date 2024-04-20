import { google } from "googleapis";
import { NextResponse, NextRequest } from "next/server";
const auth = new google.auth.GoogleAuth({
  scopes: "https://www.googleapis.com/auth/drive",
  projectId: process.env.GDRIVE_PROJECTID as string,
  credentials: {
    client_id: process.env.GDRIVE_CLIENTID as string,
    client_email: process.env.GDRIVE_CLIENTEMAIL as string,
    private_key: (process.env.GDRIVE_PRIVTKEY as string).replace(/\\n/gm, "\n"),
  },
});
export async function GET(request: NextRequest, { params: { id } }) {
  try {
    const defaultImage = NextResponse.redirect(
      new URL("/img/logo.png", process.env.NEXT_PUBLIC_BASE_URL),
      {
        status: 302,
      }
    );
    const driveService = google.drive({ version: "v3", auth: auth });
    const _fileMeta = driveService.files.get({
      // parent: ["1Wl37cdhwm-TtWc5gA6PCFbagSxmhnYOH"],
      fileId: id,
      fields:
        "id, name, mimeType, fileExtension, webContentLink, thumbnailLink",
      supportsAllDrives: false,
    });

    const _fileContent = driveService.files.get(
      {
        fileId: id,
        alt: "media",
        supportsAllDrives: false,
      },
      {
        responseType: "stream",
      }
    );

    const [fileMeta, fileContent] = await Promise.all([
      _fileMeta,
      _fileContent,
    ]);
    const fileSize = Number(fileMeta.data.size || 0);

    if (!fileMeta.data.webContentLink) return defaultImage;
    if (!fileMeta.data.thumbnailLink) return defaultImage;
    if (
      !fileMeta.data.mimeType?.startsWith("image") &&
      !fileMeta.data.mimeType?.startsWith("video")
    )
      return defaultImage;
    return NextResponse.redirect(fileMeta.data.thumbnailLink);
  } catch (error) {
    const e = error;
    console.error(e.message);
    return NextResponse.json(
      {
        error: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
