import { DirectoryContainer } from "./directory.styles.jsx";
import categories from "../../categories.json";
import DirectoryItem from "../directory-item/directory-item.component";

const Categories = () => {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem
          key={category.id}
          category={category}
          route={`/${category.title.toLowerCase()}`}
        />
      ))}
    </DirectoryContainer>
  );
};

export default Categories;
