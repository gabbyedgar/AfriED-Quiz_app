//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 31;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "What does HTML stand for?",
    options: ["Hyperlink Text Markup Language", "HyperText Markup Language", 
    "High-level Text Manipulation Language", " Home Tool Markup Language"],
    correct: "HyperText Markup Language",
  },
  {
    id: "1",
    question: "Which CSS property is used to change the text color of an element?",
    options: ["text-style", "color", "font-color", "text-color"],
    correct: "color",
  },
  {
    id: "2",
    question: "Which programming language is commonly used for adding interactivity to web pages?",
    options: ["Java", "Python", "JavaScript", "C++"],
    correct: "JavaScript",
  },
  {
    id: "3",
    question: "What is the purpose of a CSS framework?",
    options: ["To provide pre-designed templates for web pages", 
"To create complex animations", "To manage server-side operations",
 "To generate random color schemes"
],
    correct: "To provide pre-designed templates for web pages",
  },
  {
    id: "4",
    question: " Which HTML tag is used for creating an ordered list??",
    options: ["dl", "ul", "ol", "li"],
    correct: "ol",
  },
  {
    id: "5",
    question: "Who invented Computer?",
    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
    correct: "Charles Babbage",
  },
  {
    id: "6",
    question: "What does the acronym URL stand for?",
    options: ["Uniform Resource Locator", "Universal Resource Language", "Uniform Retrieval Link", "Universal Reference Locator"],
    correct: "Uniform Resource Locator",
  },
  {
    id: "7",
    question: "Which CSS property is used to control the spacing between elements?",
    options: [" padding", "spacing", "margin", "border"],
    correct: " padding",
  },
  {
    id: "8",
    question: "What is the purpose of the viewport meta tag in HTML?",
    options: ["It specifies the background color of the web page", "It sets the title of the web page.", "It defines the character encoding of the page.", "It adjusts the layout and scaling of the web page on different devices."],
    correct: "It adjusts the layout and scaling of the web page on different devices.",
  },
  {
    id: "9",
    question: "Which HTTP status code indicates a successful response?",
    options: ["400 Bad Request", "404 Not Found", "200 OK", "500 Internal Server Error"],
    correct: " 200 OK",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Your score is " + scoreCount + " out of " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 31;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 31;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};