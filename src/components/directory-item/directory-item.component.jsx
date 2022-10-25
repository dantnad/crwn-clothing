import {
  Directory,
  DirectoryBackground,
  DirectoryItemBody,
} from "./directory-item.styles.jsx";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category: { title, imageUrl }, route }) => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`/shop${route}`);
  };

  return (
    <Directory onClick={navigateHandler}>
      <DirectoryBackground imageUrl={imageUrl} />
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p>Shop now</p>
      </DirectoryItemBody>
    </Directory>
  );
};

export default DirectoryItem;
