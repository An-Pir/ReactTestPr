const Input = ({
  onChange,
  type,
  value,
  placeholder,
  checked,
  className='',
}) => {
  return (
    <input
      onChange={onChange}
      type={type}
      value={value}
      placeholder={placeholder}
      checked={checked}
      className={`border focus:outline-none focus:border-orange border-light-blue text-dark-blue placeholder:text-gray-300 rounded-lg p-2 w-74 ${className}`}
    />
  );
};

export default Input;
