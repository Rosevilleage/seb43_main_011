import { NextApiRequest, NextApiResponse } from "next";
// import { tokenInstance } from "../../utils/tokeninstance";
import axios from "axios";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = req.body;
    const backendURL = process.env.NEXT_PUBLIC_URL;
    if (backendURL) {
      const result = await axios.post(
        backendURL + "/custom/submit/content",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      res.status(result.status).json(result.data.data.recipeId);
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
}
