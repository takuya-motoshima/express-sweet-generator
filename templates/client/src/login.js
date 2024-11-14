import '~/login.css';
import {components} from 'metronic-extension';
import UserApi from '~/api/UserApi';

function initValidation() {
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

function initForm() {
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
const ref = components.selectRef();
let validation;
initValidation();
initForm();