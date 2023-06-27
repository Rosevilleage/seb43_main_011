import { NextApiRequest, NextApiResponse } from "next";
// import { tokenInstance } from "../../utils/tokeninstance";
import axios from "axios";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // const { nickName, email, password } = req.body;
    // const data = { nickName, email, password };
    const data = req.body;
    const backendURL = process.env.NEXT_PUBLIC_URL;
    // 다른 백엔드 서버로 POST 요청 보내기
    if (backendURL) {
      const result = await axios.post(`${backendURL}/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      // 백엔드 서버로부터 받은 응답을 그대로 전달
      res.status(result.status).json(result.data);
    }
  } catch (error) {
    // 요청이 실패했을 경우, 에러를 그대로 전달
    console.log(error);
    res.json({ error: error });
  }
}
