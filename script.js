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
    total = String(total).split('').reduce((sum, digit) => sum + Number(digit), 0);
  }
  if (masterNumbers.includes(String(total))) return total;
  while (total > 9) {
    total = String(total).split('').reduce((sum, digit) => sum + Number(digit), 0);
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
  return reduceToNumber(birthNumber + lifePathNumber);
}

function calculateDestinyNumber(fullName) {
  if (!fullName) return null;
  const letters = fullName.toLowerCase().replace(/[^a-z]/g, '');
  if (!letters) return null;
  const sum = letters.split('').reduce((acc, letter) => acc + (letter.charCodeAt(0) - 96), 0);
  return reduceToNumber(sum);
}

function calculateSoulNumber(fullName) {
  if (!fullName) return null;
  const vowels = fullName.toLowerCase().match(/[aeiou]/g);
  if (!vowels || vowels.length === 0) return null;
  const sum = vowels.reduce((acc, vowel) => acc + (vowel.charCodeAt(0) - 96), 0);
  return reduceToNumber(sum);
}

function formatDateLabel(value) {
  return value ? value.split('-').reverse().join('/') : '—';
}

function getBaseProfile(numberKey) {
  return numerologyData?.[numberKey] || null;
}

function getLongPersonalityProfile(numberKey) {
  const profiles = {
    1: `अंक 1 च्या व्यक्तिमत्त्वात नेहमीच एक खास असाधारणता दिसून येते. या व्यक्तिमत्त्वाच्या लोकांना स्वतःची स्वतंत्र ओळख निर्माण करण्याची तीव्र भावना असते. ते ध्येयवादी, पुढारी आणि स्वाभिमानी असतात. त्यांच्या मनात सतत काहीतरी नवीन करण्याची ज्वाला दडलेली असते. ते आपल्या कामाची दिशा स्वतःच ठरवतात आणि इतरांना पुढे नेण्याची क्षमता बाळगतात. या अंकाचे लोक समाजात आपले वेगळेपण दाखवू इच्छितात. त्यामुळे ते सतत नवीन संधी शोधतात आणि स्वतःला सिद्ध करण्यासाठी खूप मेहनत करतात. या व्यक्तिमत्त्वांचे मुख्य गुण म्हणजे धैर्य, आत्मविश्वास आणि नेतृत्व. मात्र ते जास्त वेळा आपले विचार इतरांवर थोपवण्याचा प्रयत्न करतात, ज्यामुळे संवादात तणाव निर्माण होऊ शकतो. या लोकांना त्यांच्या स्वातंत्र्यावर जोखमीचा त्रास होऊ शकतो. म्हणून त्यांच्या जीवनात समतोल राखणे महत्त्वाचे आहे. ते कार्यक्षम आणि आत्मनिर्भर असतात, परंतु भावनांमध्येही खोलपण असते. या लोकांना प्रोत्साहन, सन्मान आणि मान्यताची गरज असते. या अंकाच्या लोकांचा आत्मविश्वास दृढ असतो. ते जबाबदारी स्वीकारण्यास तयार असतात आणि त्यांच्या कर्तव्याबद्दल निष्ठावान राहतात. या लोकांच्या जीवनात जबाबदारी, स्वाभिमान आणि प्रगती या तीन गोष्टी प्रमुख असतात. ते कार्यक्षेत्रात मोठ्या शिखरापर्यंत पोहोचू शकतात, पण त्यांच्या निर्णयात संयम ठेवणे आवश्यक आहे.`,
    2: `अंक 2 हे सहकार्य, सौम्यता आणि संवेदनशीलतेचे प्रतीक मानले जाते. या लोकांचे व्यक्तिमत्त्व खूपच प्रेमळ, निष्काळजी आणि समजूतदार असते. ते इतरांच्या भावना समजून घेतात, तसेच संबंधात शांतता आणि एकात्मता राखण्याचा प्रयत्न करतात. त्यांच्या जीवनात नातेसंबंधाची गोडी आणि प्रेमाचे आदर हे महत्त्वाचे असते. ते सहानुभूतीने काम करणारे, शांतिकारक आणि दयाळू असतात. या अंकाच्या लोकांना नेहमीच भावना समजून घेणे आणि आपल्या सभोवतालीचे वातावरण शांत ठेवणे आवडते. त्यामुळे ते खूप चांगले मधुर माध्यम बनतात. या व्यक्तिमत्त्वांचा मुख्य धोरण असते की, कोणत्याही प्रकरणात जास्त संघर्ष न होता शांतपणे मार्ग काढणे. त्यांना अत्यंत प्रेमळ आणि संवेदनशील पद्धतीने जीवन जगायला आवडते. मात्र या लोकांना वारंवार आत्मविश्वासात संकोच जाणवतो आणि स्वतःचे विचार मांडताना भीती वाटते. या कारणामुळे ते काही वेळा आपल्या गरजांवरही कमी प्रकाश टाकतात. या लोकांना त्यांच्या कमकुवत भावनिकपणामुळे मानसिक ताण जाणवू शकतो. तरीही त्यांची सौम्यता आणि समंजसता त्यांना इतरांमध्ये विश्वासू बनवते. ते नातेसंबंधात सुसंवाद, समज आणि दृढतेचा आदर करतात. त्यांच्यात निर्मितीशक्ती आणि सहकारी वृत्ती असते. त्यांना जीवनात दररोज थोड्या थोड्या पद्धतीने प्रगती हवी असते.`,
    3: `अंक 3 चे लोक संवाद, रचना आणि सर्जनशीलतेत खूपच तेजस्वी असतात. त्यांचा स्वभाव उत्साही, हसतमुख आणि आत्मविश्वासाने भरलेला असतो. या लोकांना आपले विचार, भावना आणि कल्पना लोकांपर्यंत पोहोचवण्याची वाव असते. ते बोलण्यात चमकदार असतात. त्यांच्यात असलेली सर्जनशीलता त्यांना कला, लेखन, शिक्षण, माध्यम आणि संवाद क्षेत्रात वेगळी ओळख देणारी बनवते. या व्यक्तिमत्त्वात हँडलिंग, आनंद आणि उत्साहाचा भरपूर भाग असतो. ते जीवनात रंग, चळवळ आणि नवीन अनुभव यांना महत्त्व देतात. या लोकांना एखाद्या गोष्टीचा अनुभव घेणे आणि उसका विचार मांडणे आवडते. मात्र त्यांच्या मनात सतत काहीतरी नवे करण्याची ज्वाला असते, त्यामुळे ते गोंधळातही पडतात. त्यांना लक्ष केंद्रित करणे आणि एकाच कामावर टिकून राहणे अवघड होऊ शकते. या लोकांची भाषा आणि व्यक्तिमत्व खूप प्रभावी असते. ते लोकांना प्रेरित करण्याची क्षमता ठेवतात. या अंकाचा व्यक्ती खूप सहजतेने नातेसंबंधात पुढे येतो, पण भावनिक ताणही त्याला वेधून घेऊ शकतो. त्यांच्या जीवनात अभिव्यक्ती, आनंद आणि स्वप्न पाहण्याची क्षमता यांचे मिश्रण असते. ते सामाजिक जगात प्रकाशमान दिसतात.`,
    4: `अंक 4 चे लोक जीवनात धैर्य, अनुशासन आणि व्यवस्थिततेचे प्रतिक मानले जातात. त्यांचा स्वभाव शांत, विश्वसनीय आणि मेहनती असतो. ते प्रत्येक कामाला जबाबदारीने आणि नियमबद्ध पद्धतीने हाताळतात. या लोकांना स्थिरता आणि सुरक्षिततेची खूप गरज असते. त्यांच्या मनात प्रत्येक गोष्टीचे नियोजन करण्याची क्षमता असते. ते आपले ध्येय साध्य करण्यासाठी संयम आणि कठोर परिश्रम घेतात. या व्यक्तिमत्त्वात विश्वास, जबाबदारी आणि निष्कर्ष यांचा भरपूर भाग आहे. ते इतरांच्या बाबतीतही विश्वासार्ह असतात आणि कर्तव्यपूर्तीमध्ये खूप जागरूक असतात. या लोकांना बदलांमध्ये फारसा आनंद होत नाही, कारण ते सर्व गोष्टी व्यवस्थित आणि संरचनेतून पाहतात. मात्र या गुणामुळे त्यांची प्रगती टिकाऊ होत आहे. ते आयुष्यात खूप निष्ठावान असतात. प्रकल्प, तंत्रज्ञान, लेखा, प्रशासन आणि नियोजन या क्षेत्रात त्यांची चमक असते. त्यांना मित्र-परिवारासाठी जपणूक आणि समर्थन देण्याची सवय असते. परंतु ते एखाद्या गोष्टीत अतिशय सावध असतात, त्यामुळे काहीवेळा गोंधळ टाळण्यासाठी ते थोडे निष्क्रियही होतात. ते दुहेरी अर्थ लावणारे नसून कार्यक्षम आणि प्रॅक्टिकल असतात.`,
    5: `अंक 5 हे बदल, स्वातंत्र्य आणि अनुभवांचा अंक आहे. या व्यक्तीने जीवनात सतत नव्या अनुभवांची, प्रवासाची आणि जिज्ञासेची चाहूल असते. या लोकांना स्वातंत्र्य अपरिहार्य वाटते. ते आयुष्याला विविध दृष्टीने पाहतात, म्हणून त्यांच्या मनात सतत बदलाची नवी कल्पना तयार होते. या व्यक्तिमत्त्वात चंचलता, उत्साह, लवचिकता आणि उत्सुकता यांचा मिश्रण असतो. ते अगदी सहजपणे नवीन संधी स्वीकारतात. या लोकांची प्रगतिशीलता अत्यंत उंच असते आणि ते नवीन ज्ञान मिळवण्यास खूप प्रेम करतात. मात्र या स्वभावामुळे त्यांच्या मनात अधीरपणा आणि अनिश्चितता येऊ शकते. ते त्यांच्या जीवनात खूप वेगाने पुढे जातात, परंतु पाचवी-आठवी स्थितीतील गोंधळही त्यांना अनुभवता येतो. या लोकांना आवडते की त्यांच्या निर्णयात वेग, लवचिकता आणि अनुभवाची गोडी असेल. नातेसंबंधातही त्यांच्या स्वातंत्र्याच्या गरजेला महत्त्व असते. ते दररोज काही न काही नवीन करत राहतात. या अंकाच्या व्यक्तीला आयुष्याला उघड्या डोळ्यांनी पाहण्याची मुभा असते.`,
    6: `अंक 6 चे लोक प्रेम, जबाबदारी, संरक्षण आणि दयाळूपणाचे प्रतिक मानले जातात. त्यांचे व्यक्तिमत्त्व खूपच स्नेहाळू, सहानुभूतीशील आणि भावनिकदृष्ट्या संवेदनशील असते. या व्यक्ती हा समुदाय, कुटुंब आणि नातेसंबंधांचा आधार असते. ते इतरांसाठी सतत काही न काही देण्याचा प्रयत्न करतात. त्यांच्यात दयाळूपणा, सेवाभाव आणि कुटुंबाभिमुख वृत्ती असते. या लोकांच्या मनात नेहमीच लोकांचे भले होईल यासाठी आशा असते. जीवनात त्यांना घर, नातेसंबंध आणि सामाजिक जबाबदाऱ्या जपण्याची खास सवय असते. यामुळे ते आयुष्याच्या प्रत्येक स्तरावर आदर, स्नेह आणि जबाबदारी यांचा संतुलन राखण्याचा प्रयत्न करतात. मात्र त्यांना हळूहळू इतरांच्या अपेक्षा आणि चिंता यांच्यामुळे थकवा जाणवतो. या लोकांना आपल्या गरजांकडे दुर्लक्ष करून इतरांकडे लक्ष देण्याची प्रवृत्ती असते. तरीही त्यांची दया आणि समर्पण त्यांना इतरांसाठी आदरणीय बनवते. नातेसंबंधात ते विश्वास, काळजी आणि स्थिरता यांना महत्त्व देतात. या अंकाच्या व्यक्तीचे आयुष्य प्रामुख्याने प्रेम, कुटुंब आणि कल्याण या गोष्टींमुळे समृद्ध होतात.`,
    7: `अंक 7 हा आत्मचिंतन, विश्लेषण आणि आध्यात्मिक उंचीचा अंक आहे. या लोकांना आपल्या मनातील खोल भावनांचा आणि विचारांचा अभ्यास करायला आवडते. ते खूप विचारशील, शांत आणि अंतर्मुख असतात. त्यांना जगाचे सत्य कसे समजते याची जिज्ञासा असते. या व्यक्तिमत्त्वात बौद्धिक गहनता, आत्मनिरीक्षण आणि अनोखे दृष्टीकोन यांचा समावेश असतो. ते आपल्या कार्यात तत्त्वज्ञान, संशोधन, लेखन आणि अध्यात्म या गोष्टींना प्राधान्य देतात. त्यांना आपले भावविश्व समजून घेणे आणि जीवनाच्या गूढ प्रश्नांची उत्तरे शोधणे आवडते. परंतु या लोकांची एकांताची प्रवृत्ती आणि सावधगिरी त्यांना काही वेळा वेगळे ठेवते. ते आपल्या मनात गोष्टी घोळवून ठेवतात आणि जोपर्यंत त्यांना पूर्णपणे विश्वास होत नाही तोपर्यंत पुढे जात नाहीत. त्यांना त्यांच्या आतल्या आवाजाकडे लक्ष देण्याची सवय असते. त्यामुळे त्यांच्यात आध्यात्मिकदृष्ट्या समृद्ध होण्याची क्षमता असते. जीवनात ते स्थिरता, शांतता आणि अर्थपूर्ण अनुभवांना महत्त्व देतात. या अंकाचे लोक नातेसंबंधातही खोल आणि अर्थपूर्ण संपर्क साधण्यास प्राधान्य देतात.`,
    8: `अंक 8 हे सामर्थ्य, यश आणि आर्थिक प्रगतीचे उच्च प्रतीक मानले जाते. या लोकांचा स्वभाव धडाडीचा, निर्णायक आणि परिणामदर्शक असतो. ते कार्यक्षेत्रात अपनी-अपनी क्षमता दाखवून मोठ्या यशाकडे जातात. त्यांच्यात नेतृत्व, व्यापार कौशल्य आणि निर्णयक्षमता असते. या व्यक्तिमत्त्वांचा आवडता मार्ग असतो की, त्यांनी ध्येय निश्चित केले तर ते त्याच्यावर टिकून राहतात आणि मोठे साध्य करतात. ते आर्थिक आणि व्यावसायिक क्षेत्रातही उत्कृष्ट कामगिरी देऊ शकतात. या लोकांना नियंत्रण, स्थैर्य आणि विजय यांचा मोठा आकर्षण असतो. तितक्याच प्रमाणात त्यांच्या मनात तणावही असतो, कारण ते सतत प्रगती आणि यशाच्या ध्वनीत राहतात. या व्यक्तीला वळण, जबाबदारी आणि शक्ती यांची गरज असते. त्यांना कधीकधी इतरांवर हुकूमीपणा वाटू शकतो. पण त्यांची कार्यक्षमता, नियोजन क्षमता आणि निर्णयशक्ती त्यांना वेगळेपण देते. ते त्यांच्या जीवनात प्रखरता, जबाबदारी आणि व्यवहार्य यश यांची जोड पाहतात.`,
    9: `अंक 9 हे करुणा, दया, अध्यात्म आणि व्यापक भावविश्वाचे अंक आहे. या व्यक्तीचे व्यक्तिमत्त्व खूपच सहानुभूतीशील, प्रेमळ आणि व्यापक दृष्टीचे असते. ते जगाला जास्त खोलात पाहतात. त्यांना लोकांची सेवा करण्याची क्षमता आणि सामाजिक योगदानाची इच्छा असते. या लोकांना आपले जीवन एखाद्या मोठ्या हेतूच्या दिशेने झुकलेले वाटते. ते कधी कधी भावनिकदृष्ट्या खूप खोल जातात, परंतु याच कारणामुळे त्यांची समज आणि महत्त्वाची दृष्टी व्यापक असते. या अंकाच्या व्यक्तिमत्त्वात दया, सहानुभूती, करुणा आणि मनुष्यबळ यांचा समावेश असतो. ते एखाद्या अडचणीत सापडलेल्या व्यक्तीला मदत करायला तत्पर राहतात. मनाने ते मोठे आणि समर्पित असतात. मात्र त्यांना सतत इतरांच्या भावनांमध्ये स्वतःची भावना उडताना दिसते, त्यामुळे मानसिक स्थिती बदलू शकते. तरीही त्यांच्या या भूमिकेने ते समाजात आदर आणि प्रेमाचे प्रतीक बनतात. या लोकांचे जीवन सेवा, शुद्धता आणि उदात्तता यांच्यामुळे समृद्ध होते.`,
    11: `मास्टर अंक 11 हे आध्यात्मिक संवेदना, उच्च दृष्टी आणि सूक्ष्म भावनांचे अंक आहे. या व्यक्तींच्या मनात नेहमीच काही उदात्त, प्रेरणादायी आणि गहन स्वरूपाचे विचार येतात. ते संवेदनशील, भावनिक आणि अंतर्ज्ञानी असतात. या लोकांचं व्यक्तिमत्त्व सतत आपल्या आतल्या आवाजाला ऐकण्याकडे झुकलेले असते. त्यांच्यात सर्जनशीलता, कल्पनाशक्ती आणि आध्यात्मिक दृष्टिकोन असते. असं मानलं जातं की, या अंकाचे लोक इतरांच्या भावनांना सहज समजतात आणि त्यांच्या कार्यातून प्रेरणा निर्माण करतात. या लोकांना अचूक दृष्टिकोन, गहन चिंतन आणि अर्थपूर्ण नातेसंबंध हवे असतात. ते काही वेळा भावनांच्या प्रवाहात गुदमरणीला जातात, पण त्यांची संवेदनशीलता त्यांच्याकडे एक खास सौंदर्य आणते. या अंकाचे लोक आयुष्याला अधिक अर्थपूर्ण आणि आध्यात्मिक दृष्टीने पाहतात. यामुळे ते कलात्मक, लेखन, अध्यात्म, मार्गदर्शन यासारख्या क्षेत्रात चमकतात. त्यांनी आपली मानसिक शांती आणि दिशादर्शन जपले तर त्यांच्या जीवनात महत्त्वाची प्रगती होऊ शकते.`,
    22: `मास्टर अंक 22 हे मोठ्या स्वप्नांचा, वृहद् दृष्टीचा आणि वास्तवात बदल निर्माण करणाऱ्या कार्याचा अंक आहे. या व्यक्ती जीवनात मोठे ध्येय ठेवतात आणि ते पूर्ण करण्यासाठी खूप मेहनत करतात. त्यांच्यात व्यावहारिक बुद्धिमत्ता, प्रकल्प व्यवस्थापन आणि दीर्घकालीन दृष्टी असे गुण असतात. या लोकांना मोठा प्रभाव निर्माण करण्याची क्षमता असते. ते आपल्या विचारांना आकार देऊन मोठे काम करण्यास तयार असतात. या अंकाच्या व्यक्तिमत्त्वात असलेली शक्ती, धैर्य आणि साधना यामुळे त्यांना प्रखर नेतृत्व मिळते. मात्र कधीकधी ते आपल्या स्वप्नांना इतके मोठे बनवतात की, त्यांना त्याची पायाभूत व्यवस्था करणे मुश्किल होऊ शकते. या लोकांना त्यांच्या दृष्टीचा अर्थपूर्ण वापर करणे आणि थोडी सावधगिरी ठेवणे महत्त्वाचे आहे. ते ज्या क्षेत्रात जातात, त्यात प्रगती, रचना आणि दीर्घकालीन परिणाम दिसून येतात. या लोकांची जोखीम-घेण्याची क्षमता असते आणि ते वेळोवेळी कठोर परिश्रम करून आपले स्वप्न साकारतात.`,
    33: `मास्टर अंक 33 हे सेवाभाव, प्रेम आणि व्यापक सामाजिक योगदानाचे अंक आहे. या व्यक्तींच्या मनात लोकांची सेवा करण्याची, त्यांच्या जीवनात अर्थ निर्माण करण्याची आणि समाजासाठी काहीतरी चांगले करण्याची गहन इच्छा असते. या लोकांचा स्वभाव दयाळू, प्रेरणादायी आणि भावनिकदृष्ट्या समृद्ध असतो. ते इतरांच्या जीवनात आशा आणि प्रकाश आणण्याचा प्रयत्न करतात. त्यांच्या व्यक्तिमत्त्वात सहानुभूती, उदारता आणि नेतृत्व यांचा संतुलित मिश्रण असतो. या अंकाचे लोक कधीकधी इतरांच्या अपेक्षा आणि आपल्या भावनांमुळे थकून जातात, पण त्यांचे मन सतत लोकांसाठी काहीतरी देण्याच्या दिशेने वळलेले असते. ते शिक्षण, सामाजिक सेवा, अध्यात्म, कल्याण आणि नेतृत्व या क्षेत्रात विशेष चमक दाखवू शकतात. या लोकांना आयुष्यात प्रेम, समर्पण आणि नात्यांची गोडी महत्त्वाची वाटते. त्यांनी स्वतःची मानसिक शांती राखली तर त्यांचा प्रभाव समाजावर आणि कुटुंबावर खूप सकारात्मक राहतो.`
  };
  return profiles[numberKey] || '';
}

