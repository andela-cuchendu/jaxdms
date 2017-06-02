import React, {PropTypes, Component} from 'react';


/**
 * Represents the Input element
 * @class InputComponent
 * @extends {Component}
 */
class InputComponent extends Component {


  /**
   * Creates an instance of InputComponent and set
   * the inputClassName and errorMessage with empty
   * String
   * 
   * @memberOf InputComponent
   */
  constructor() {
    super();

    this.state = {
      inputClassName: '',
      errorMessage: ''
    };
  }


  /**
   * Sets className and errorMessage state 
   * 
   * @param {any} porp
   * @return {void}
   * 
   * @memberOf InputComponent
   */
  componentWillReceiveProps(porp) {
    if (porp.inputError) {
      this.setState({
        inputClassName: 'input-error',
        errorMessage: this.props.errorMessage
      });
    } else {
      this.setState({inputClassName: '', errorMessage: ''});
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
          required/>
        <label
          className={labelClass}
          htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <span className='error-span'>{this.state.errorMessage}</span>
      </div>
    );
  }
}

InputComponent.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChangeEvent: PropTypes.func.isRequired,
  newClass: PropTypes.string,
  errorMessage: PropTypes.string,
  validateFunction: PropTypes.func,
  value: PropTypes.string,
  inputError: PropTypes.bool
};

export default InputComponent;