const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const isRequiredvalid = checkRequired([username, email, password, confirmPassword])

    let isFormValid = isRequiredvalid;

    if (isRequiredvalid) {
        const isUsernameValid = checkLength(username, 3, 15);
        const isEmailValid = checkEmail(email);
        const isPasswordValid = checkLength(password, 6, 25);
        const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

        isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
    }

    if (isFormValid) {
        alert("Registration successful")
        form.reset()
        document.querySelectorAll(".form-group").forEach((group) => {
            group.className = "form-group";
        });
    }
})


function checkLength(input, min, max) {
    if (input.value.length < min) {
        showErr(input, `${input.id} must be at least ${min} charasters`)
        return false
    } else if (input.value.length > max) {
        showErr(input, `${input.id} must be less than ${max} characters.`);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

function checkEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email.value.trim())) {
        showSuccess(email);
        return true;
    } else {
        showErr(email, "Email is not valid");
        return false;
    }
}

function checkRequired(inputArr) {
    let isValid = true

    inputArr.forEach(ip => {
        if (ip.value.trim() === "") {
            showErr(ip, `${ip} is required`)
            isValid = false
        } else {
            showSuccess(ip)
        }
    })
    return isValid
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showErr(input2, "Passwords do not match");
        return false;
    }
    return true;
}


function showErr(input, message) {
    const formGroup = input.parentElement
    formGroup.className = "form-group error"
    const small = formGroup.querySelector("small")
    small.innerText = message
}

function showSuccess(input) {
    const formGroup = input.parentElement
    formGroup.className = "form-group success"
}