import {getValueByType , defaultGetValue } from '../../hooks/useForm'; 
 

const Input = (type, name, value, onChange) => {
  return (
    <input type={type} name={name} value={value} onChange={onChange}></input>
  );
};
