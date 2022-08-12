export const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => {
    return (
      <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
        {options.map(({ value, name }) =>
          <option value={value} selected={value === selectedValue}>{name}</option>
        )}
      </select>
    );
  }
  