import { Fragment } from "react";
import categories from "../../categories.json";
import Directory from "../../components/directory/directory.component";

const Home = () => {
  return (
    <Fragment>
      <Directory categories={categories} />
    </Fragment>
  );
};

export default Home;
