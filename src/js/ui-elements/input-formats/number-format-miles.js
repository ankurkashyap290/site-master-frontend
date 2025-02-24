import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

function NumberFormatMiles(props) {
  const {
    inputRef, onChange, ...other
  } = props;

  return (
    <NumberFormat
      {...other}
      ref={inputRef}
      onValueChange={(values) => {
        if (typeof onChange === 'function') {
          onChange({
            target: {
              value: values.value,
            },
          });
        }
      }}
      thousandSeparator
      decimalScale={0}
    />
  );
}

NumberFormatMiles.defaultProps = {
  inputRef: null,
  onChange: null,
};

NumberFormatMiles.propTypes = {
  inputRef: PropTypes.func,
  onChange: PropTypes.func,
};

export default NumberFormatMiles;
