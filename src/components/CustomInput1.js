import React from "react";

const CustomInput = (props) => {
  const { type, label, i_id, i_class, name, val, onCh, onBlr } = props;
  return (
    <div className="">

      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBlr}
      />
    </div>
  );
};

export default CustomInput;