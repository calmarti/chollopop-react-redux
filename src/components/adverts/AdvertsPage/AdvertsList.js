import React from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';

function AdvertsList({ adverts }) {
  const renderAdvert = ({ id, ...advert }) => (
    <li key={id}>
      <Link to={`/adverts/${id}`}>{JSON.stringify(advert)}</Link>
    </li>
  );

  return <ul>{adverts.map(renderAdvert)}</ul>;
}

AdvertsList.propTypes = {
  adverts: T.arrayOf(T.shape({ id: T.string.isRequired }).isRequired)
    .isRequired,
};

export default AdvertsList;