function getBaseNumberData(numberKey) {
  const base = getBaseProfile(numberKey);
  const fallback = {
    title: `अंक ${numberKey}`,
    description: 'आणखी तपशील लवकरात लवकर जोडला जाईल.',
    personality: 'संतुलित आणि समृद्ध स्वरूप',
    strengths: ['धैर्य', 'संयम'],
    weaknesses: ['कधीकधी सावध'],
    career: 'सकारात्मक कार्यक्षेत्र',
    business: 'सुरक्षित आणि समतोल व्यवसाय',
    education: 'नियमित अभ्यास',
    finance: 'यशस्वी नियोजन',
    love: 'स्नेहपूर्ण',
    marriage: 'विश्वासपूर्ण',
    health: 'संतुलित जीवन',
    family: 'कुटुंबाभिमुख',
    friendship: 'विश्वासू',
    dailyGuidance: 'आज शांततेने पुढे जा.',
    yearlyGuidance: 'दीर्घकालीन प्रगती',
    motivationalAdvice: 'आत्मविश्वास ठेवून पुढे जा.'
  };
  return base || fallback;
}

function buildReport(dob, fullName, birthNumber, lifePathNumber, luckyNumber) {
  const destinyNumber = calculateDestinyNumber(fullName) || lifePathNumber;
  const soulNumber = calculateSoulNumber(fullName) || birthNumber;
  const birthProfile = getBaseNumberData(String(birthNumber));
  const lifePathProfile = getBaseNumberData(String(lifePathNumber));
  const luckyProfile = getBaseNumberData(String(luckyNumber));
  const partnerNumber = reduceToNumber(luckyNumber + birthNumber + 2);
  const partnerProfile = getBaseNumberData(String(partnerNumber));
  const today = new Date();
  const dayName = ['रविवार', 'सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'][today.getDay()];
  const daily = {
    luckyNumber: reduceToNumber(luckyNumber + today.getDate()),
    luckyColor: ['सुनगंधी निळा', 'पांढरा', 'पिवळा', 'हिरवा', 'जांभळा'][today.getDate() % 5],
    luckyTime: ['सकाळी ७ ते ९', 'दुपारी १२ ते २', 'सायंकाळी ५ ते ७', 'रात्री ९ ते ११'][today.getDate() % 4],
    luckyDirection: ['उत्तर', 'पूर्व', 'दक्षिण', 'पश्चिम'][today.getDate() % 4],
    advice: `आज ${dayName} म्हणून ${lifePathProfile.title} च्या अनुषंगाने आपला आत्मविश्वास वाढवा आणि शांतपणे निर्णय घ्या.`,
    warning: 'आज तणाव टाळून विचारपूर्वक बोलण्याचा प्रयत्न करा.'
  };
  const weekly = ['सोमवार', 'मंगळवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार', 'रविवार'].map((day, idx) => ({ day, advice: `${day} या दिवशी ${['धैर्याने काम करा', 'संबंध जपून ठेवा', 'नवीन कल्पना समजून घ्या', 'वित्तीय नियोजन करा', 'सामाजिक संवाद वाढवा', 'विश्रांती घ्या', 'आध्यात्मिक अभ्यास करा'][idx]}.` }));
  const month = new Date().toLocaleString('en-US', { month: 'long' });
  const monthly = {
    career: `या ${month} मध्ये कार्यक्षेत्रात ${lifePathProfile.career} यासारख्या नव्या संधींचा विचार करा.`,
    money: 'वित्तीय नियोजन, बचत आणि दीर्घकालीन गुंतवणुकीकडे लक्ष द्या.',
    love: 'नातेसंबंधात संवाद आणि सहकार्य महत्त्वाचे राहील.',
    health: 'नियमित शारीरिक हालचाल आणि पुरेशी झोप महत्त्वाची आहे.',
    travel: 'छोट्या प्रवासासाठी या महिन्यात संधी असू शकते.',
    education: 'नवीन ज्ञान किंवा कौशल्य आत्मसात करण्याचा योग्य काळ आहे.'
  };
  const yearly = {
    career: 'व्यावसायिक प्रगतीसाठी संयमी आणि नियोजनबद्ध दृष्टी आवश्यक आहे.',
    business: 'सुरक्षित प्रयत्न व दीर्घकालीन योजना यामुळे यश येईल.',
    finance: 'बचत आणि नियोजन यामुळे आर्थिक स्थिरता मिळेल.',
    health: 'आहार, झोप आणि व्यायाम यांना प्राधान्य द्या.',
    marriage: 'नात्यांमध्ये आदर आणि समजूतदारता ठेवा.',
    property: 'घर किंवा मालमत्तेच्या बाबतीत सावधगिरी आवश्यक.',
    travel: 'प्रवासाच्या संधी मिळू शकतात, पण नियोजन महत्त्वाचे.',
    spiritualGrowth: 'ध्यान, ध्यान व आत्मचिंतनाने शांती लाभेल.',
    rating: 8
  };
  const luckyDates = [1, 3, 5, 7, 9, 11, 13].map((value) => reduceToNumber(value + birthNumber));
  const luckyMonths = ['जानेवारी', 'फेब्रुव्हारी', 'मार्च', 'एप्रिल', 'मे'].filter((_, idx) => (birthNumber + idx) % 2 === 0);

  return {
    dob, fullName, birthNumber, lifePathNumber, luckyNumber, destinyNumber, soulNumber, partnerNumber,
    birthProfile, lifePathProfile, luckyProfile, partnerProfile, timestamp: new Date().toLocaleString('mr-IN'),
    daily, weekly, monthly, yearly, luckyDates, luckyMonths,
    personalityReport: getLongPersonalityProfile(String(lifePathNumber)) || getLongPersonalityProfile(String(birthNumber))
  };
}

