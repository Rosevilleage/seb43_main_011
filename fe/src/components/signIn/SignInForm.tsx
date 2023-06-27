import { useState } from "react";
import styled from "styled-components";

const InputArea = styled.input`
  width: 16rem;
  height: 2.4rem;
  padding: 7px;
  margin-top: 5px;
  border-radius: 5px;
  border: 0.5px solid #96a5ff;
  &:focus {
    outline: none;
    border: 1px solid #96a5ff;
    box-shadow: 0 0 5px 1px #abb7fc;
  }
`;

const EmailForm = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PasswordForm = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 10px;
  margin-top: 5px;
  margin-bottom: 0px;
  padding: 0;
`;

const Label = styled.label`
  width: 16rem;
  color: #96a5ff;
  font-weight: 900;
  text-align: left;
`;

interface SignInInputProps {
  signInData: {
    email: string;
    password: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handlelogin: () => void;
  };
}

export default function SignInInputForm({ signInData }: SignInInputProps) {
  const { email, password, setEmail, setPassword, handlelogin } = signInData;
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex =
      /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,}){1,2}$/.test(e.target.value);
    setShowEmailError(!emailRegex); //정규식에 일치하지않으면 출력.
  };
  //비밀번호 유효성검사

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        e.target.value,
      );
    setShowPasswordError(!passwordRegex);
  };

  const handlePasswordKeyup = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && !showEmailError && !showPasswordError) {
      handlelogin();
    }
  };

  return (
    <>
      <EmailForm>
        <Label>E-mail</Label>
        <InputArea
          value={email}
          onChange={handleEmail}
          placeholder="아이디"
        ></InputArea>
        {showEmailError && (
          <ErrorMessage>올바른 이메일 형식을 입력해주세요.</ErrorMessage>
        )}
      </EmailForm>
      <PasswordForm>
        <Label>Password</Label>
        <InputArea
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={handlePassword}
          onKeyUp={handlePasswordKeyup}
        ></InputArea>
        {showPasswordError && (
          <ErrorMessage>
            최소 1개 이상의 숫자와 특수문자가 포함되어어 합니다.
          </ErrorMessage>
        )}
      </PasswordForm>
    </>
  );
}
