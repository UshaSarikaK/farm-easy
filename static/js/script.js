let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showNextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlides();
}

function updateSlides() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentIndex) * 100}%)`;
    });
}

setInterval(showNextSlide, 3000); // Change the slide every 3 seconds
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
  
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target"); // Convert to number
        const current = +counter.innerText; // Convert to number
        const increment = target / 200; // Adjust speed by changing the divisor
  
        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 10); // Update every 10ms
        } else {
          counter.innerText = target; // Ensure exact number
        }
      };
  
      updateCount();
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    // Select the elements
    const chatbotIcon = document.getElementById('chatbot-icon');
    const forumContainer = document.getElementById('forum-container');
    const closeForumButton = document.getElementById('close-forum');
  
    // Function to toggle the visibility of the forum
    function toggleForum() {
      if (forumContainer.style.display === 'none' || forumContainer.style.display === '') {
        forumContainer.style.display = 'flex';  // Show the forum
      } else {
        forumContainer.style.display = 'none';  // Hide the forum
      }
    }
  
    // Add event listener to the chatbot icon to open/close the forum
    chatbotIcon.addEventListener('click', toggleForum);
  
    // Add event listener to the close button to close the forum
    closeForumButton.addEventListener('click', function () {
      forumContainer.style.display = 'none';  // Hide the forum when close button is clicked
    });
  
    // Function to handle question form submission
    document.getElementById('question-form').addEventListener('submit', function (e) {
      e.preventDefault();
  
      const title = document.getElementById('title').value;
      const details = document.getElementById('details').value;
  
      if (title && details) {
        // Create a new question element
        const questionContainer = document.createElement('div');
        questionContainer.classList.add('question');
  
        questionContainer.innerHTML = `
          <h3>${title}</h3>
          <p>${details}</p>
  
          <!-- Answers Section -->
          <div class="answers">
            <h4>Answers</h4>
            <div class="answer-list">
              <!-- Answers will be added here dynamically -->
            </div>
            <form class="answer-form">
              <input type="text" placeholder="Write your answer..." required>
              <button type="submit">Post Answer</button>
            </form>
          </div>
        `;
  
        // Enable answering functionality for the new question
        enableAnswering(questionContainer);
  
        // Add the new question to the forum
        document.getElementById('questions-container').appendChild(questionContainer);
  
        // Clear the form inputs
        document.getElementById('title').value = '';
        document.getElementById('details').value = '';
      }
    });
  
    // Function to enable answering functionality for a given question container
    function enableAnswering(questionContainer) {
      const answerForm = questionContainer.querySelector('.answer-form');
      const answerList = questionContainer.querySelector('.answer-list');
  
      answerForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const answerInput = answerForm.querySelector('input');
        const answerText = answerInput.value;
  
        if (answerText) {
          // Add the answer to the answer list
          const answer = document.createElement('div');
          answer.classList.add('answer');
          answer.textContent = answerText;
          answerList.appendChild(answer);
  
          // Clear the input
          answerInput.value = '';
        }
      });
    }
  
    // Enable answering for any pre-existing static question in the HTML
    document.querySelectorAll('.question').forEach(enableAnswering);
  });
  document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById("language-selector");

    // Pre-defined translations
    const translations = {
        en: {
            home: "Home",
            advisory: "Advisory",
            sell: "Sell",
            microfinance: "Microfinance",
            knowledgeHub: "Knowledge Hub",
            logOut: "Log Out",
            welcomeTitle: "Welcome to FarmEasy",
            welcomeDescription: "Your one-stop platform for affordable agricultural resources, services, and market opportunities.",
            empoweringTitle: "Empowering Farmers",
            empoweringDescription: "We provide the tools to grow your business and succeed.",
            connectingTitle: "Connecting Communities",
            connectingDescription: "Linking farmers to resources, markets, and services.",
            swiperCards: [
                "Crop Advisory: Get expert advice on crop care and yield improvement.",
                "Sell Your Produce: Connect with buyers and get fair prices for your harvest.",
                "Microfinance Options: Access small loans to fund your agricultural needs.",
            ],
        },
        hi: {
            home: "होम",
            advisory: "सलाह",
            sell: "बेचना",
            microfinance: "सूक्ष्म वित्त",
            knowledgeHub: "ज्ञान केंद्र",
            logOut: "लॉग आउट",
            welcomeTitle: "फार्मईज़ी में आपका स्वागत है",
            welcomeDescription: "किफायती कृषि संसाधनों, सेवाओं और बाजार के अवसरों के लिए आपका एकमात्र मंच।",
            empoweringTitle: "किसानों को सशक्त बनाना",
            empoweringDescription: "हम आपके व्यवसाय को बढ़ाने और सफल होने के लिए उपकरण प्रदान करते हैं।",
            connectingTitle: "समुदायों को जोड़ना",
            connectingDescription: "किसानों को संसाधनों, बाजारों और सेवाओं से जोड़ना।",
            swiperCards: [
                "फसल सलाह: फसल देखभाल और उपज सुधार पर विशेषज्ञ सलाह प्राप्त करें।",
                "अपना उत्पाद बेचें: खरीदारों से जुड़ें और अपनी फसल के लिए उचित मूल्य प्राप्त करें।",
                "सूक्ष्म वित्त विकल्प: अपने कृषि आवश्यकताओं को पूरा करने के लिए छोटे ऋण तक पहुँचें।",
            ],
        },
        te: {
            home: "హోమ్",
            advisory: "సలహా",
            sell: "అమ్మకం",
            microfinance: "మైక్రోఫైనాన్స్",
            knowledgeHub: "నాలెడ్జ్-హబ్",
            logOut: "లాగ్ అవుట్",
            welcomeTitle: "ఫార్మ్ ఈజీకి స్వాగతం",
            welcomeDescription: "తక్కువ ఖర్చుతో వ్యవసాయ వనరులు, सेवలు, మరియు మార్కెట్ అవకాశాలకు మీ స్టాప్.",
            empoweringTitle: "వ్యవసాయ కార్మికులను శక్తివంతం చేయడం",
            empoweringDescription: "మీ వ్యాపారాన్ని పెంచడానికి మరియు విజయవంతంగా ఉండటానికి మేము الأدوات فراہم చేస్తాము.",
            connectingTitle: "సమూహాలను అనుసంధానం",
            connectingDescription: "వ్యవసాయ కార్మికులను వనరులు, మార్కెట్లు, మరియు సేవలతో అనుసంధానం చేయడం.",
            swiperCards: [
                "పంట సలహాలు: పంట సంరక్షణ మరియు దిగుబడి మెరుగుదలకు నిపుణుల సలహా పొందండి.",
                "మీ ఉత్పత్తిని అమ్మండి: కొనుగోలుదారులతో కనెక్ట్ అవ్వండి మరియు మీ దిగుబడికి న్యాయమైన ధర పొందండి.",
                "మైక్రోఫైనాన్స్ ఎంపికలు: మీ వ్యవసాయ అవసరాలను నెరవేర్చడానికి చిన్న రుణాలు పొందండి.",
            ],
        },
        ml: {
            home: "ഹോം",
            advisory: "ഉപദേശം",
            sell: "വിൽക്കുക",
            microfinance: "മൈക്രോഫിനാൻസ്",
            knowledgeHub: "നോളജ്-ഹബ്",
            logOut: "ലോഗ് ഔട്ട്",
            welcomeTitle: "ഫാംഈസിയിൽ സ്വാഗതം",
            welcomeDescription: "ലഭ്യമായ കാർഷിക വിഭവങ്ങൾ, സേവനങ്ങൾ, വിപണി അവസരങ്ങൾ എന്നിവയ്ക്കുള്ള നിങ്ങളുടെ ഏകതാനമായ പ്ലാറ്റ്‌ഫോം.",
            empoweringTitle: "കർഷകരെ ശക്തിപ്പെടുത്തുന്നു",
            empoweringDescription: "നിങ്ങളുടെ ബിസിനസ്സ് വളരാൻ സഹായിക്കുന്ന ഉപകരണങ്ങൾ നാം നൽകുന്നു.",
            connectingTitle: "സമൂഹങ്ങളെ ബന്ധിപ്പിക്കുന്നു",
            connectingDescription: "കർഷകങ്ങളെ വിഭവങ്ങൾ, വിപണികൾ, സേവനങ്ങൾ എന്നിവയുമായി ബന്ധിപ്പിക്കുന്നു.",
            swiperCards: [
                "വിള ഉപദേശം: വിള സംരക്ഷണത്തിനും വിളവ് മെച്ചപ്പെടുത്തലിനും വിദഗ്ധരുടെ ഉപദേശം നേടുക.",
                "നിങ്ങളുടെ വിളകൾ വിൽക്കുക: വാങ്ങിയവരുമായി ബന്ധപ്പെടുകയും നിങ്ങളുടെ വിളക്ക് ന്യായമായ വില നേടുകയും ചെയ്യുക.",
                "മൈക്രോഫിനാൻസ് ഓപ്ഷനുകൾ: നിങ്ങളുടെ കാർഷിക ആവശ്യങ്ങൾക്കായി ചെറിയ വായ്പകൾ ലഭ്യമാക്കുക.",
            ],
        },
        kn: {
            home: "ಮುಖಪುಟ",
            advisory: "ಸಲಹೆ",
            sell: "ಮಾರಾಟ",
            microfinance: "ಮೈಕ್ರೋಫೈನಾನ್ಸ್",
            knowledgeHub: "ನಾಲೆಜ್-ಹಬ್",
            logOut: "ಲಾಗ್ ಔಟ್",
            welcomeTitle: "ಫಾರ್ಮ್ ಈಜಿಗೆ ಸ್ವಾಗತ",
            welcomeDescription: "ಸಲುವಾಗಿರುವ ಕೃಷಿ ಸಂಪತ್ತು, ಸೇವೆ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಅವಕಾಶಗಳಿಗೆ ನಿಮ್ಮ ಒಂದು ನಿಲುಗಡೆ.",
            empoweringTitle: "ಕೃಷಿಕರನ್ನು ಶಕ್ತಿವಂತಗೊಳಿಸುವುದು",
            empoweringDescription: "ನಾವು ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಬೆಳಸಲು ಮತ್ತು ಯಶಸ್ವಿಯಾಗಲು ಸಾಧನಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ.",
            connectingTitle: "ಸಮುದಾಯಗಳನ್ನು ಸಂಪರ್ಕಿಸುವುದು",
            connectingDescription: "ಕೃಷಿಕರನ್ನು ಸಂಪನ್ಮೂಲಗಳು, ಮಾರುಕಟ್ಟೆಗಳು ಮತ್ತು ಸೇವೆಗಳು ಮತ್ತು ಸೇವೆಗಳೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
            swiperCards: [
                "ಬೆಳೆ ಸಲಹೆ: ಬೆಳೆ ಆರೈಕೆ ಮತ್ತು ಫಲಿತಾಂಶ ಸುಧಾರಣೆಯ ಬಗ್ಗೆ ತಜ್ಞರ ಸಲಹೆ ಪಡೆಯಿರಿ.",
                "ನಿಮ್ಮ ಉತ್ಪನ್ನವನ್ನು ಮಾರಾಟ ಮಾಡಿ: ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಬೆಳೆಗಳಿಗೆ ನ್ಯಾಯಯುತ ಬೆಲೆ ಪಡೆಯಿರಿ.",
                "ಮೈಕ್ರೋಫೈನಾನ್ಸ್ ಆಯ್ಕೆಗಳು: ನಿಮ್ಮ ಕೃಷಿ ಅಗತ್ಯಗಳಿಗೆ ಸಣ್ಣ ಸಾಲಗಳನ್ನು ಪಡೆಯಿರಿ.",
            ],
        },
        ta: {
            home: "முகப்பு",
            advisory: "ஆலோசனை",
            sell: "விற்பனை",
            microfinance: "சிறு நிதி",
            knowledgeHub: "நோலஜ்-ஹப்",
            logOut: "வெளியேறு",
            welcomeTitle: "பார்மீசியில் வரவேற்கிறோம்",
            welcomeDescription: "குறைந்த செலவில் வேளாண் வளங்கள், சேவைகள், சந்தை வாய்ப்புகளுக்கான உங்கள் ஒரே இடம்.",
            empoweringTitle: "சிறுபிரிவுகளுக்கு வலிமை அளித்தல்",
            empoweringDescription: "எங்கள் பரிசோதனை உங்களுக்கு சிறந்த பங்குதாரர் அனுபவத்தை அளிக்கிறது.",
            connectingTitle: "சமூகங்களை இணைக்கின்றது",
            connectingDescription: "வேளாண் சமூகங்களை மாறும் சேவைகள் மற்றும் பயனுள்ள விகிதங்கள் ",
            swiperCards: [
                "பயிர் ஆலோசனை: பயிர் பராமரிப்பு மற்றும் மகசூல் மேம்பாட்டிற்கான நிபுணர் ஆலோசனையைப் பெறுங்கள்.",
                "உங்கள் விளைபொருட்களை விற்கவும்: வாங்குபவர்களுடன் இணைக்கவும் மற்றும் உங்கள் விளைவிற்கான நியாயமான விலையைப் பெறுங்கள்.",
                "சிறு நிதி விருப்பங்கள்: உங்கள் வேளாண் தேவைகளுக்காக சிறிய கடன்களை அணுகவும்.",
            ],
        },
    };

    // Function to update text content based on selected language
    function translatePage(language) {
        // Translate navbar items
        document.querySelector("a[href='index.html']").textContent = translations[language].home;
        document.querySelector("a[href='advisory.html']").textContent = translations[language].advisory;
        document.querySelector("a[href='sell.html']").textContent = translations[language].sell;
        document.querySelector("a[href='loans.html']").textContent = translations[language].microfinance;
        document.querySelector("a[href='knowledge-hub.html']").textContent = translations[language].knowledgeHub;
        document.querySelector("a[href='logout.html']").innerHTML = `<i class="fas fa-sign-out-alt"></i> ${translations[language].logOut}`;

        // Translate slider text
        document.querySelector(".slider .slide:nth-child(1) .text h2").textContent = translations[language].welcomeTitle;
        document.querySelector(".slider .slide:nth-child(1) .text p").textContent = translations[language].welcomeDescription;

        document.querySelector(".slider .slide:nth-child(2) .text h2").textContent = translations[language].empoweringTitle;
        document.querySelector(".slider .slide:nth-child(2) .text p").textContent = translations[language].empoweringDescription;

        document.querySelector(".slider .slide:nth-child(3) .text h2").textContent = translations[language].connectingTitle;
        document.querySelector(".slider .slide:nth-child(3) .text p").textContent = translations[language].connectingDescription;

        // Translate Swiper cards
        const swiperCards = translations[language].swiperCards;
        const swiperCardElements = document.querySelectorAll('.swiper .swiper-slide');
        swiperCardElements.forEach((card, index) => {
            card.querySelector('h3').textContent = swiperCards[index].split(':')[0]; // Title
            card.querySelector('p').textContent = swiperCards[index].split(':')[1]; // Description
        });
    }

    // Event listener for language selection
    languageSelector.addEventListener("change", (event) => {
        const selectedLanguage = event.target.value;
        translatePage(selectedLanguage);
    });

    // Initialize the page with default language
    translatePage("en");
});
