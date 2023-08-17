const InputField = ({ type, placeholder, value, onChange }) => (
  <label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </label>
);
export default InputField;
