import styled from "styled-components";
import { RecipesContainer } from "..";
import Link from "next/link";
import Card from "../../components/card/Card";
import { RegularResponseData, getCustomCards } from "../../utils/query";
import RecipePagination from "../../components/card/RecipePagination";
import { QueryClient, dehydrate, useQuery } from "react-query";
import { QUERY_KEY, getFetchSize } from "../../utils/queryKeys";
import { useState } from "react";
import useMainRecipePagination from "../../hooks/useMainRecipePagination";
import Image from "next/image";

const CustomGuide = styled.div`
  display: flex;
`;

const RegistrationLink = styled(Link)`
  text-decoration-line: none;
  color: white;
  background-color: #96a5ff;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 5px 3px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: #5469de;
  }
`;

const GuideText = styled.div`
  width: max-content;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const CardsRow = styled.div`
  margin: 20px 0;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  place-items: center;
`;

const NoneSearchedBox = styled.div`
  width: 100%;
  min-height: 70vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 3rem;
`;

const PATH = "custom";

export default function CustomRecipes() {
  const [page, setPage] = useState(1);
  const size = getFetchSize(PATH);
  const { data } = useQuery<RegularResponseData>(
    QUERY_KEY.getCustomCardsKey(PATH, size),
    async () => await getCustomCards(PATH, page, size),
  );
  if (data) {
    const { hasMore, onNextClick, onPrevClick } = useMainRecipePagination(
      data.pageInfo,
      setPage,
    );
    if (!data.data) {
      return (
        <NoneSearchedBox>
          <Image
            src="/images/doNothaveRecipe.png"
            width={400}
            height={300}
            alt={""}
          />
          <h1>레시피가 존재하지 않습니다.</h1>
        </NoneSearchedBox>
      );
    }
    return (
      <RecipesContainer>
        <CustomGuide>
          <GuideText>커스텀 레시피</GuideText>
          <RegistrationLink href="/registration">
            레시피 등록하기
          </RegistrationLink>
        </CustomGuide>
        <CardsRow>
          {data?.data.map((recipe) => {
            return <Card key={recipe.id} recipe={recipe} category="custom" />;
          })}
        </CardsRow>
        {data?.pageInfo && data.pageInfo.totalPage > 1 && (
          <RecipePagination
            pageInfo={data.pageInfo}
            hasMore={hasMore}
            isPreviousData={data.pageInfo.totalPage > page}
            onNextClick={onNextClick}
            onPrevClick={onPrevClick}
          />
        )}
      </RecipesContainer>
    );
  }
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const size = getFetchSize(PATH);
  const initPage = 1;

  await queryClient.prefetchQuery(
    QUERY_KEY.getCustomCardsKey(PATH),
    async () => await getCustomCards(PATH, initPage, size),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
