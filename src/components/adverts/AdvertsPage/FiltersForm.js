import T from "prop-types";

import useForm from "../../../hooks/useForm";
import SelectTags from "../SelectTags";
import { RadioGroup, SelectRange } from "../../common";
import { advert } from "../propTypes";
import { saleFilter } from "./filters";

function FiltersForm({ initialFilters, defaultFilters, prices, onFilter }) {
  const {
    formValue: filters,
    setFormValue,
    handleChange,
    } = useForm(initialFilters);


  const handleResetClick = () => {
    setFormValue(defaultFilters);
    onFilter(defaultFilters);
  };

  const { name, sale, price, tags } = filters;
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  const handleSubmit = (onFilter) => (ev) => {
    ev.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit(onFilter)}>
      <p>Filters</p>
      <input name="name" value={name} onChange={handleChange} />
      <RadioGroup
        options={Object.values(saleFilter)}
        name="sale"
        value={sale}
        onChange={handleChange}
      />
      <SelectRange
        min={min}
        max={max}
        value={price}
        name="price"
        onChange={handleChange}
        style={{ width: 400, margin: 24 }}
        marks={{ [min]: min, [max]: max }}
      />
      <SelectTags multiple name="tags" value={tags} onChange={handleChange} />
      <button type="submit">Filter</button>
      {<button onClick={handleResetClick}>Reset</button>}
    </form>
  );
}

const filtersProp = T.shape({
  ...advert,
  sale: T.oneOf(Object.keys(saleFilter)).isRequired,
  price: T.arrayOf(T.number.isRequired).isRequired,
});

FiltersForm.propTypes = {
  initialFilters: filtersProp.isRequired,
  defaultFilters: filtersProp.isRequired,
  onFilter: T.func.isRequired,
  prices: T.arrayOf(T.number.isRequired).isRequired,
};

export default FiltersForm;
