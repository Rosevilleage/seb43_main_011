import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = req.body;
    const data = { email, password };
    const backendURL = process.env.NEXT_PUBLIC_URL;
    if (backendURL) {
      const result = await axios.post(backendURL + "/login", data);
      axios.defaults.headers.common["Authorization"] =
        result.headers["authorization"];
      const token = result.headers["authorization"];
      res.status(result.status).json(token);
    }
  } catch (error) {
    res.json({ error: error });
  }
}
