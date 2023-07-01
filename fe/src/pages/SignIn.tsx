import styled from "styled-components";
import { useState } from "react";
import GooogleSignInButton from "../components/loginbutton/GoogleSignIn";
import SignInInputForm from "../components/signIn/SignInForm";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppDispatch } from "../redux/hooks";
import { createNoSubstitutionTemplateLiteral } from "typescript";

interface UserData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  //눌렀을때 서버로 전송하는 함수
  const handlelogin = async (/*보내는데이터 타입*/) => {
    //post 요청으로 데이터보내기 axios

    // const response = await signIn("email-credential", {
    //   email,
    //   password,
    //   redirect: false,
    // });
    const response = await axios.post("/api/signin", { email, password });
    if (response && typeof window !== "undefined") {
      const token = response.data;

      sessionStorage.setItem("UTK", token);
      router.push("/");
    } else {
      window.alert("이메일 혹은 비밀번호가 일치하지 않습니다");
    }
    setEmail("");
    setPassword("");
  };

  const signInData = {
    email,
    password,
    setEmail,
    setPassword,
    handlelogin,
  };

  return (
    <Container>
      <SignupForm>
        <Link href="/">
          <Logo src="../images/logo.png" alt="logo"></Logo>
        </Link>
        <SignInInputForm signInData={signInData} />
        {/* <GooogleSignInButton /> */}
        <SignupButton onClick={handlelogin}>로그인</SignupButton>
        <NavSignup href={"/signup"}>회원가입</NavSignup>
      </SignupForm>
    </Container>
  );
};

export default SignIn;

const NavSignup = styled(Link)`
  font-size: 14px;
  margin-top: 10px;
  align-self: center;
  text-underline-offset: 3px;
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.4)
    ),
    url("../images/enter3.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Logo = styled.img`
  margin: 0;
  padding: 0;
`;

const SignupForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32rem;
  width: 21rem;
  border-radius: 15px;
  background-color: white;
  flex-direction: column;
`;

const SignupButton = styled.button`
  width: 16rem;
  height: 2.6rem;
  margin: 10px;
  border-radius: 2px;
  box-shadow: 1px 2px 2px 1px lightgray;
  border-style: none;
  background-color: #96a5ff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background-color: #8265d6;
    color: #ffff;
  }
`;

// const BlankFrom = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 36rem;
//   width: 21rem;
// `;
