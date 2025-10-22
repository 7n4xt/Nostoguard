const questions = [
    {
        question: "Qu'est-ce qu'un phishing (hameçonnage) ?",
        options: [
            "Une technique pour pêcher des poissons",
            "Une attaque visant à voler des informations sensibles",
            "Un type de virus informatique"
        ],
        correctAnswer: 1,
        explanation: "Le phishing est une technique frauduleuse visant à obtenir des informations confidentielles en se faisant passer pour une entité de confiance.",
        image: "./assets/Images/Phishing_email_1-min.png"
    },
    {
        question: "Cet e-mail est-il légitime ou une tentative de phishing ? ?",
        options: [
            "Non, C'est une tentative de phishing",
            "Oui, C'est légitime.",
            "Je ne sais pas"
        ],
        correctAnswer: 0,
        explanation: "Parce que le site n'est pas sécurisé par le protocole HTTPS.",
        image: "./assets/Images/Screenshot 2021-08-11 09.21.50.png"
    },
    {
        question: "Cet e-mail est-il légitime ou une tentative de phishing ? ?",
        options: [
            "Oui, C'est légitime.",
            "Je ne sais pas",
            "Non, C'est une tentative de phishing"
        ],
        correctAnswer: 2,
        explanation: "Le site n'est pas légitime car il vous redirige vers un faux site.",
        image: "./assets/Images/image_faux_mail.jpg"
    },
    {
        question: "Cet e-mail est-il légitime ou une tentative de phishing ? ?",
        options: [
            "Oui, C'est légitime.",
            "Non, C'est une tentative de phishing",
            "Je ne sais pas"
        ],
        correctAnswer: 1,
        explanation: "Le site n'est pas légitime car il vous redirige vers un faux site.",
        image: "./assets/Images/phishing3.png"
    },
    {
        question: "Que devez-vous faire si vous recevez un email suspect ?",
        options: [
            "Supprimer l'email sans l'ouvrir",
            "Ouvrir les pièces jointes pour vérifier leur contenu",
            "Répondre à l'email pour demander des informations supplémentaires"
        ],
        correctAnswer: 0,
        explanation: "Il est préférable de supprimer les emails suspects sans les ouvrir pour éviter tout risque d'infection.",
        image: "./assets/Images/publithings_seo_photo_which_illustrates_hacker_attacks_by_email_20e171fe-d9c7-44f1-80d4-1ed1ba1bac55-632x330.webp"
    },
    {
        question: "Que devez-vous faire avant de cliquer sur un lien dans un email ?",
        options: [
            "Cliquer directement sur le lien sans vérifier",
            "Vérifier l'URL du lien en survolant le lien avec la souris",
            "Partager le lien avec vos amis pour vérifier s'il est sûr"
        ],
        correctAnswer: 1,
        explanation: "Toujours vérifier l'URL d'un lien avant de cliquer dessus permet d'éviter les tentatives de phishing.",
        image: "./assets/Images/Verifier-un-site-avant-de-cliquer.png"
    },
    {
        question: "Pourquoi est-il risqué de brancher une clé USB trouvée sur un parking ?",
        options: [
            "Elle pourrait déclencher une alerte et verrouiller votre compte utilisateur",
            "Elle pourrait être infectée par un malware qui s’exécute automatiquement dès son insertion",
            "Elle pourrait contenir des fichiers illisibles qui bloquent votre système"
        ],
        correctAnswer: 1,
        explanation: "Des pirates utilisent des clés USB infectées pour propager des virus ou voler des données dès qu’elles sont branchées.",
        image: "./assets/Images/What-Is-a-USB-Drop-Attack-Featured-Image.jpg"
    },
    {
        question: "Peut-on se fier à un réseau public pour consulter ses données bancaires ?",
        options: [
            "Oui, si le réseau appartient à une entreprise connue",
            "Non, car les réseaux publics sont automatiquement contrôlés par des hackers",
            "Non, car un attaquant peut intercepter les données même si elles sont chiffrées"
        ],
        correctAnswer: 2,
        explanation: "Un réseau public peut être compromis, et un pirate peut intercepter vos données, même chiffrées.",
        image: "./assets/Images/blog-banking-details@2x.png"
    },
    {
        question: "À quelle fréquence faut-il changer son mot de passe ?",
        options: [
            "Tous les trois mois, quel que soit le contexte",
            "Tous les six mois ou immédiatement après une suspicion de fuite",
            "Une fois par an, si le mot de passe est long et complexe"
        ],
        correctAnswer: 1,
        explanation: "Changer régulièrement son mot de passe réduit le risque d’accès non autorisé en cas de fuite de données.",
        image: "./assets/Images/mot-de-passe.jpg"
    },
    {
        question: "Quelles informations ne faut-il jamais mettre sur ses réseaux sociaux ?",
        options: [
            "Son adresse IP et les noms de ses appareils connectés",
            "Son numéro de carte bancaire, même partiellement masqué",
            "Le nom et l’adresse de son employeur",
            "Toutes les réponses ci-dessus"
        ],
        correctAnswer: 3,
        explanation: "Publier des informations personnelles (adresse, numéro de carte, employeur…) facilite le vol d’identité et les cyberattaques.",
        image: "./assets/Images/Facebook-Hackers.jpg"
    }
];

