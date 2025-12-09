let passwordLength = 12;

//valeurs par défault des checkboxes
let includeUppercase = true;
let includeNumbers = false;
let includeSymbols = false;

//caractères utilisables pour chauqe option
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

//met à jour les options en fonction des checkboxes
function updateOptions() {
    const uppercaseCheckbox = document.getElementById('include-uppercase');
    const numbersCheckbox = document.getElementById('include-numbers');
    const symbolsCheckbox = document.getElementById('include-symbols');

//permet de metter à jour les variables globales
    includeUppercase = uppercaseCheckbox.checked;
    includeNumbers = numbersCheckbox.checked;
    includeSymbols = symbolsCheckbox.checked;
}

function checkPasswordStrength(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

    const optionsCount = [hasUppercase, hasNumbers, hasSymbols].filter(Boolean).length;

//set les critères de force du mot de passe
    if (password.length >= 16 && optionsCount >= 3) {
        return "Fort";
    } else if (password.length < 10 && optionsCount < 2) {
        return "Faible";
    } else {
        return "Moyen";
    }
}

//met à jour la longueur du mot de passe & vérifie les limites
function setPasswordLength() {
    const lengthInput = document.getElementById('length-input');
    let value = parseInt(lengthInput.value);
    
    if (value < 8) {
        alert("La longueur minimale est de 8 caractères.");
        return;
    }
    else if (value > 32) {
        alert("La longueur maximale est de 32 caractères.");
        return;
    }
    
    passwordLength = value;
    lengthInput.value = value;
}

//génère le password
function generatePassword() {
    const passwordDisplay = document.getElementById('password-display');
    let baseString = "abcdefghijklmnopqrstuvwxyz";
    let allCharacters = baseString;

    if (includeUppercase) {
        allCharacters += uppercaseChars;
    }
    if (includeNumbers) {
        allCharacters += numberChars;
    }
    if (includeSymbols) {
        allCharacters += symbolChars;
    }

    if (allCharacters === baseString) {
        alert("Veuillez sélectionner au moins une option");
        return;
    }

    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    passwordDisplay.textContent = password;

    const strength = checkPasswordStrength(password);
    const strengthDisplay = document.getElementById('strength-display');
    strengthDisplay.textContent = strength;

    strengthDisplay.classList.remove('strength-faible', 'strength-moyen', 'strength-fort');
    strengthDisplay.classList.add('strength-' + strength.toLowerCase());
}

//update les options après les modifications des checkboxes
updateOptions();
