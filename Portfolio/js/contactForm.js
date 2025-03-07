const EMAIL_REGEX = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const TEL_REGEX = /^(?:\+84|0)(3|5|7|8|9)[0-9]{8}$/;

document
  .querySelector("#contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;
    const fields = document.querySelectorAll(".form-field");

    fields.forEach((field) => {
      const input = field.querySelector("input, select, textarea");

      const inputValue = input.value.trim();

      if (!inputValue) {
        setError(input, "This field is required");
        isValid = false;
      } else if (input.type === "email" && !isValidEmail(inputValue)) {
        setError(input, "Invalid email format");
        isValid = false;
      } else if (input.type === "tel" && !isValidTel(inputValue)) {
        setError(input, "Invalid phone number");
        isValid = false;
      }

      input.addEventListener("input", function () {
        const inputValue = input.value.trim();
        if (!inputValue) {
          setError(input, "This field is required");
        } else if (input.type === "email") {
          if (EMAIL_REGEX.test(inputValue)) {
            setError(input, "");
          } else {
            setError(input, "Invalid email format");
          }
        } else if (input.type === "tel") {
          if (TEL_REGEX.test(inputValue)) {
            setError(input, "");
          } else {
            setError(input, "Invalid phone number");
          }
        } else {
          setError(input, "");
        }
      });
    });

    if (isValid) {
      const valueOfForm = {};
      fields.forEach((field) => {
        const input = field.querySelector("input, select, textarea");
        valueOfForm[input.name] = input.value;
      });
      console.log("Form submitted successfully: ", valueOfForm);
      clearData(fields);
    }
  });

const setError = (input, message) => {
  const errorElement = input.parentElement.querySelector(".form-field-error");
  errorElement.textContent = message;
};

const clearData = (fields) => {
  fields.forEach((field) => {
    const input = field.querySelector("input, select, textarea");
    input.value = "";
  });
};

const isValidEmail = (email) => EMAIL_REGEX.test(email);
const isValidTel = (tel) => TEL_REGEX.test(tel);

document.addEventListener("DOMContentLoaded", function () {
  const select = document.querySelector("select[name='service']");

  const updateSelectColor = () => {
    if (select.value === "") {
      select.style.color = "var(--white-dark-hover)";
    } else {
      select.style.color = "var(--white-normal)";
    }
  };

  updateSelectColor();

  select.addEventListener("change", updateSelectColor);
});
