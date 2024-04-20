import { google } from "googleapis";
import { NextResponse, NextRequest } from "next/server";

import { Readable } from "node:stream";
const auth = new google.auth.GoogleAuth({
  scopes: "https://www.googleapis.com/auth/drive",
  projectId: process.env.GDRIVE_PROJECTID as string,
  credentials: {
    client_id: process.env.GDRIVE_CLIENTID as string,
    client_email: process.env.GDRIVE_CLIENTEMAIL as string,
    private_key: (process.env.GDRIVE_PRIVTKEY as string).replace(/\\n/gm, "\n"),
  },
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.getAll("file");
  if (typeof file[0] == "string") {
    return NextResponse.json(file);
  }
  const filename = formData.getAll("fileName");

  const uploadToGooglDrive = async (fileBuffer: any) => {
    const fileMetadata = {
      name: filename,
      parents: ["1Wl37cdhwm-TtWc5gA6PCFbagSxmhnYOH"],
    };

    const driveService = google.drive({ version: "v3", auth: auth });

    const res = await driveService.files.create({
      requestBody: fileMetadata,
      media: {
        // mimeType : "application/pdf" ,
        body: Readable.from(fileBuffer),
      },
      fields: "id",
    });
    return res.data.id;
  };
  try {
    let files: string[] = [];
    file.map(async (f: any) =>
      files.push(
        await new Promise<string>(async (resolve) => {
          const fileBuffer = f.stream();

          const res = await uploadToGooglDrive(fileBuffer);
          resolve(res);
        })
      )
    );

    let uploadedFiles = await Promise.all(files);

    return NextResponse.json(uploadedFiles);
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
