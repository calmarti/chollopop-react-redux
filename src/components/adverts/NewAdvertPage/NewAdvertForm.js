import T from "prop-types";

import useForm from "../../../hooks/useForm";
import { InputFile } from "../../common";
import SelectTags from "../SelectTags";
import { connect } from "react-redux";
import { createAdvert } from "../../../store/actions";


//TODO: llevar a redux la llamada al api de tags (coponente SelectTags)

const validName = ({ name }) => name;
const validPrice = ({ price }) =>
  !Number.isNaN(price) && Number.isFinite(price) && price >= 0;
const validTags = ({ tags }) => !!tags.length;

function NewAdvertForm({ onSubmit }) {
  const {
    formValue: advert,
    handleChange,
    // validate,
  } = useForm({
    name: "",
    sale: true,
    price: 0,
    tags: [],
    photo: null,
  });
  const { name, sale, price, tags } = advert;

  const handleSubmit = (onSubmit) => (ev) => {
    ev.preventDefault();
    onSubmit(advert);
  };

  const disabledButton = !name || !price || tags.length === 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" value={name} onChange={handleChange} />
      <input
        type="checkbox"
        name="sale"
        checked={sale}
        onChange={handleChange}
      />{" "}
      Sale
      <input type="number" name="price" value={price} onChange={handleChange} />
      <SelectTags name="tags" value={tags} onChange={handleChange} />
      <InputFile name="photo" onChange={handleChange} />
      <button
        disabled={
          disabledButton
        } /* disabled={!validate(validName, validPrice, validTags)} */
      >
        Save
      </button>
    </form>
  );
}

const mapDispatchtoProps = (dispatch, ownProps) => {
  return {
    onSubmit: (advert) => {
      dispatch(createAdvert(advert));
    },
  };
};

const connectedNewAdvertForm = connect(
  undefined,
  mapDispatchtoProps
)(NewAdvertForm);

NewAdvertForm.propTypes = {
  onSubmit: T.func.isRequired,
};

export default connectedNewAdvertForm;
