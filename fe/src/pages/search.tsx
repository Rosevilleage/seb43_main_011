import { RecipesContainer } from ".";
// import { useSearchParams } from "react-router-dom";
import SearchResultTab from "../components/card/SearchResultsTab";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import SearchedRecipe from "../components/card/SearchedRecipe";
import RecipePagination from "../components/card/RecipePagination";
import { useSearchedPagination } from "../hooks/useSearchedPagination";
import LoadingComponent from "../components/loading/LoadingComponent";
import { useQueryClient } from "react-query";
// import doNotHave from "../images/doNothaveRecipe.png";

const CardListArea = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
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
  > p {
    font-size: 1.5rem;
  }
`;

const DoNotHaveImage = styled.img`
  width: 400px;
`;

export default function SearchResults() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("value") ?? "";
  const category = useMemo(() => ["regular", "custom"], []);
  const [path, setPath] = useState(category[0]);
  useEffect(() => {
    queryClient.clear();
  }, []);
  const { data, isLoading, isPreviousData, hasMore, onNextClick, onPrevClick } =
    useSearchedPagination(path, searchValue);
  const currentTab = path === "regular" ? "정규" : "커스텀";
  const anotherTab = path === "regular" ? "커스텀" : "정규";

  return (
    <RecipesContainer>
      <SearchResultTab tabs={category} path={path} setPath={setPath} />
      {isLoading && <LoadingComponent />}
      {data?.data.length === 0 && (
        <NoneSearchedBox>
          <DoNotHaveImage src={doNotHave} />
          <h1>검색 결과에 해당하는 {currentTab} 레시피가 존재하지 않습니다.</h1>
          <p>{anotherTab} 레시피를 확인해 보세요</p>
        </NoneSearchedBox>
      )}
      <CardListArea>
        {!isLoading &&
          data?.data.map((card, i) => {
            return <SearchedRecipe key={i} recipe={card} category={path} />;
          })}
      </CardListArea>
      {!isLoading && data?.pageInfo && data.pageInfo.totalPage > 1 && (
        <RecipePagination
          pageInfo={data?.pageInfo}
          hasMore={!!hasMore}
          isPreviousData={isPreviousData}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
      )}
    </RecipesContainer>
  );
}
