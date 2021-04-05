import T from 'prop-types';

import SelectTags from '../SelectTags';
import { RadioGroup, SelectRange } from '../../shared';
import { advert } from '../propTypes';
import { saleFilter } from './filters';

function FiltersForm({ onChange, onReset, name, sale, price, tags, prices }) {
  const handleReset = ev => {
    ev.preventDefault();
    onReset();
  };

  return (
    <form onReset={handleReset}>
      Filters
      <input name="name" value={name} onChange={onChange} />
      <RadioGroup
        options={Object.values(saleFilter)}
        name="sale"
        value={sale}
        onChange={onChange}
      />
      <SelectRange
        min={Math.min(...prices)}
        max={Math.max(...prices)}
        value={price}
        name="price"
        onChange={onChange}
      />
      <SelectTags multiple name="tags" value={tags} onChange={onChange} />
      <input type="reset" value="Reset" />
    </form>
  );
}

FiltersForm.propTypes = {
  ...advert,
  sale: T.oneOf(Object.keys(saleFilter)).isRequired,
  price: T.arrayOf(T.number.isRequired).isRequired,
  onChange: T.func.isRequired,
  onReset: T.func.isRequired,
  prices: T.arrayOf(T.number.isRequired).isRequired,
};

export default FiltersForm;
