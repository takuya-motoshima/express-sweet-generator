/*Login page script*/

// Main processing.
// Form validation.
$('#form').validate({
  validClass: 'is-valid', 
  errorClass: 'is-invalid',
  errorElement: "div",
  errorPlacement: (error, element) => {
    $(element).after($(error).addClass('invalid-feedback'));
  },
  submitHandler: async (form, event) => {
    try {
      event.preventDefault();

      // Send an authentication request.
      const res = await $.ajax({
        type: 'POST',
        url: '/api/users/login',
        data: new FormData(form),
        contentType: false,
        processData: false
      });

      // If login fails.
      if (res.error)
        return void alert(res.error);

      // After logging in successfully, you will be taken to the top page.
      location.href = '/';
    } catch(e) {
      alert('An unexpected error has occurred.');
    }
  }
});