function renderReport(report) {
  const nameLabel = report.fullName ? report.fullName : 'तुमचे नाव';
  const heading = `${nameLabel}, तुमचा अंकशास्त्र अहवाल`;
  const overview = `
    <div class="summary-card hero-intro">
      <span class="badge">${heading}</span>
      <h3>नमस्कार ${nameLabel} 👋</h3>
      <p>तुमच्या जन्मतारखेवर आधारित सविस्तर अंकशास्त्रीय विश्लेषण खाली दिले आहे.</p>
      <p><strong>जन्मतारीख:</strong> ${formatDateLabel(report.dob)} • <strong>अहवाल तयार केला:</strong> ${report.timestamp}</p>
      <div class="chip-row">
        <span class="chip">जन्मांक ${report.birthNumber}</span>
        <span class="chip">जीवनमार्गांक ${report.lifePathNumber}</span>
        <span class="chip">शुभांक ${report.luckyNumber}</span>
      </div>
    </div>
  `;

  const numberCards = `
    <div class="cards-grid">
      <article class="report-card">
        <div class="number-circle">${report.birthNumber}</div>
        <h3>जन्मांक</h3>
        <p>${report.birthProfile.description}</p>
        <ul class="kpi-list">
          <li>${report.birthProfile.personality}</li>
          <li>शक्ती: ${report.birthProfile.strengths.join(', ')}</li>
        </ul>
      </article>
      <article class="report-card">
        <div class="number-circle">${report.lifePathNumber}</div>
        <h3>जीवनमार्गांक</h3>
        <p>${report.lifePathProfile.description}</p>
        <ul class="kpi-list">
          <li>शुभ रंग: ${report.lifePathProfile.luckyColor}</li>
          <li>शुभ दिशा: ${report.lifePathProfile.luckyDirection}</li>
        </ul>
      </article>
      <article class="report-card">
        <div class="number-circle">${report.destinyNumber}</div>
        <h3>ध्रुवांक / Destiny Number</h3>
        <p>${report.lifePathProfile.description}</p>
        <ul class="kpi-list">
          <li>शुभ दिवस: ${report.lifePathProfile.luckyDay}</li>
          <li>शुभ रत्‍ना: ${report.lifePathProfile.luckyGemstone}</li>
        </ul>
      </article>
      <article class="report-card">
        <div class="number-circle">${report.soulNumber}</div>
        <h3>Soul Number</h3>
        <p>तुमच्या नावातील भावनात्मक आणि आध्यात्मिक प्रवृत्तीचे प्रतिबिंब.</p>
        <ul class="kpi-list">
          <li>शुभ धातू: ${report.lifePathProfile.luckyGemstone}</li>
          <li>सौम्य प्रवृत्ती: ${report.birthProfile.personality}</li>
        </ul>
      </article>
    </div>
  `;

  const majorCards = `
    <div class="cards-grid">
      <article class="detail-card">
        <h3>📊 मुख्य अंक</h3>
        <ul class="kpi-list">
          <li><strong>जन्मांक:</strong> ${report.birthNumber}</li>
          <li><strong>ध्रुवांक:</strong> ${report.destinyNumber}</li>
          <li><strong>जीवनमार्गांक:</strong> ${report.lifePathNumber}</li>
          <li><strong>Soul Number:</strong> ${report.soulNumber}</li>
          <li><strong>शुभांक:</strong> ${report.luckyNumber}</li>
        </ul>
      </article>
      <article class="detail-card">
        <h3>🌈 शुभ संकेत</h3>
        <ul class="kpi-list">
          <li><strong>शुभ रंग:</strong> ${report.lifePathProfile.luckyColor}</li>
          <li><strong>शुभ दिवस:</strong> ${report.lifePathProfile.luckyDay}</li>
          <li><strong>शुभ दिशा:</strong> ${report.lifePathProfile.luckyDirection}</li>
          <li><strong>शुभ रत्‍ना:</strong> ${report.lifePathProfile.luckyGemstone}</li>
          <li><strong>शुभ धातू:</strong> ${report.lifePathProfile.luckyGemstone}</li>
        </ul>
      </article>
      <article class="detail-card">
        <h3>🗓️ शुभ तारीख आणि महिने</h3>
        <ul class="kpi-list">
          <li><strong>शुभ तारीख:</strong> ${report.luckyDates.join(', ')}</li>
          <li><strong>शुभ महिने:</strong> ${report.luckyMonths.join(', ')}</li>
        </ul>
      </article>
      <article class="detail-card">
        <h3>💼 करिअर आणि व्यवसाय</h3>
        <ul class="kpi-list">
          <li><strong>लकी करिअर:</strong> ${report.lifePathProfile.career}</li>
          <li><strong>लकी बिझनेस:</strong> ${report.lifePathProfile.business}</li>
          <li><strong>लकी पार्टनर अंक:</strong> ${report.partnerNumber}</li>
        </ul>
      </article>
    </div>
  `;

  const personality = `
    <article class="detail-card">
      <h3>🧠 व्यक्तिमत्व अहवाल</h3>
      <p>${report.personalityReport}</p>
      <div class="cards-grid">
        <div class="mini-card">
          <h4>शक्ती</h4>
          <ul class="kpi-list">
            ${report.birthProfile.strengths.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="mini-card">
          <h4>कमजोरी</h4>
          <ul class="kpi-list">
            ${report.birthProfile.weaknesses.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
        <div class="mini-card">
          <h4>नेतृत्व</h4>
          <p>${report.birthProfile.career}</p>
        </div>
        <div class="mini-card">
          <h4>संवाद</h4>
          <p>${report.lifePathProfile.dailyGuidance}</p>
        </div>
      </div>
      <div class="cards-grid" style="margin-top: 1rem;">
        <div class="mini-card">
          <h4>भावनिक स्वभाव</h4>
          <p>${report.lifePathProfile.personality}</p>
        </div>
        <div class="mini-card">
          <h4>निर्णय क्षमता</h4>
          <p>${report.luckyProfile.motivationalAdvice}</p>
        </div>
        <div class="mini-card">
          <h4>बुद्धिमत्ता</h4>
          <p>${report.lifePathProfile.education}</p>
        </div>
        <div class="mini-card">
          <h4>आध्यात्मिक स्वभाव</h4>
          <p>${report.lifePathProfile.yearlyGuidance}</p>
        </div>
      </div>
    </article>
  `;

  const career = `
    <article class="detail-card">
      <h3>💼 करिअर भविष्य</h3>
      <div class="cards-grid">
        <div class="mini-card"><h4>Job</h4><p>${report.lifePathProfile.career}</p></div>
        <div class="mini-card"><h4>Business</h4><p>${report.lifePathProfile.business}</p></div>
        <div class="mini-card"><h4>Government Job</h4><p>${report.birthProfile.career}</p></div>
        <div class="mini-card"><h4>Private Job</h4><p>${report.birthProfile.education}</p></div>
        <div class="mini-card"><h4>Creative Career</h4><p>${report.birthProfile.personality}</p></div>
        <div class="mini-card"><h4>Technology</h4><p>${report.lifePathProfile.education}</p></div>
        <div class="mini-card"><h4>Education</h4><p>${report.lifePathProfile.yearlyGuidance}</p></div>
        <div class="mini-card"><h4>Finance</h4><p>${report.lifePathProfile.finance}</p></div>
      </div>
    </article>
  `;

  const relationship = `
    <article class="detail-card">
      <h3>💞 संबंध भविष्य</h3>
      <div class="cards-grid">
        <div class="mini-card"><h4>Love</h4><p>${report.lifePathProfile.love}</p></div>
        <div class="mini-card"><h4>Marriage</h4><p>${report.lifePathProfile.marriage}</p></div>
        <div class="mini-card"><h4>Family</h4><p>${report.lifePathProfile.family}</p></div>
        <div class="mini-card"><h4>Friends</h4><p>${report.lifePathProfile.friendship}</p></div>
        <div class="mini-card"><h4>Children</h4><p>${report.birthProfile.family}</p></div>
        <div class="mini-card"><h4>Compatibility</h4><p>${report.partnerProfile.title} सोबत उत्तम संयोग आहे.</p></div>
      </div>
    </article>
  `;

  const health = `
    <article class="detail-card">
      <h3>🩺 आरोग्य भविष्य</h3>
      <div class="cards-grid">
        <div class="mini-card"><h4>Energy</h4><p>${report.lifePathProfile.health}</p></div>
        <div class="mini-card"><h4>Stress</h4><p>${report.birthProfile.health}</p></div>
        <div class="mini-card"><h4>Mental Health</h4><p>${report.luckyProfile.dailyGuidance}</p></div>
        <div class="mini-card"><h4>Diet Advice</h4><p>संतुलित आहार, भरपूर पाणी आणि कमी ताण देणारी आहारपद्धत घ्या.</p></div>
        <div class="mini-card"><h4>Exercise Advice</h4><p>दररोज ३० मिनिटे हलके व्यायाम किंवा वॉक करा.</p></div>
        <div class="mini-card"><h4>Yoga Suggestion</h4><p>प्राणायाम आणि ध्यानाने मानसिक शांती मिळेल.</p></div>
      </div>
    </article>
  `;

  const daily = `
    <article class="detail-card">
      <h3>⭐ आजचे भविष्य</h3>
      <div class="cards-grid">
        <div class="mini-card"><h4>Today's Lucky Number</h4><p>${report.daily.luckyNumber}</p></div>
        <div class="mini-card"><h4>Lucky Color</h4><p>${report.daily.luckyColor}</p></div>
        <div class="mini-card"><h4>Lucky Time</h4><p>${report.daily.luckyTime}</p></div>
        <div class="mini-card"><h4>Lucky Direction</h4><p>${report.daily.luckyDirection}</p></div>
        <div class="mini-card"><h4>Today's Advice</h4><p>${report.daily.advice}</p></div>
        <div class="mini-card"><h4>Today's Warning</h4><p>${report.daily.warning}</p></div>
      </div>
    </article>
  `;

  const weekly = `
    <article class="detail-card">
      <h3>📅 साप्ताहिक भविष्य</h3>
      <div class="daily-grid">
        ${report.weekly.map((day) => `<div class="mini-card"><h4>${day.day}</h4><p>${day.advice}</p></div>`).join('')}
      </div>
    </article>
  `;

  const monthly = `
    <article class="detail-card">
      <h3>🌙 महिन्याचे मार्गदर्शन</h3>
      <div class="monthly-grid">
        <div class="mini-card"><h4>Career</h4><p>${report.monthly.career}</p></div>
        <div class="mini-card"><h4>Money</h4><p>${report.monthly.money}</p></div>
        <div class="mini-card"><h4>Love</h4><p>${report.monthly.love}</p></div>
        <div class="mini-card"><h4>Health</h4><p>${report.monthly.health}</p></div>
        <div class="mini-card"><h4>Travel</h4><p>${report.monthly.travel}</p></div>
        <div class="mini-card"><h4>Education</h4><p>${report.monthly.education}</p></div>
      </div>
    </article>
  `;

  const yearly = `
    <article class="detail-card">
      <h3>🌟 वार्षिक भविष्य</h3>
      <div class="yearly-grid">
        <div class="mini-card"><h4>Career</h4><p>${report.yearly.career}</p></div>
        <div class="mini-card"><h4>Business</h4><p>${report.yearly.business}</p></div>
        <div class="mini-card"><h4>Finance</h4><p>${report.yearly.finance}</p></div>
        <div class="mini-card"><h4>Health</h4><p>${report.yearly.health}</p></div>
        <div class="mini-card"><h4>Marriage</h4><p>${report.yearly.marriage}</p></div>
        <div class="mini-card"><h4>Property</h4><p>${report.yearly.property}</p></div>
        <div class="mini-card"><h4>Travel</h4><p>${report.yearly.travel}</p></div>
        <div class="mini-card"><h4>Spiritual Growth</h4><p>${report.yearly.spiritualGrowth}</p></div>
      </div>
      <div class="mini-card" style="margin-top:1rem;">
        <h4>Overall Rating</h4>
        <div class="progress-track"><div class="progress-bar" style="width:${report.yearly.rating * 10}%;"></div></div>
        <p style="margin-top: 0.6rem;">${report.yearly.rating}/10</p>
      </div>
    </article>
  `;

  const referenceCards = Object.entries(numerologyData || {})
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
        <p>${getLongPersonalityProfile(key) || profile.personality}</p>
      </article>
    `).join('');

  resultContent.innerHTML = `
    <div class="result-grid">${overview}${numberCards}</div>
    <div class="result-grid">${majorCards}</div>
    ${personality}
    ${career}
    ${relationship}
    ${health}
    ${daily}
    ${weekly}
    ${monthly}
    ${yearly}
    <article class="detail-card">
      <h3>📚 अंक-reference अहवाल</h3>
      <div class="reference-grid">${referenceCards}</div>
    </article>
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
  const text = `अंक ज्योतिष भविष्य\nनाव: ${currentReport.fullName || '—'}\nजन्मांक: ${currentReport.birthNumber}\nजीवनमार्गांक: ${currentReport.lifePathNumber}\nशुभांक: ${currentReport.luckyNumber}\nशुभ रंग: ${currentReport.lifePathProfile.luckyColor}`;
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
