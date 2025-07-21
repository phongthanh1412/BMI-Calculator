const bmiForm = document.getElementById('form');
const inputHeightMetric = document.getElementById('height');
const inputWeightMetric = document.getElementById('weight');
const inputFeet = document.getElementById('feet');
const inputInch = document.getElementById('inch');
const inputStone = document.getElementById('st');
const inputPound = document.getElementById('lbs');
const classificationLabel = document.getElementById('classification');
const bmiResultValue = document.getElementById('result');
const bmiResultContainer = document.getElementById('container-result');
const bmiBlock = document.getElementById('bmi');
const validationMessage = document.getElementById('valid-msg');

const btnMetric = document.getElementById('metric');
const btnImperial = document.getElementById('imperial');
const btnCalculate = document.getElementById('calculateBtn');
const btnReset = document.getElementById('resetBtn');

btnCalculate.disabled = true;
btnReset.disabled = true;

function calculateBMI() {
  if (btnMetric.classList.contains('active')) {
    const height = inputHeightMetric.value;
    const weight = inputWeightMetric.value;

    if (!height || !weight) return;

    bmiBlock.style.display = 'flex';
    validationMessage.style.display = 'none';

    const bmi = ((weight / (height * height)) * 10000).toFixed(1);
    bmiResultValue.innerText = bmi;

    classifyBMI(bmi);
    console.log('height:', height, 'weight:', weight, 'bmi:', bmi);
  } else {
    const feet = parseInt(inputFeet.value) || 0;
    const inch = parseInt(inputInch.value) || 0;
    const stone = parseInt(inputStone.value) || 0;
    const pounds = parseInt(inputPound.value) || 0;

    if (!feet || !inch || !stone || !pounds) return;

    bmiBlock.style.display = 'flex';
    validationMessage.style.display = 'none';

    const heightInInches = feet * 12 + inch;
    const weightInPounds = stone * 14 + pounds;
    const bmi = ((703 * weightInPounds) / (heightInInches * heightInInches)).toFixed(1);

    bmiResultValue.innerText = bmi;

    classifyBMI(bmi);
    console.log('bmi:', bmi);
  }
}

function classifyBMI(bmi) {
  let category = '';
  if (bmi < 18.5) {
    category = 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Healthy Weight';
  } else if (bmi > 24.9 && bmi <= 29.9) {
    category = 'Overweight';
  } else {
    category = 'Obese';
  }
  classificationLabel.innerText = category;
  console.log('Classification:', category);
}

function resetForm() {
  inputHeightMetric.value = '';
  inputWeightMetric.value = '';
  inputFeet.value = '';
  inputInch.value = '';
  inputStone.value = '';
  inputPound.value = '';
  bmiResultValue.innerText = '';
  classificationLabel.innerText = '';
  bmiBlock.style.display = 'none';
  validationMessage.style.display = 'block';
  updateButtonState();
}

function limitLength() {
  if (inputHeightMetric.value.length > 3) inputHeightMetric.value = inputHeightMetric.value.slice(0, 3);
  if (inputWeightMetric.value.length > 3) inputWeightMetric.value = inputWeightMetric.value.slice(0, 3);
  if (inputFeet.value.length > 1) inputFeet.value = inputFeet.value.slice(0, 1);
  if (inputInch.value.length > 2) inputInch.value = inputInch.value.slice(0, 2);
  if (inputPound.value.length > 2) inputPound.value = inputPound.value.slice(0, 2);
  if (inputStone.value.length > 2) inputStone.value = inputStone.value.slice(0, 2);
  updateButtonState();
}

function updateButtonState() {
  if (btnMetric.classList.contains('active')) {
    btnCalculate.disabled = !(inputHeightMetric.value && inputWeightMetric.value);
    btnReset.disabled = !(inputHeightMetric.value && inputWeightMetric.value);
  } else {
    btnCalculate.disabled = !(inputFeet.value && inputInch.value && inputStone.value && inputPound.value);
    btnReset.disabled = !(inputFeet.value && inputInch.value && inputStone.value && inputPound.value);
  }
}

// Input listeners
inputHeightMetric.addEventListener('input', limitLength);
inputWeightMetric.addEventListener('input', limitLength);
inputFeet.addEventListener('input', limitLength);
inputInch.addEventListener('input', limitLength);
inputPound.addEventListener('input', limitLength);
inputStone.addEventListener('input', limitLength);

// Button listeners
btnCalculate.addEventListener('click', (e) => {
  e.preventDefault();
  calculateBMI();
});

btnReset.addEventListener('click', (e) => {
  e.preventDefault();
  resetForm();
});

// Handle radio switch
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.target.value === 'imperial') {
      document.querySelector('.metric').style.display = 'none';
      document.querySelector('.imperial').style.display = 'block';
      e.target.classList.add('active');
      btnMetric.classList.remove('active');
    } else {
      document.querySelector('.metric').style.display = window.innerWidth < 768 ? 'block' : 'flex';
      document.querySelector('.imperial').style.display = 'none';
      btnImperial.classList.remove('active');
      e.target.classList.add('active');
    }
    updateButtonState();
    console.log(e.target, btnMetric);
  });
});

// Focus + unit formatting
document.addEventListener('DOMContentLoaded', function () {
  const inputContainers = document.querySelectorAll('.input-container');

  inputContainers.forEach(container => {
    const input = container.querySelector('input');
    const unit = container.querySelector('.unit-height, .unit-weight, small');

    container.addEventListener('click', function () {
      input.focus();
    });

    if (unit) {
      unit.addEventListener('click', function (e) {
        e.stopPropagation();
        input.focus();
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  function updateUnitOnFocus(input, unit) {
    if (input && unit) {
      const originalUnit = unit.textContent;

      input.addEventListener('focus', function () {
        if (originalUnit.includes('centimetres')) unit.textContent = 'cm';
        if (originalUnit.includes('kilograms')) unit.textContent = 'kg';
        if (originalUnit.includes('feets')) unit.textContent = 'ft';
        if (originalUnit.includes('inches')) unit.textContent = 'in';
        if (originalUnit.includes('stones')) unit.textContent = 'st';
        if (originalUnit.includes('pounds')) unit.textContent = 'lbs';
      });

      input.addEventListener('blur', function () {
        unit.textContent = originalUnit;
      });
    }
  }

  const allInputs = document.querySelectorAll('input[type="number"]');

  allInputs.forEach(input => {
    let unit;
    if (input.closest('.metric')) {
      unit = input.nextElementSibling;
    } else if (input.closest('.imperial')) {
      unit = input.nextElementSibling;
    }

    if (unit && (unit.tagName === 'SPAN' || unit.tagName === 'SMALL')) {
      updateUnitOnFocus(input, unit);
    }
  });
});

window.addEventListener('resize', () => {
  const metricDisplay = window.innerWidth < 768 ? 'block' : 'flex';
  document.querySelector('.metric').style.display = metricDisplay;
});
