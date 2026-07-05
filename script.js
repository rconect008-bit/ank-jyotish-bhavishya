const form = document.getElementById('numerologyForm');
const dobInput = document.getElementById('dob');
const fullNameInput = document.getElementById('fullName');
const resultContent = document.getElementById('resultContent');
const loading = document.getElementById('loading');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const printBtn = document.getElementById('printBtn');
const pdfBtn = document.getElementById('pdfBtn');
const resetBtn = document.getElementById('resetBtn');

let numerologyData = null;
let currentReport = null;

const masterNumbers = ['11', '22', '33'];

function reduceToNumber(value) {
  let total = Number(value);

  while (total > 33) {
    total = String(total)
      .split('')
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  if (masterNumbers.includes(String(total))) {
    return total;
  }

  while (total > 9) {
    total = String(total)
      .split('')
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return total;
}

function calculateBirthNumber(dateValue) {
  const sanitized = String(dateValue).replace(/-/g, '');
  const day = sanitized.slice(6, 8);
  const month = sanitized.slice(4, 6);
  const year = sanitized.slice(0, 4);
  const digits = `${day}${month}${year}`.split('').map(Number);
  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  return reduceToNumber(sum);
}

function calculateLifePathNumber(dateValue) {
  const digits = dateValue.replace(/-/g, '').split('').map(Number);
  const sum = digits.reduce((acc, digit) => acc + digit, 0);
  return reduceToNumber(sum);
}

function calculateLuckyNumber(birthNumber, lifePathNumber) {
  const sum = birthNumber + lifePathNumber;
  return reduceToNumber(sum);
}

function getNumberDetails(numberKey) {
  return numerologyData[numberKey];
}

function formatList(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function buildReport(dob, fullName, birthNumber, lifePathNumber, luckyNumber) {
  const birthProfile = getNumberDetails(String(birthNumber));
  const lifePathProfile = getNumberDetails(String(lifePathNumber));
  const luckyProfile = getNumberDetails(String(luckyNumber));

  return {
    dob,
    fullName,
    birthNumber,
    lifePathNumber,
    luckyNumber,
    birthProfile,
    lifePathProfile,
    luckyProfile,
    timestamp: new Date().toLocaleString('mr-IN')
  };
}

function renderReport(report) {
  const heading = report.fullName
    ? `${report.fullName}, तुमचा अंकशास्त्र अहवाल`
    : 'तुमचा अंकशास्त्र अहवाल';

  const overview = `
    <div class="summary-card">
      <span class="badge">${heading}</span>
      <h3>सारांश</h3>
      <p>जन्मतारीख: ${report.dob}</p>
      <p>तुमचा जन्मांक: ${report.birthNumber}</p>
      <p>तुमचा जीवनमार्गांक: ${report.lifePathNumber}</p>
      <p>तुमचा शुभांक: ${report.luckyNumber}</p>
      <p>अहवाल तयार केला: ${report.timestamp}</p>
    </div>
  `;

  const mainCards = `
    <div class="result-grid">
      <article class="result-card">
        <span class="badge">जन्मांक</span>
        <h3>${report.birthNumber}</h3>
        <p>${report.birthProfile.description}</p>
        <ul class="stat-list">
          <li><strong>व्यक्तिमत्व:</strong> ${report.birthProfile.personality}</li>
          <li><strong>शक्ती:</strong> ${report.birthProfile.strengths.join(', ')}</li>
        </ul>
      </article>

      <article class="result-card">
        <span class="badge">जीवनमार्गांक</span>
        <h3>${report.lifePathNumber}</h3>
        <p>${report.lifePathProfile.description}</p>
        <ul class="stat-list">
          <li><strong>दिशा:</strong> ${report.lifePathProfile.luckyDirection}</li>
          <li><strong>रंग:</strong> ${report.lifePathProfile.luckyColor}</li>
        </ul>
      </article>

      <article class="result-card">
        <span class="badge">शुभांक</span>
        <h3>${report.luckyNumber}</h3>
        <p>${report.luckyProfile.description}</p>
        <ul class="stat-list">
          <li><strong>शुभ दैनंदिन मार्गदर्शन:</strong> ${report.luckyProfile.dailyGuidance}</li>
          <li><strong>वार्षिक मार्गदर्शन:</strong> ${report.luckyProfile.yearlyGuidance}</li>
        </ul>
      </article>
    </div>
  `;

  const detailedCards = Object.entries(numerologyData)
    .filter(([key]) => key !== 'undefined')
    .filter(([key]) => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return true;
      const profile = numerologyData[key];
      const haystack = `${profile.title} ${profile.description} ${profile.personality} ${profile.strengths.join(' ')} ${profile.weaknesses.join(' ')} ${profile.career} ${profile.business} ${profile.education} ${profile.finance} ${profile.love} ${profile.marriage} ${profile.health} ${profile.family} ${profile.friendship} ${profile.dailyGuidance} ${profile.yearlyGuidance} ${profile.motivationalAdvice}`.toLowerCase();
      return haystack.includes(query);
    })
    .map(([key, profile]) => `
      <article class="number-card">
        <span class="badge">${profile.title}</span>
        <h3>अंक ${key}</h3>
        <p>${profile.description}</p>
        <ul class="stat-list">
          <li><strong>व्यक्तिमत्व:</strong> ${profile.personality}</li>
          <li><strong>शक्ती:</strong> ${profile.strengths.join(', ')}</li>
          <li><strong>कमजोरी:</strong> ${profile.weaknesses.join(', ')}</li>
          <li><strong>व्यवसाय:</strong> ${profile.career}</li>
          <li><strong>व्यवसाय/बिझनेस:</strong> ${profile.business}</li>
          <li><strong>शिक्षण:</strong> ${profile.education}</li>
          <li><strong>आर्थिक:</strong> ${profile.finance}</li>
          <li><strong>प्रेम:</strong> ${profile.love}</li>
          <li><strong>विवाह:</strong> ${profile.marriage}</li>
          <li><strong>आरोग्य:</strong> ${profile.health}</li>
          <li><strong>कुटुंब:</strong> ${profile.family}</li>
          <li><strong>मैत्री:</strong> ${profile.friendship}</li>
          <li><strong>दैनिक मार्गदर्शन:</strong> ${profile.dailyGuidance}</li>
          <li><strong>वार्षिक मार्गदर्शन:</strong> ${profile.yearlyGuidance}</li>
          <li><strong>प्रेरणादायी सल्ला:</strong> ${profile.motivationalAdvice}</li>
        </ul>
      </article>
    `).join('');

  resultContent.innerHTML = `
    <div class="result-grid">
      ${overview}
      <article class="summary-card">
        <h3>विस्तृत माहिती</h3>
        <ul class="bullets">
          <li>शुभ रंग: ${report.lifePathProfile.luckyColor}</li>
          <li>शुभ दिवस: ${report.lifePathProfile.luckyDay}</li>
          <li>शुभ दिशा: ${report.lifePathProfile.luckyDirection}</li>
          <li>शुभ रत्‍ना: ${report.lifePathProfile.luckyGemstone}</li>
        </ul>
      </article>
    </div>
    <div class="result-grid">${mainCards}</div>
    <div class="reference-grid">${detailedCards}</div>
  `;
}

function showLoading() {
  loading.classList.remove('hidden');
  resultContent.innerHTML = '';
}

function hideLoading() {
  loading.classList.add('hidden');
}

async function loadNumerologyData() {
  try {
    const response = await fetch('/api/numerology');
    numerologyData = await response.json();
  } catch (error) {
    console.error(error);
    resultContent.innerHTML = '<p>डेटा लोड करण्यात अडचण आली. कृपया पेज रीलोड करा.</p>';
  }
}

function setTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
}

function handleSubmit(event) {
  event.preventDefault();

  if (!numerologyData) {
    resultContent.innerHTML = '<p>कृपया थोडा वेळ थांबा. डेटा लोड होत आहे.</p>';
    return;
  }

  const dob = dobInput.value;
  const fullName = fullNameInput.value.trim();

  if (!dob) {
    resultContent.innerHTML = '<p>कृपया जन्मतारीख निवडा.</p>';
    return;
  }

  showLoading();

  window.setTimeout(() => {
    const birthNumber = calculateBirthNumber(dob.replace(/-/g, ''));
    const lifePathNumber = calculateLifePathNumber(dob.replace(/-/g, ''));
    const luckyNumber = calculateLuckyNumber(birthNumber, lifePathNumber);

    currentReport = buildReport(dob, fullName, birthNumber, lifePathNumber, luckyNumber);
    renderReport(currentReport);
    hideLoading();
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
  }, 700);
}

function resetForm() {
  resultContent.innerHTML = '';
  searchInput.value = '';
  currentReport = null;
}

async function copyResult() {
  if (!currentReport) return;

  const text = `अंक ज्योतिष भविष्य\nजन्मांक: ${currentReport.birthNumber}\nजीवनमार्गांक: ${currentReport.lifePathNumber}\nशुभांक: ${currentReport.luckyNumber}\nशुभ रंग: ${currentReport.lifePathProfile.luckyColor}`;

  try {
    await navigator.clipboard.writeText(text);
    alert('अहवाल कॉपी झाला आहे.');
  } catch (error) {
    alert('कॉपी करण्यात अडचण आली.');
  }
}

async function shareResult() {
  if (!currentReport) return;

  const text = `अंक ज्योतिष भविष्य: जन्मांक ${currentReport.birthNumber}, जीवनमार्गांक ${currentReport.lifePathNumber}, शुभांक ${currentReport.luckyNumber}`;

  try {
    if (navigator.share) {
      await navigator.share({ title: 'अंक ज्योतिष भविष्य', text });
    } else {
      await navigator.clipboard.writeText(text);
      alert('शेअर करता आले नाही; परिणाम कॉपी केला आहे.');
    }
  } catch (error) {
    console.error(error);
  }
}

function printReport() {
  window.print();
}

function downloadPdf() {
  printReport();
}

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 520);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

searchInput.addEventListener('input', () => {
  if (currentReport) {
    renderReport(currentReport);
  }
});

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
  setTheme(nextTheme);
});

form.addEventListener('submit', handleSubmit);
resetBtn.addEventListener('click', resetForm);
copyBtn.addEventListener('click', copyResult);
shareBtn.addEventListener('click', shareResult);
printBtn.addEventListener('click', printReport);
pdfBtn.addEventListener('click', downloadPdf);

initializeTheme();
loadNumerologyData();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
}
