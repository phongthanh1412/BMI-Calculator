const form = document.getElementById('form');
const heightEl = document.getElementById('height');
const weightEl = document.getElementById('weight');
const feetEl = document.getElementById('feet');
const inchEl = document.getElementById('inch');
const stEl = document.getElementById('st');
const lbsEl = document.getElementById('lbs');
const classification = document.getElementById('classification');
const minWeight = document.getElementById('min-weight');
const maxWeight = document.getElementById('max-weight');
const resultEl = document.getElementById('result');
const containerResult = document.getElementById('container-result');
const bmiEl = document.getElementById('bmi');
const welcome = document.getElementById('welcome');

const metricBtn = document.getElementById('metric');
const imperialBtn = document.getElementById('imperial');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');

// Disable buttons initially
calculateBtn.disabled = true;
resetBtn.disabled = true;

// Calculate BMI function
function calculateBMI() {
  if (metricBtn.classList.contains('active')) {
    const height = heightEl.value;
    const weight = weightEl.value;

    if (!height || !weight) return;

    bmiEl.style.display = 'flex';
    welcome.style.display = 'none';

    const bmi = ((weight / (height * height)) * 10000).toFixed(1);
    const heightM = height / 100;
    const min = (18.5 * heightM * heightM).toFixed(1);
    const max = (24.9 * heightM * heightM).toFixed(1);

    resultEl.innerText = bmi;
    minWeight.innerText = `${min}kgs`;
    maxWeight.innerText = `${max}kgs`;

    classifyBMI(bmi);
    console.log('height:', height, 'weight:', weight, 'bmi:', bmi, 'heightM:', heightM, 'test');
  } else {
    const feet = parseInt(feetEl.value) || 0;
    const inch = parseInt(inchEl.value) || 0;
    const st = parseInt(stEl.value) || 0;
    const lbs = parseInt(lbsEl.value) || 0;

    if (!feet || !inch || !st || !lbs) return;

    bmiEl.style.display = 'flex';
    welcome.style.display = 'none';

    const heightInInches = feet * 12 + inch;
    const weightInPounds = st * 14 + lbs;
    const bmi = ((703 * weightInPounds) / (heightInInches * heightInInches)).toFixed(1);

    resultEl.innerText = bmi;

    const minOptimalWeightPounds = (18.5 * (heightInInches * heightInInches)) / 703;
    const maxOptimalWeightPounds = (24.9 * (heightInInches * heightInInches)) / 703;

    const minWeightInStone = Math.floor(minOptimalWeightPounds / 14);
    const minWeightInPounds = Math.round(minOptimalWeightPounds % 14);
    const maxWeightInStone = Math.floor(maxOptimalWeightPounds / 14);
    const maxWeightInPounds = Math.round(maxOptimalWeightPounds % 14);

    minWeight.innerText = `${minWeightInStone}st ${minWeightInPounds}lbs`;
    maxWeight.innerText = `${maxWeightInStone}st ${maxWeightInPounds}lbs`;

    classifyBMI(bmi);
    console.log('bmi:', bmi);
  }
}

// Classify BMI
function classifyBMI(bmi) {
  if (bmi < 18.5) {
    classification.innerText = 'Underweight';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    classification.innerText = 'Healthy weight';
  } else if (bmi > 24.9 && bmi <= 29.9) {
    classification.innerText = 'Overweight';
  } else {
    classification.innerText = 'Obese';
  }
}

// Reset function
function resetForm() {
  heightEl.value = '';
  weightEl.value = '';
  feetEl.value = '';
  inchEl.value = '';
  stEl.value = '';
  lbsEl.value = '';
  resultEl.innerText = '';
  minWeight.innerText = '';
  maxWeight.innerText = '';
  classification.innerText = '';
  bmiEl.style.display = 'none';
  welcome.style.display = 'block';
  updateButtonState(); 
}

// Limit input length
function limitLength() {
  if (heightEl.value.length > 3) heightEl.value = heightEl.value.slice(0, 3);
  if (weightEl.value.length > 3) weightEl.value = weightEl.value.slice(0, 3);
  if (feetEl.value.length > 1) feetEl.value = feetEl.value.slice(0, 1);
  if (inchEl.value.length > 2) inchEl.value = inchEl.value.slice(0, 2);
  if (lbsEl.value.length > 2) lbsEl.value = lbsEl.value.slice(0, 2);
  if (stEl.value.length > 2) stEl.value = stEl.value.slice(0, 2);
  updateButtonState(); 
}

// Update button state based on input values
function updateButtonState() {
  if (metricBtn.classList.contains('active')) {
    calculateBtn.disabled = !(heightEl.value && weightEl.value);
    resetBtn.disabled = !(heightEl.value && weightEl.value);
  } else {
    calculateBtn.disabled = !(feetEl.value && inchEl.value && stEl.value && lbsEl.value);
    resetBtn.disabled = !(feetEl.value && inchEl.value && stEl.value && lbsEl.value);
  }
}

// Event listeners for input limits and state updates
heightEl.addEventListener('input', limitLength);
weightEl.addEventListener('input', limitLength);
feetEl.addEventListener('input', limitLength);
inchEl.addEventListener('input', limitLength);
lbsEl.addEventListener('input', limitLength);
stEl.addEventListener('input', limitLength);

// Event listener for calculate button
calculateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  calculateBMI();
});

// Event listener for reset button
resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  resetForm();
});

// Handle radio button changes
const radioButtons = document.querySelectorAll('input[type="radio"]');
radioButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.target.value === 'imperial') {
      document.querySelector('.metric').style.display = 'none';
      document.querySelector('.imperial').style.display = 'block';
      e.target.classList.add('active');
      metricBtn.classList.remove('active');
    } else {
      document.querySelector('.metric').style.display = window.innerWidth < 768 ? 'block' : 'flex';
      document.querySelector('.imperial').style.display = 'none';
      imperialBtn.classList.remove('active');
      e.target.classList.add('active');
    }
    updateButtonState(); 
    console.log(e.target, metricBtn);
  });
});

// Handle window resize
window.addEventListener('resize', () => {
  const metricDisplay = window.innerWidth < 768 ? 'block' : 'flex';
  document.querySelector('.metric').style.display = metricDisplay;
});