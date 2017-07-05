import React, { PropTypes, Component } from 'react';


/**
 * Represents Text Inpunt
 *
 * @class CustomTextInput
 * @extends {Component}
 */
class CustomTextInput extends Component {


  /**
   * Creates an instance of this class and set
   * the inputClassName and errorMessage with empty
   * String
   *
   * @memberOf InputComponent
   */
  constructor() {
    super();

    this.state = {
      inputClassName: '',
      errorMessage: '',
    };
  }

  /**
   * Sets className and errorMessage state
   *
   * @param {Object} prop
   *
   * @memberOf InputComponent
   */
  componentWillReceiveProps(porp) {
    if (porp.inputError) {
      this.setState({
        inputClassName: 'input-error',
        errorMessage: this.props.errorMessage,
      });
    } else {
      this.setState({ inputClassName: '', errorMessage: '' });
    }
  }


  /**
   * Renders the component
   *
   * @returns {ReactElement}
   *
   * @memberOf InputComponent
   */
  render() {
    const labelClass = this.props.value ? 'active' : '';

    return (
      <div className={`input-field col ${this.props.newClass}`}>
        <input
          id={this.props.id}
          type={this.props.type}
          ref={this.props.name}
          name={this.props.name}
          value={this.props.value}
          onKeyUp={this.props.validateFunction}
          className={`validate ${this.state.inputClassName}`}
          onChange={this.props.onChangeEvent}
          required
        />
        <label
          className={labelClass}
          htmlFor={this.props.id}
        >
          {this.props.label}
        </label>
        <span className="error-span">{this.state.errorMessage}</span>
      </div>
    );
  }
}
CustomTextInput.defaultProps = {
  newClass: PropTypes.string,
  errorMessage: PropTypes.string,
  validateFunction: PropTypes.func,
  value: PropTypes.string,
};

CustomTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChangeEvent: PropTypes.func.isRequired,
  newClass: PropTypes.string,
  errorMessage: PropTypes.string,
  validateFunction: PropTypes.func,
  value: PropTypes.string,
};

export default CustomTextInput;
