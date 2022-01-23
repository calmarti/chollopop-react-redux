import React, { useEffect } from "react";
import { CheckboxGroup } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { tagsSelector } from "../../../store/selectors";
import { loadTags } from "../../../store/actions";

function SelectTags(props) {

  const dispatch = useDispatch();
  const tags = useSelector(tagsSelector);
  
  useEffect(() => {

    dispatch(loadTags());
  }, [dispatch]);

  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
