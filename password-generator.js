const pwOutput = document.querySelector("#pw-output");
const pwGenBtn = document.querySelector("#pw-generate-btn");
const pwLength = document.querySelector("#pw-length");
const copyToCb = document.querySelector("#copyToCb");
const toastContainer = document.querySelector("#toastContainer");
const toastText = document.querySelector("#toast-text");

const uppercaseCheck = document.querySelector("#uppercaseCheck");
const lowercaseCheck = document.querySelector("#lowercaseCheck");
const symbolsCheck = document.querySelector("#symbolsCheck");

const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!"£$%^&*()_+~#:;/.<>\|';

// 1. Math.random() returns random number between 0 and 1.
// 2. We need to times this random number by the lenght of the items
// 3. This will then give us a number to place as the index position
// within the string of characters/numbers/symbols.
// Repeat for below
function getUppercaseLetters() {
    return uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)];
}

function getLowercaseLetters() {
    return lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)];
}

function getNumbers() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbols() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function getPasswordLength() {
    return pwLength.value;
}

function copyToClipboard(e) {
    e.preventDefault();
    console.log(pwOutput.value)

    if (pwOutput.value === null || pwOutput.value === undefined || pwOutput.value === "") {
        showToast("Nothing to copy...");
    } else {
        pwOutput.select();
        pwOutput.setSelectionRange(0, 99999);
        document.execCommand("copy");
    }
}

function outFunc() {
    const tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}

function generateX() {
    const xs = [];

    if (uppercaseCheck.checked) {
        xs.push(getUppercaseLetters());
    }

    if (lowercaseCheck.checked) {
        xs.push(getLowercaseLetters());
    }

    if (symbolsCheck.checked) {
        xs.push(getSymbols());
    }

    return xs[Math.floor(Math.random() * xs.length)];
}

function showToast(message) {
    toastText.innerHTML = message;
    toastContainer.classList.add("toast-show");
    setTimeout(() => {
        toastContainer.classList.remove("toast-show");
    }, 2000);
}

function generatePassword(e) {
    e.preventDefault();
    // 1. Clear previous value
    pwOutput.value = '';

    // 2. Get pw length
    pwSetLength = getPasswordLength();

    // 3. Create empty pw array
    let password = [];

    // 4. Check if at least one checkbox is checked
    let checkboxArr = [];
    const checkboxList = document.querySelectorAll(".pw-checkbox");
    checkboxList.forEach(checkbox => {
        console.log(checkbox);
        if (checkbox.checked) {
            checkboxArr.push(checkbox);
        }
    });

   if (checkboxArr.length < 1) {
        showToast("Check at least one option");
   } else {
    // 5. Run the generate password functions
    for (let index = 0; index < pwSetLength; index++) {
        const x = generateX();
        password += x;
    }

    // Output returned password
    pwOutput.value = password;
   }

}

pwGenBtn.addEventListener('click', generatePassword);
copyToCb.addEventListener('click', copyToClipboard);
