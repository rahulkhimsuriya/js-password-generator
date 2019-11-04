const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Event Listeners
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  // textarea
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();

  alert('Password copied to clipboard!');
});

// Generate Password

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';

  const typeCount = lower + upper + number + symbol;
  // console.log('typesCount : ' + typeCount);

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );
  // console.log(typesArr);

  if (typeCount === 0) {
    return '';
  }

  for (let i = 0; i < length; i += typeCount) {
    typesArr.forEach(type => {
      const FuncName = Object.keys(type)[0];
      // console.log('Function Name: ' + FuncName)
      generatedPassword += randomFunc[FuncName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  // console.log('Final Password: ' + finalPassword);

  return finalPassword;
}

// Functions

function getRandomLower() {
  // Char code 97-122 = a-z
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  // Char code 65-90 = A-Z
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  // Char code 48-57 = 0-9
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
