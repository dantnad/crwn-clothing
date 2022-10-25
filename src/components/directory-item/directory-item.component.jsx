import {
  Directory,
  DirectoryBackground,
  DirectoryItemBody,
} from "./directory-item.styles.jsx";

const DirectoryItem = ({ category: { title, imageUrl } }) => {
  return (
    <Directory>
      <DirectoryBackground imageUrl={imageUrl} />
      <DirectoryItemBody>
        <h2>{title}</h2>
        <p>Shop now</p>
      </DirectoryItemBody>
    </Directory>
  );
};

export default DirectoryItem;
