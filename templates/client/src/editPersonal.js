import '~/editPersonal.css';
import {components, utils} from 'metronic-extension';
import UserApi from '~/api/UserApi';

function initValidation() {
  validation = new components.Validation(ref.personalForm.get(0), {
    'user[email]': {
      validators: {
        notEmpty: {message: 'Email is required.'},
        emailAddress: {message: 'Email is incorrect.'},
        remote: {
          url: '/api/users/email-exists',
          method: 'GET',
          data: () => ({excludeUserId: globalThis.$$session.id}),
          message: 'This email is in use by another user.'
        }
      }
    },
    'user[name]': {
      validators: {
        notEmpty: {message: 'Name is required.'}
      }
    },
    'user[password]': {
      validators: {
        notEmpty: {
          message: 'Password is required.',
          enabled: false
        },
        regexp: {
          regexp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-\.])[a-z\d@$!%*?&\-\.]{8,}$/i,
          message: 'Alphanumeric symbols (@$!%*?&-.) Please enter at least 8 characters with a mix of.',
          enabled: false
        },
        remote: {
          url: '/api/users/password-security-check',
          method: 'GET',
          message: 'The same string as the current password and email cannot be used.',
          enabled: false
        }
      }
    }
  });
}

function initForm() {
  validation.onValid(async () => {
    try {
      validation.onIndicator();
      const {data} = await userApi.updateProfile(new FormData(validation.form));
      validation.offIndicator();
      if (data.error)
        if (data.error === 'NotFoundError') {
          await components.Dialog.warning('The account you are using has been deleted and you will be forcibly logged out.');
          return void userApi.logout();
        } else
          throw Error('Unknown error');
      components.Toast.success('Profile Settings have been updated.');
      const currentEmail = utils.trim(ref.user.email.val(), true);
      if (originalEmail !== currentEmail) {
        await components.Dialog.info('Email address has been changed. Please re-login.');
        return void userApi.logout();
      }
    } catch (error) {
      validation.offIndicator();
      components.Dialog.unknownError();
      throw error;
    }
  });
  ref.personalForm
    .on('show.bs.collapse hide.bs.collapse', '#passwordCollapse', evnt => {
      if (evnt.type === 'show') {
        validation.enableValidator('user[password]');
        ref.user.password.prop('disabled', false);
      } else {
        validation.disableValidator('user[password]');
        ref.user.password.prop('disabled', true);
      }
    })
    .on('click', '[data-on-toggle-password-visibility]', evnt => {
      const span = $(evnt.currentTarget)      
      if (ref.user.password.attr('type') === 'password') {
        ref.user.password.attr('type', 'text');
        span.find('.bi-eye').removeClass('d-none');
        span.find('.bi-eye-slash').addClass('d-none');
      } else {
        ref.user.password.attr('type', 'password');
        span.find('.bi-eye').addClass('d-none');
        span.find('.bi-eye-slash').removeClass('d-none');
      }
    });
  new components.ImageInput(ref.imageInput.get(0), {
    current: `${ref.user.iconPath.val()}?${ref.user.modified.val()}`,
    default: '/build/media/misc/users-default-icon.svg',
    hiddenEl: ref.user.icon.get(0)
  });
}

const userApi = new UserApi();
const ref = components.selectRef('#kt_app_content_container');
const originalEmail = utils.trim(ref.user.email.val(), true);
let validation;
initValidation();
initForm();