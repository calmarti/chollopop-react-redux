import React from 'react';

import { getTags } from '../service';
import { CheckboxGroup } from '../../common';

function SelectTags(props) {
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    getTags().then(setTags);
  }, []);

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
