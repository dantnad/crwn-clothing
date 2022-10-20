import categories from "./categories";
import Directory from "./components/directory/directory.component";

const App = () => {
  return (
    <div className="app">
      <Directory categories={categories} />
    </div>
  );
};

export default App;
