import categories from "../../categories.json";
import Directory from "../../components/directory/directory.component";

const Home = () => {
  return (
    <div className="app">
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
