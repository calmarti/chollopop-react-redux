import React from 'react';
import T from 'prop-types';

import { Link } from 'react-router-dom';

function EmptyList({ isFiltered }) {
  return (
    <div>
      {isFiltered ? (
        'Refine your search'
      ) : (
        <Link to="/adverts/new">Create the first advert</Link>
      )}
    </div>
  );
}

EmptyList.propTypes = {
  isFiltered: T.bool,
};

EmptyList.defaultProps = {
  isFiltered: false,
};

export default EmptyList;
