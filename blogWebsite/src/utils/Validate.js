export const Validate = (values) => {
  const errors = {};

  var whiteSpaceRegex = /\s/;
  var nameRegex = /^[a-zA-Z ]{2,30}$/;
  var userNameRegex = /^[a-zA-Z\-]+$/;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  if (!values.name) {
    errors.name = "*name is required!";
  } else if (whiteSpaceRegex.test(values.name)) {
    errors.name = "*name wouldn't have whiteSpace";
  } else if (!nameRegex.test(values.name)) {
    errors.name = "*name wouldn't have numbers && special Characters";
  }

  if (!values.username) {
    errors.username = "*username is required!";
  } else if (whiteSpaceRegex.test(values.username)) {
    errors.username = "*username wouldn't have whiteSpace";
  } else if (userNameRegex.test(values.username)) {
    errors.username = "*username includes numbers && special Characters";
  }

  if (!values.email) {
    errors.email = "*Email is required!";
  } else if (whiteSpaceRegex.test(values.email)) {
    errors.email = "*email wouldn't have whiteSpace";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "*This is not a valid email format!";
  }

  var phonRegex = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}/;
  if (!values.tel) {
    errors.tel = "*password is required!";
  } 
  // else if (whiteSpaceRegex.test(values.tel)) {
  //   errors.tel = "*email wouldn't have whiteSpace";
  // } else if (phonRegex.test(values.tel)) {
  //   errors.tel = "*This is not a valid email format!";
  // }

  if (!values.password) {
    errors.password = "*Password is required";
  } else if (whiteSpaceRegex.test(values.password)) {
    errors.password = "*password wouldn't have whiteSpace";
  } else if (values.password.length < 8) {
    errors.password = "*Password must be more than 8 characters";
  } else if (values.password.length > 10) {
    errors.password = "*Password cannot exceed more than 10 characters";
  }

  return errors;
};
