import {components} from 'metronic-extension';
import UserApi from '~/api/UserApi';
import '~/login.css';

/**
 * Initializes form validation.
 */
const initValidation = () => {
  validation = new components.Validation(ref.loginForm.get(0), {
    email: {
      validators: {
        notEmpty: {message: 'Email is required.'},
        emailAddress: {message: 'Enter your email correctly.'},
        userNotFound: {message: 'Account not found.'}
      }
    },
    password: {
      validators: {
        notEmpty: {message: 'Password is required.'}
      }
    }
  });
}

/**
 * Handles form events.
 */
const handleForm = () => {
  validation.onValid(async () => {
    try {
      validation.onIndicator();
      const {data} = await userApi.login(new FormData(validation.form));
      validation.offIndicator();
      if (!data)
        return void validation.setError('email', 'userNotFound');
      location.href = '/';
    } catch (error) {
      validation.offIndicator();
      components.Dialog.unknownError();
      throw error;
    }
  });
}

const userApi = new UserApi();

// Get references to elements with data-ref attributes.
const ref = components.selectRef();

// Initializes form validation.
let validation;
initValidation();

// Handles form events.
handleForm();