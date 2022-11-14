import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesReducer = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categories) =>
    categories.reduce((acc, category) => {
      const { items, title } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
