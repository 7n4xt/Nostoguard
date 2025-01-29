const questions = [
  {
      question: "Quel est le meilleur moyen de protéger vos comptes en ligne ?",
      options: [
          "Utiliser le même mot de passe pour tous les comptes",
          "Utiliser des mots de passe forts et uniques pour chaque compte",
          "Écrire vos mots de passe sur un papier"
      ],
      correctAnswer: 1,
      explanation: "Utiliser des mots de passe uniques et forts pour chaque compte est la meilleure pratique pour protéger vos comptes en ligne.",
      image: "/api/placeholder/600/300?text=Password+Security"
  },
  {
      question: "Que devez-vous faire si vous recevez un email suspect ?",
      options: [
          "Ouvrir les pièces jointes pour vérifier leur contenu",
          "Supprimer l'email sans l'ouvrir",
          "Répondre à l'email pour demander des informations supplémentaires"
      ],
      correctAnswer: 1,
      explanation: "Il est préférable de supprimer les emails suspects sans les ouvrir pour éviter tout risque d'infection.",
      image: "/api/placeholder/600/300?text=Suspicious+Email"
  },
  {
      question: "Quelle est la meilleure pratique pour se protéger contre les logiciels malveillants ?",
      options: [
          "Ne jamais mettre à jour vos logiciels",
          "Installer un antivirus et maintenir vos logiciels à jour",
          "Télécharger des logiciels depuis des sites non officiels"
      ],
      correctAnswer: 1,
      explanation: "Maintenir vos logiciels à jour et avoir un antivirus actif sont essentiels pour la protection contre les malwares.",
      image: "/api/placeholder/600/300?text=Malware+Protection"
  },
  {
      question: "Que devez-vous faire avant de cliquer sur un lien dans un email ?",
      options: [
          "Vérifier l'URL du lien en survolant le lien avec la souris",
          "Cliquer directement sur le lien sans vérifier",
          "Partager le lien avec vos amis pour vérifier s'il est sûr"
      ],
      correctAnswer: 0,
      explanation: "Toujours vérifier l'URL d'un lien avant de cliquer dessus permet d'éviter les tentatives de phishing.",
      image: "/api/placeholder/600/300?text=Link+Verification"
  },
  {
      question: "Qu'est-ce qu'un phishing (hameçonnage) ?",
      options: [
          "Une technique pour pêcher des poissons",
          "Une attaque visant à voler des informations sensibles",
          "Un type de virus informatique"
      ],
      correctAnswer: 1,
      explanation: "Le phishing est une technique frauduleuse visant à obtenir des informations confidentielles en se faisant passer pour une entité de confiance.",
      image: "/api/placeholder/600/300?text=Phishing+Attack"
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
  
  if (score < 3) {
      feedback.textContent = "Vous devriez envisager de suivre notre formation pour améliorer vos connaissances en cybersécurité.";
  } else {
      feedback.textContent = "Félicitations ! Vous avez une bonne compréhension des bases de la cybersécurité.";
  }
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