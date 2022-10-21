import categories from "../../categories";
import Directory from "../../components/directory/directory.component";

const Home = () => {
  return (
    <div className="app">
      <Directory categories={categories} />
    </div>
  );
};

export default Home;
