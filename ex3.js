const readline = require("readline");

class Questionaire {
  constructor(data, startQuestionId = "q1") {
    this.data = data;
    this.currentQuestionId = startQuestionId;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  askQuestion() {
    if (!this.currentQuestionId) {
      console.log("Thank you for completing the questionnaire!");
      this.rl.close();
      return;
    }

    const questionObj = this.data[this.currentQuestionId];
    if (!questionObj) {
      console.log("No more questions left!");
      this.rl.close();
      return;
    }

    const optionIdArray = Object.keys(questionObj.options);
    const questionText = `Question: ${
      questionObj.question
    }\nChoices (select number):\n${Object.keys(questionObj.options)
      .map((option, idx) => `${idx + 1}. ${option}`)
      .join("\n")}\nYour choice: `;

    this.rl.question(questionText, (userInput) => {
      const choiceIndex = Number(userInput);
      if (
        !Number.isInteger(choiceIndex) ||
        choiceIndex < 1 ||
        choiceIndex > optionIdArray.length
      ) {
        this.askQuestion();
        return;
      }
      this.currentQuestionId =
        questionObj.options[optionIdArray[choiceIndex - 1]];
      this.askQuestion();
    });
  }
}

const questions = {
  q1: {
    question: "Bạn có thích cà phê không?",
    options: { Có: "q2", Không: "q3" },
  },
  q2: {
    question: "Bạn thích cà phê như thế nào?",
    options: { Đen: "q4", Sữa: "q5" },
  },
  q3: {
    question: "Bạn thích đồ uống gì khác?",
    options: { Trà: "q6", "Nước ép": "q7" },
  },
  q4: {
    question: "Bạn thích uống nóng hay lạnh?",
    options: { Nóng: null, Lạnh: null },
  },
  q5: {
    question: "Bạn có thêm đường không?",
    options: { Có: null, Không: null },
  },
};

const questionnaire = new Questionaire(questions);

questionnaire.askQuestion();
