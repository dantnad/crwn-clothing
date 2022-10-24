import { DirectoryContainer } from "./directory.styles.jsx";
import DirectoryItem from "../directory-item/directory-item.component";

const Categories = ({ categories }) => {
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
};

export default Categories;
