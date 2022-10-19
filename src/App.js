import categories from "./categories";
import Categories from "./components/categories/categories.component";

const App = () => {
  return (
    <div className="app">
      <Categories categories={categories} />
    </div>
  );
};

export default App;
