import React from 'react';
import T from 'prop-types';
import SelectTags from '../SelectTags';

const canSubmit = ({ name, price, tags }) =>
  [
    // valid name
    !!name,
    // valid price
    !Number.isNaN(price) && Number.isFinite(price) && price >= 0,
    // valid tags
    !!tags.length,
  ].every(validation => validation); // all validations pass

function NewAdvertForm({ onSubmit }) {
  const [advert, setAdvert] = React.useState({
    name: '',
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  });
  const { name, sale, price, tags } = advert;

  const handleChange = ev => {
    setAdvert(oldAdvert => ({
      ...oldAdvert,
      [ev.target.name]:
        ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value,
    }));
  };

  const handleChangeNumber = ev => {
    handleChange({
      target: {
        name: ev.target.name,
        value: Number(ev.target.value),
      },
    });
  };

  const handleChangeSelectMultiple = values => ev => {
    const selectedValue = ev.target.value;
    handleChange({
      target: {
        name: ev.target.name,
        value: values.includes(selectedValue)
          ? values.filter(tag => tag !== selectedValue)
          : [...values, selectedValue],
      },
    });
  };

  const handleChangeFile = ev => {
    const file = ev.target.files[0] || null;
    handleChange({
      target: {
        name: ev.target.name,
        value: file,
      },
    });
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    onSubmit(advert);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={handleChange} />
      <input
        type="checkbox"
        name="sale"
        checked={sale}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        value={price}
        onChange={handleChangeNumber}
      />
      <SelectTags
        multiple
        name="tags"
        value={tags}
        onChange={handleChangeSelectMultiple(tags)}
      />
      <input type="file" name="photo" onChange={handleChangeFile} />
      <button disabled={!canSubmit(advert)}>Save</button>
    </form>
  );
}

NewAdvertForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default NewAdvertForm;
