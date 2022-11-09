export const selectCategories = (state) => {
  console.info("This is the state when this ran");
  console.table(state);
  return state.categories.categories.reduce((acc, category) => {
    const { items, title } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
};