let currentQuestion = 0;
let score = 0;
let questionAnswered = false;
let userAnswers = new Array(questions.length).fill(null);

function displayQuestion(index) {
    const question = questions[index];
    const container = document.getElementById('question-content');
    const imageElement = document.getElementById('question-image');

    // Update progress bar
    const progress = ((index) / questions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;

    // Update image
    imageElement.src = question.image;

    container.innerHTML = `
      <p class="text-xl font-semibold mb-6">${question.question}</p>
      <div class="space-y-4">
          ${question.options.map((option, optIndex) => `
              <label class="block p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${userAnswers[index] === optIndex ? 'selected-answer' : ''}">
                  <input type="radio" name="answer" value="${optIndex}" ${userAnswers[index] === optIndex ? 'checked' : ''} ${userAnswers[index] !== null ? 'disabled' : ''}>
                  ${option}
              </label>
          `).join('')}
      </div>
  `;

    // Add event listeners to radio buttons
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.addEventListener('change', checkAnswer);
    });

    // Show/hide feedback if question was already answered
    const feedbackContainer = document.getElementById('feedback-container');
    if (userAnswers[index] !== null) {
        const isCorrect = userAnswers[index] === question.correctAnswer;
        feedbackContainer.className = `mt-6 p-4 rounded-lg ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`;
        feedbackContainer.innerHTML = `<p class="font-bold">${isCorrect ? 'Correct!' : 'Incorrect.'}</p><p>${question.explanation}</p>`;
        feedbackContainer.classList.remove('hidden');
        document.getElementById('continue-btn').classList.remove('hidden');
    } else {
        feedbackContainer.classList.add('hidden');
        document.getElementById('continue-btn').classList.add('hidden');
    }

    // Update navigation buttons
    const backBtn = document.getElementById('back-btn');
    backBtn.disabled = index === 0;
}

function checkAnswer(event) {
    if (userAnswers[currentQuestion] !== null) return;

    const selectedAnswer = parseInt(event.target.value);
    const question = questions[currentQuestion];
    const feedbackContainer = document.getElementById('feedback-container');

    userAnswers[currentQuestion] = selectedAnswer;

    if (selectedAnswer === question.correctAnswer) {
        score++;
        feedbackContainer.className = 'mt-6 p-4 rounded-lg feedback-correct';
        feedbackContainer.innerHTML = `<p class="font-bold">Correct!</p><p>${question.explanation}</p>`;
    } else {
        feedbackContainer.className = 'mt-6 p-4 rounded-lg feedback-incorrect';
        feedbackContainer.innerHTML = `<p class="font-bold">Incorrect.</p><p>${question.explanation}</p>`;
    }

    feedbackContainer.classList.remove('hidden');
    document.getElementById('continue-btn').classList.remove('hidden');

    // Mark selected answer
    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.disabled = true;
        if (input.checked) {
            input.closest('label').classList.add('selected-answer');
        }
    });
}

function showResults() {
    document.getElementById('quiz-container').classList.add('hidden');
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.classList.remove('hidden');

    document.getElementById('final-score').textContent = score;
    const feedback = document.getElementById('final-feedback');

    if (score < 6) {
        feedback.textContent = "Vous devriez envisager de suivre notre formation pour améliorer vos connaissances en cybersécurité.";
    } else {
        feedback.textContent = "Félicitations ! Vous avez une bonne compréhension des bases de la cybersécurité.";
    }

    // Add event listener for the PDF download button
    document.getElementById('download-pdf').addEventListener('click', downloadPDF);
}

// Function to handle PDF download
function downloadPDF() {
    const pdfPath = "./resources/Nostroguard.pdf";

    // Create a hidden anchor element
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = "Guide_Cybersecurite_Nostroguard.pdf";

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Track download event (optional)
    console.log("PDF download initiated");
}

document.getElementById('continue-btn').addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion(currentQuestion);
    } else {
        showResults();
    }
});

document.getElementById('back-btn').addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion(currentQuestion);
    }
});

// Start the quiz
displayQuestion(currentQuestion);