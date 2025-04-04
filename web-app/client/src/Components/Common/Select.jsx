const Select = ({ options, value, onChange, className = '', ...props }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`border border-light-blue text-dark-blue focus:outline-none  p-2 rounded-lg focus:border-orange    ${className}`}
      {...props}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value} className=" text-dark-blue">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
