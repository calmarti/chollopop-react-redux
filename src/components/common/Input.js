import {getValueByType , defaultGetValue } from '../../hooks/useForm'; 

const valueByType = (type) => {
    switch(type){
        case 'text':
            
         

    }
}

    checkbox: ({ checked }) => checked,
  
    number: ({ value }) => Number(value),
  
    'select-multiple': ({ selectedOptions }) =>
      [...selectedOptions].map(({ value }) => value),
  
    file: ({ files }) => files[0] || null,
  };

const Input = (type, name, onChange) => {
  return (
    <input type={type} name={name} value={valueByType} onChange={onChange}></input>
  );
};
