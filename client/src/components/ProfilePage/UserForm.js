<<<<<<< HEAD
import React from 'react';
import Input from '../UI/Form/Input';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  showError: false
};

class UserForm extends React.Component {
  state = initialState;

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  hasError = err => err;

  handleSubmit = event => {
    event.preventDefault();
    const hasError = this.hasError();
    const { email, fullName, phone } = this.state;
    const data = { email, fullName, phone };

    // Check if the form has error
    const dataIsEmpty = Object.values(data).includes('');

    if (hasError || dataIsEmpty) {
      this.setState({ showError: true });
    }

    if (!hasError && !dataIsEmpty) {
      const payload = { method: 'POST', body: JSON.stringify(data) };

      fetch('/admin/myprofile', payload)
        .then(res => console.log(res))
        .catch(err => console.log(err));
      console.log('SEND DATA', data);

      // Reset Form field
      this.setState(initialState);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          label='Full Name'
          placeholder='John Doe'
          name='fullName'
          type='text'
          showError={this.state.showError}
          hasError={this.hasError}
          onChange={this.handleChange}
          value={this.state.fullName}
        />

        <Input
          label='Email'
          placeholder='john.doe@mail.com'
          name='email'
          type='email'
          showError={this.state.showError}
          hasError={this.hasError}
          onChange={this.handleChange}
          value={this.state.email}
        />

        <Input
          label='Phone'
          placeholder='123 456-7890'
          name='phone'
          type='tel'
          showError={this.state.showError}
          hasError={this.hasError}
          onChange={this.handleChange}
          value={this.state.phone}
        />

        <button type='submit'>Create New User</button>
      </form>
    );
  }
}

export default UserForm;
=======
import React from 'react';
import Input from '../UI/Form/Input';
import errorFormHandler from '../../utils/errorFormHandler';
import isFormValid from '../../utils/isFormValid';
import Button from '../UI/Generic/Button';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  showErrors: false,
  formErrors: false
};

class UserForm extends React.Component {
  state = initialState;

  handleChange = e => {
    const { name, type, value } = e.target;

    this.setState({
      [name]: value,
      formErrors: {
        ...this.state.formErrors,
        [name]: errorFormHandler(type, value)
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, formErrors, fullName, phone } = this.state;
    const dataForm = { email, fullName, phone };
    const isValid = isFormValid(formErrors, dataForm);

    isValid
      ? this.handleSendForm(dataForm)
      : this.setState({ showErrors: true });
  };

  handleSendForm = dataForm => {
    const payload = { method: 'POST', body: JSON.stringify(dataForm) };

    fetch('/admin/myprofile', payload)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log('SEND DATA', dataForm);

    // Reset Form field
    this.setState(initialState);
  };

  render() {
    const { email, formErrors, fullName, phone, showErrors } = this.state;
    const hasErrors = showErrors && formErrors;

    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          label='Full Name'
          placeholder='John Doe'
          name='fullName'
          type='text'
          onChange={this.handleChange}
          value={fullName}
          error={hasErrors ? formErrors.fullName : null}
        />

        <Input
          label='Email'
          placeholder='john.doe@mail.com'
          name='email'
          type='email'
          onChange={this.handleChange}
          value={email}
          error={hasErrors ? formErrors.email : null}
        />

        <Input
          label='Phone'
          placeholder='123-456-7890'
          name='phone'
          type='tel'
          onChange={this.handleChange}
          value={phone}
          error={hasErrors ? formErrors.phone : null}
        />

        <Button name='Create New User'/>
      </form>
    );
  }
}

export default UserForm;
>>>>>>> master
