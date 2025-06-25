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
  const container = document.getElementById("questions");
  container.innerHTML = "";

  const progress = JSON.parse(sessionStorage.getItem("progress") || "{}");

  questions.forEach((q, i) => {
    const div = document.createElement("div");

    const questionEl = document.createElement("p");
    questionEl.textContent = q.question;
    div.appendChild(questionEl);

    q.choices.forEach(choice => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `q-${i}`;
      radio.value = choice;

      if (progress[i] === choice) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        progress[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(radio);
      label.append(" " + choice);
      div.appendChild(label);
      div.appendChild(document.createElement("br"));
    });

    container.appendChild(div);
  });

  // Show last score if available
  const storedScore = localStorage.getItem("score");
  if (storedScore) {
    document.getElementById("score").textContent = `Your score is ${storedScore} out of 5.`;
  }
}

function evaluateQuiz() {
  const progress = JSON.parse(sessionStorage.getItem("progress") || "{}");
  let score = 0;

  questions.forEach((q, i) => {
    if (progress[i] === q.answer) {
      score++;
    }
  });

  document.getElementById("score").textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
}
document.getElementById("submit").addEventListener("click", evaluateQuiz);
renderQuestions();
