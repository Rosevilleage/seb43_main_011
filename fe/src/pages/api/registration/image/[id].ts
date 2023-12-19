// // import { NextApiRequest, NextApiResponse } from "next";
// // // import { tokenInstance } from "../../utils/tokeninstance";
// // import axios from "axios";
// // import { IncomingForm } from "formidable";
// import { createReadStream } from "fs";

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //   },
// // };

// // export default async function signup(
// //   req: NextApiRequest,
// //   res: NextApiResponse,
// // ) {
// //   try {
// //     // const data = req.body;
// //     const id = req.query.id;
// //     const backendURL = process.env.NEXT_PUBLIC_URL;

// //     const fileData: any = await new Promise((resolve, reject) => {
// //       const form = new IncomingForm({
// //         maxFileSize: 5 * 1024 * 1024,
// //         keepExtensions: true,
// //       });

// //       form.parse(req, (err, fields, files) => {
// //         if (err) return reject(err);
// //         return resolve({
// //           fileData: files,
// //           fields: fields,
// //         });
// //       });
// //     });

// //     const formData = new FormData();

// //     const image = fileData.image;
// //     const readStream = createReadStream(image);

// //     formData.append("image", readStream);
// //     if (backendURL) {
// //       const response = await axios.post(
// //         backendURL + `/custom/submit/image/${id}`,
// //         formData,
// //         {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         },
// //       );
// //       res.status(response.status).json(response.data);
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     res.status(500).send(error);
// //   }
// // }

// // import { IncomingForm, File } from "formidable";
// import axios from "axios";
// import { NextApiRequest, NextApiResponse } from "next";
// // import { streamToBuffer } from "stream-to-buffer";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function imageUploader(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   try {
//     const id = req.query.id;
//     const backendURL = process.env.NEXT_PUBLIC_URL;

//     // const fileData: any = await new Promise((resolve, reject) => {
//     //   const form = new IncomingForm({
//     //     maxFileSize: 5 * 1024 * 1024,
//     //     keepExtensions: true,
//     //   });

//     //   form.parse(req, (err, fields, files) => {
//     //     if (err) return reject(err);
//     //     return resolve({
//     //       fileData: files,
//     //       fields: fields,
//     //     });
//     //   });
//     // });

//     // const formData = new FormData();

//     // const image: File = fileData.image;
//     // const readStream = createReadStream(image.filepath);

//     // await streamToBuffer(readStream, (err, buffer) => {
//     //   if (err) throw err;
//     //   formData.append("image", buffer, {
//     //     filename: image.name,
//     //   });
//     // });

//     // formData.append("image", readStream);
//     console.log("Body", req); // undefined
//     const formData = new FormData();
//     Object.entries(req.body).forEach(([key, value]) => {
//       formData.append(key, value as string);
//     });

//     if (backendURL) {
//       const response = await axios.post(
//         backendURL + `/custom/submit/image/${id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       res.status(response.status).json(response.data);
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// }

import axios from "axios";
// import formidable from "formidable";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const formidable = require("formidable");

import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const upload = async (req: NextApiRequest, res: NextApiResponse) => {
  const fileData: any = await new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      maxFileSize: 5 * 1024 * 1024,
      keepExtensions: true,
    });

    form.parse(req, (err: any, fields: any, files: unknown) => {
      if (err) return reject(err);
      return resolve(files);
    });
  });

  const formData = new FormData();
  const file = fileData.image;
  const readStream = fs.createReadStream(file[0].filepath);
  const chunks: Buffer[] = [];
  readStream.on("data", (chunk) => {
    if (typeof chunk !== "string") return chunks.push(chunk);
  });
  readStream.on("end", () => {
    const fileBlob = Buffer.concat(chunks);
    const fileData = new Blob([fileBlob]);
    formData.append("image", fileData);
  });
  const backendURL = process.env.NEXT_PUBLIC_URL;
  const id = req.query.id;
  if (backendURL) {
    const api = await axios.post(
      backendURL + `/custom/submit/image/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    const status = api.status;

    if (status === 200) {
      res.status(status).json({ success: true });
    } else {
      return res.status(500).json("Unknown Error");
    }
  }
};

export default upload;
