import {
  Directory,
  DirectoryBackground,
  DirectoryItemBody,
} from "./directory-item.styles.jsx";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category: { title, imageUrl, url } }) => {
  const navigate = useNavigate();
  const navigateHandler = () => {
    navigate(`/${url}`);
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
