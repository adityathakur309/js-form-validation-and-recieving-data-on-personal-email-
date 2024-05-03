let userName = document.getElementById("name");
let form = document.querySelector("form");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let password = document.getElementById("password");
let c_password = document.getElementById("c-password");

// Function to send data
let sendData = (a, b) => {
    if (a === b) { 
        Email.send({
            Host : "smtp.elasticemail.com",
            Username : "rajputru690@gmail.com",
            Password : "2F67E693AD11AA20F5C1DC2A88F02E3BC638",
            To : 'rajputru690@gmail.com',
            From : "rajputru690@gmail.com",
            Subject : "Contact form",
            Body :"Name: " +document.getElementById("name").value+
            "<br> Email: " + document.getElementById("email").value+
            "<br> Phone number " + document.getElementById("phone").value
        }).then(
          message => {
            if(message === "OK"){ 
                Swal.fire({
                    title: "Great Job!",
                    text: "Your form has been submitted!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Something went wrong",
                    text: "Your form has not been submitted!",
                    icon: "error"
                });
            }
          }
        );
        return true;
    }
}

// Function to check if all inputs have the "success" class
let getSuccess = () => {
    let inputAll = document.getElementsByClassName("input");
    let count = 0;
    for (let i = 0; i < inputAll.length; i++) {
        if (inputAll[i].classList.contains("success")) {
            count++;
        }
    }
    sendData(inputAll.length - 1, count);
}

// Function for form validation
let validation = () => {
    let nameValue = userName.value.trim();
    let phoneValue = phone.value.trim();
    let emailValue = email.value.trim();
    let passwordValue = password.value.trim();
    let cpasswordValue = c_password.value.trim();
    let test = true;

    // Name validation 
    if (nameValue === "") {
        setErrorMessage(userName, "Please enter a name");
        test = false;
    } else if (nameValue.length <= 3) {
        setErrorMessage(userName, "Name should be minimum 4 characters");
        test = false;
    } else {
        setSuccessMessage(userName);
    }

    // Email validation 
    if (emailValue === "") {
        setErrorMessage(email, "Please enter your email address");
        test = false;
    } else if (!validEmail(emailValue)) {
        setErrorMessage(email, "Please enter a valid email address");
        test = false;
    } else {
        setSuccessMessage(email);
    }

    // Phone validation 
    if (phoneValue === "") {
        setErrorMessage(phone, "Please enter your phone number");
        test = false;
    } else if (phoneValue.length != 10) {
        setErrorMessage(phone, "Phone number should be 10 digits");
        test = false;
    } else {
        setSuccessMessage(phone);
    }

    // Password validation 
    if (passwordValue === "") {
        setErrorMessage(password, "Please enter your password");
        test = false;
    } else if (passwordValue.length != 6) {
        setErrorMessage(password, "Password should be 6 characters");
        test = false;
    } else {
        setSuccessMessage(password);
    }

    // Confirm password validation 
    if (cpasswordValue === "") {
        setErrorMessage(c_password, "Please enter your confirm password");
        test = false;
    } else if (cpasswordValue != passwordValue) {
        setErrorMessage(c_password, "Passwords do not match");
        test = false;
    } else {
        setSuccessMessage(c_password);
    }

    // Check for success
    if (test) {
        getSuccess();
        return true;
    } else {
        return false;
    }
}

// Function to set error message
function setErrorMessage(input, message) {
    let parentInput = input.parentElement;
    let small = parentInput.querySelector("small");
    small.innerText = message;
    parentInput.className = "input error";
}

// Function to set success message
function setSuccessMessage(input) {
    let parentInput = input.parentElement;
    parentInput.className = "input success";
}

// Function to validate email
function validEmail(emailValue) {
    let atSymbol = emailValue.indexOf("@");
    let dot = emailValue.lastIndexOf(".");
    if (atSymbol < 1 || dot <= atSymbol + 2 || dot == emailValue.length - 1) {
        return false;
    }
    return true;
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    validation();
});
