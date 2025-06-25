const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

function renderQuestions() {
  const questionsDiv = document.getElementById("questions");
  questionsDiv.innerHTML = "";

  // Restore progress if it exists
  let savedProgress = sessionStorage.getItem("progress");
  let progress = savedProgress ? JSON.parse(savedProgress) : {};

  questions.forEach((q, index) => {
    const container = document.createElement("div");
    const questionEl = document.createElement("p");
    questionEl.textContent = q.question;
    container.appendChild(questionEl);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      const radio = document.createElement("input");

      radio.type = "radio";
      radio.name = `question-${index}`;
      radio.value = choice;

      // Restore checked if in session
      if (progress[index] === choice) {
        radio.checked = true;
      }

      // Save to sessionStorage when clicked
      radio.addEventListener("change", () => {
        progress[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      container.appendChild(label);
      container.appendChild(document.createElement("br"));
    });

    questionsDiv.appendChild(container);
  });

  // Restore score if exists
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    document.getElementById("score").textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }
}

function calculateScore() {
  let score = 0;

  questions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="question-${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

document.getElementById("submit").addEventListener("click", calculateScore);
renderQuestions();
