import React from 'react';

import { getTags } from '../service';
import { CheckboxGroup } from '../../common';
import useQuery from '../../../hooks/useQuery';

function SelectTags(props) {

  //TODO: llevar a redux la llamada al api de tags 
  const { data: tags = [] } = useQuery(getTags);
  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
