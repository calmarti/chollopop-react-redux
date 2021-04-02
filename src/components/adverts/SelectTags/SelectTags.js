import React from 'react';

import { getTags } from '../../../api/adverts';

function SelectTags(props) {
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    getTags().then(setTags);
  }, []);

  return (
    <select {...props}>
      {tags.map(tag => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
}

export default SelectTags;
