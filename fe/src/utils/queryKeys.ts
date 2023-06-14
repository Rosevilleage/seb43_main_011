export const QUERY_KEY = {
  getCardsByAlcoholLevelKey: (level: string, page = 1, size = 5) => [
    level,
    page,
    size,
  ],
  getDetailRecipeKey: (category: string, page = 1, size = 5) => [
    "recipe",
    category,
    page,
    size,
  ],
  getCustomCardsKey: (category: string, page = 1, size = 20) => [
    category,
    page,
    size,
  ],
};

export const ALCOHOL_LEVEL_LIST = ["0", "1", "10", "20", "30"];

export const getFetchSize = (path: string) => {
  switch (path) {
    case "bookmark":
      return 16;
    case "custom":
      return 20;
    default:
      return 5;
  }
};
