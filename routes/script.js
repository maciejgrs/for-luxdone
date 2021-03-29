 
 
 
const startBtn = document.querySelector("#start-btn");
const nextBtn = document.querySelector("#next-btn");
const questionsContainer = document.querySelector("#question-container");
const header = document.querySelector("h2");
const question = document.querySelector("#question");
const answerBtns = document.querySelectorAll(".answer");
const answerContainer = document.querySelector("#answer-buttons");
const container = document.querySelector(".container");
const learning = document.querySelector("#learning-btn");

 
  let target;
let answer;
let correctAnswer;
let country;
let questionNumber = 0;
let resultsArr = [];
let num = 1;

const chooseLevel = () => {
  answerBtns.forEach((el) => {
    el.addEventListener("click", (e) => {
      target = e.target.id;
      el.style.backgroundColor = "green";
      Array.from(answerBtns).filter((elem) => {
        if (elem.id !== el.id) {
          elem.style.background = "hsl(var(--hue), 100%, 50%)";
          return;
        }
      });
    });
  });
};

chooseLevel();

 const buildQuiz = (arr) => {
  let QuestionsArr = arr.sort(() => Math.random() - Math.random()).slice(0, 4);

  if (target !== "") {
    country = QuestionsArr[0].name;
    correctAnswer = QuestionsArr[0].capital;

    header.classList.add("hide");
    startBtn.classList.add("hide");
    nextBtn.classList.remove("hide");

    let capitals = [
      QuestionsArr[0].capital,
      QuestionsArr[1].capital,
      QuestionsArr[2].capital,
      QuestionsArr[3].capital,
    ];

    question.innerText = `What is the capital of ${country}`;
    answerBtns.forEach((el) => {
      let random = capitals
        .sort(() => Math.random() - Math.random())
        .slice(0, 1);
      capitals.splice(random, 1);

      el.innerText = random;
    });

    arr.splice(arr.indexOf(QuestionsArr[0]), 1);

    answerContainer.addEventListener("click", checkClick);
  }
};

const checkClick = (e) => {
  answer = e.target.innerText;

  return answer;
};
const checkAnswer = (answer, correctAnswer, country) => {
  if (answer.toString() === correctAnswer.toString()) {
    questionNumber++;
    resultsArr.push([answer, correctAnswer, country, "correct!"]);
  } else {
    questionNumber++;
    resultsArr.push([
      answer,
      correctAnswer,
      country,
      `wrong! Correct is ${correctAnswer}`,
    ]);
  }
};
startBtn.addEventListener("click", () => {
  if (target) {
    fetchApi(false);
    answersNormalColor();
    learning.style.display = "none";
  } else {
    alert("Pick level!");
  }
});

const answersNormalColor = () => {
  Array.from(answerBtns).forEach(
    (el) => (el.style.background = "hsl(var(--hue), 100%, 50%)")
  );
};

nextBtn.addEventListener("click", () => {
  if (answer) {
    checkAnswer(answer, correctAnswer, country);

    buildQuiz(arr);
    answersNormalColor();
    displayResults();
    answer = "";
  } else {
    alert("Pick something!");
  }
});

const displayResults = () => {
  if (questionNumber === 10) {
    container.innerHTML = "";
    let numberOfCorrect = 0;
    resultsArr.forEach((el) => {
      let [answer, correct, country, correctness] = el;

      if (correctness === "correct!") {
        numberOfCorrect++;
        buildTheResults(answer, country, correctness, "green");
      } else {
        buildTheResults(answer, country, correctness, "red");
      }
    });
    buildStaticElResults(numberOfCorrect);
  }
};

const buildTheResults = (answer, country, correctness, color) => {
  const resultDiv = document.createElement("div");
  resultDiv.style.color = color;
  resultDiv.style.marginBottom = "10px";
  resultDiv.innerText = `${num}. Capital of ${country}? Your answered ${answer} and it was ${correctness}`;
  container.appendChild(resultDiv);
  num++;
};

const buildStaticElResults = (numberOfCorrect) => {
  const span = document.createElement("div");
  span.innerText = `Your result is ${numberOfCorrect}/10!`;
  span.style.marginBottom = "10px";
  container.appendChild(span);
  backToLobbyButtonCreate()
};

const learn = () => {
  container.innerHTML = "Type name of the country to see his capital";
  const input = document.createElement("input");
  input.style.marginLeft = "12px";
  input.style.marginRight = "12px";
  container.appendChild(input);
   backToLobbyButtonCreate()
  fetchApi(true);
  input.addEventListener("input", (event) => {
    filterData(arr, event.target.value);
  });
};
const backToLobbyButtonCreate = () => {
	const button = document.createElement("button");
	button.classList.add("btn");
	button.innerText = "Back to the lobby";
	container.appendChild(button);
	button.addEventListener("click", () => {
	  window.location.reload();
	});
}
learning.addEventListener("click", learn);


 
console.log(arr);