import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { useRouter } from "next/router";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const data = req.body;
    // const router = useRouter();
    // const id = router.pathname;
    const id = req.query.id;
    res.status(200).send(`check the ${id}`);
  } catch (error) {
    // 요청이 실패했을 경우, 에러를 그대로 전달
    res.status(400).json({ error: error });
  }
}
