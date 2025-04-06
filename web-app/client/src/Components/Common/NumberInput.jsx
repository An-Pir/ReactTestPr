

const NumberInput = ({ value, onChange, placeholder, className = '', ...rest }) => {

  // Функция форматирования: удаляет все нецифровые символы и вставляет пробелы каждые 3 цифры
  const formatNumber = (numStr) => {
    const cleaned = numStr.replace(/\D/g, '');
    if (!cleaned) return '';
    return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const handleChange = (e) => {
    // Убираем все символы, кроме цифр
    const cleaned = e.target.value.replace(/\D/g, '');
    onChange(cleaned);
  };
  return (
    <input
    {...rest}
      type='text'
      value={formatNumber(value)}
      onChange={handleChange}
      placeholder={placeholder}
      className={`border focus:outline-none focus:border-orange border-light-blue text-dark-blue placeholder:text-gray-300 rounded-lg p-2 w-74 ${className}`}
    />
  );
};

export default NumberInput;
