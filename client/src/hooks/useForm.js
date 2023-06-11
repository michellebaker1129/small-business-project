import { useState } from "react";

const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // TODO get this to work
  // Clear form
  const clearForm = () => {
    setValues(initialState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await callback();
    clearForm(); // wasnt here before
  };

  return {
    onChange,
    onSubmit,
    values,
    clearForm,
  };
};

export default useForm;