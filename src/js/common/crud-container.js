import React from 'react';

class CrudContainer extends React.Component {
  constructor(props) {
    super(props);
    this.setErrors = this.setErrors.bind(this);
    this.addError = this.addError.bind(this);
  }

  setErrors(errors) {
    const errorsDict = {};
    for (let i = 0; i < errors.length; i += 1) {
      Object.assign(errorsDict, { [errors[i].source.pointer]: errors[i] });
    }
    this.setState({ errors: errorsDict });
  }

  addError(error) {
    this.setState({
      errors: Object.assign({}, this.state.errors, { [error.source.pointer]: error }),
    });
  }
}

export default CrudContainer;
