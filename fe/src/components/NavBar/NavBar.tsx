import Link from "next/link";
import styled from "styled-components";
import { IoIosWine, IoMdHeart, IoMdPeople, IoMdCreate } from "react-icons/io";
import { IconContext } from "react-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { navClose } from "./../../redux/slices/NavSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/router";

const NavContainer = styled.nav<{ isNavOpen: boolean }>`
  position: fixed;
  background-color: white;
  transition: 0.3s ease;
  z-index: 2;
  top: ${(props) => (props.isNavOpen ? "85px" : "-85px")};
  width: 100%;
  box-shadow: 0px 5px 20px rgba(152, 152, 152, 0.24);
`;

const NavLinkList = styled.div`
  width: 1360px;
  height: 85px;
  margin: 0 auto;
  display: flex;
  align-items: end;
  list-style: none;
`;

const NavListItems = styled.li`
  flex-grow: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 0 10px 50px;
  &:hover {
    background-color: #eef1ff;
    border-bottom: 5px solid #657bf8;
  }
`;

const StyledNavLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px 0 10px;
  text-decoration-line: none;
  color: black;
  > p {
    margin-left: 15px;
  }
  &:hover {
    background-color: #eef1ff;
    border-bottom: 5px solid #657bf8;
  }
  &.active {
    color: #4d68ff;
  }
`;

export default function NavBar() {
  const isNavOpen = useAppSelector((state) => state.NavOpen.value);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(navClose());
  }, [router.pathname]);

  return (
    <NavContainer isNavOpen={isNavOpen}>
      <NavLinkList>
        <IconContext.Provider value={{ size: "2rem" }}>
          <StyledNavLink href={"/"}>
            <IoIosWine />
            <p>정규 레시피</p>
          </StyledNavLink>
          <StyledNavLink href={"/custom"}>
            <IoMdHeart />
            <p>커스텀 레시피</p>
          </StyledNavLink>
          <StyledNavLink href={"/recommendation"}>
            <IoMdPeople />
            <p>레시피 추천</p>
          </StyledNavLink>
          <StyledNavLink href={"/registration"}>
            <IoMdCreate />
            <p>레시피 등록하기</p>
          </StyledNavLink>
        </IconContext.Provider>
      </NavLinkList>
    </NavContainer>
  );
}
