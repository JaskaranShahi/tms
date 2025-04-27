const questions = [
    {
        question: "What is JavaScript?",
        answers: [
            { text: "JavaScript is a scripting language used to make the website interactive", correct: true },
            { text: "JavaScript is an assembly language used to make the website interactive", correct: false },
            { text: "JavaScript is a compiled language used to make the website interactive", correct: false },
            { text: "None of the mentioned", correct: false }
        ]
    },
    {
        question: "Arrays in JavaScript are defined by which of the following statements?",
        answers: [
            { text: "It is an ordered list of values", correct: true },
            { text: "It is an ordered list of objects", correct: false },
            { text: "It is an ordered list of string", correct: false },
            { text: "It is an ordered list of functions", correct: false }
        ]
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: [
            { text: "Null type", correct: false },
            { text: "Undefined type", correct: false },
            { text: "Number type", correct: false },
            { text: "All of the mentioned", correct: true }
        ]
    },
    {
        question: "Where is Client-side JavaScript code embedded within HTML documents?",
        answers: [
            { text: "A URL that uses the special javascript:code", correct: false },
            { text: "A URL that uses the special javascript:protocol", correct: true },
            { text: "A URL that uses the special javascript:encoding", correct: false },
            { text: "A URL that uses the special javascript:stack", correct: false }
        ]
    },
    {
        question: "Which of the following object is the main entry point to all client-side JavaScript features and APIs?",
        answers: [
            { text: "Position", correct: false },
            { text: "Window", correct: true },
            { text: "Standard", correct: false },
            { text: "Location", correct: false }
        ]
    },
    // Additional Questions
    {
        question: "Which method is used to parse a string into a number in JavaScript?",
        answers: [
            { text: "parseInt()", correct: true },
            { text: "toNumber()", correct: false },
            { text: "parseFloat()", correct: false },
            { text: "parseString()", correct: false }
        ]
    },
    {
        question: "Which of the following is used to define a JavaScript function?",
        answers: [
            { text: "function myFunction() {}", correct: true },
            { text: "function = myFunction() {}", correct: false },
            { text: "myFunction() = function {}", correct: false },
            { text: "function: myFunction() {}", correct: false }
        ]
    },
    {
        question: "Which event occurs when the user clicks on an HTML element in JavaScript?",
        answers: [
            { text: "onmouseover", correct: false },
            { text: "onfocus", correct: false },
            { text: "onclick", correct: true },
            { text: "onchange", correct: false }
        ]
    },
    {
        question: "What does the 'this' keyword refer to in JavaScript?",
        answers: [
            { text: "The function itself", correct: false },
            { text: "The window object", correct: false },
            { text: "The object that called the function", correct: true },
            { text: "The document object", correct: false }
        ]
    },
    {
        question: "Which of the following is the correct way to write a comment in JavaScript?",
        answers: [
            { text: "// This is a comment", correct: true },
            { text: "# This is a comment", correct: false },
            { text: "/* This is a comment */", correct: true },
            { text: "comment: This is a comment", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const questionNumberElement = document.getElementById("question-number");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let globalTimer;
let timeLeft = 15; 
let globalTimeLeft = 150;
let startTime; 


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    startTime = Date.now(); 
    nextButton.innerHTML = "Next";
    showQuestion();
    startGlobalTimer(); 

}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    
    questionNumberElement.innerHTML = `${questionNo}/${questions.length}`;
    
    questionElement.innerHTML = currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    startTimer(); 
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    clearInterval(timer); 
    timeLeft = 15; 
    timerElement.innerHTML = timeLeft;
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    clearInterval(timer); 
}


function showScore() {
    resetState();
    
  
    let timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);
    let percentage = (score / questions.length) * 100;
    let grade = getGrade(percentage);  
    
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br>Percentage: ${percentage.toFixed(2)}%<br>Grade: ${grade}<br>Time Taken: ${timeTaken} seconds`;

  
    if (percentage >= 70) {
        questionElement.innerHTML += `<br>Congratulations! You passed the test! 🎉`;
        nextButton.innerHTML = "Take Another Test";
        nextButton.onclick = function () {
            window.location.href = "fee.html";  
        };
    } else {
        questionElement.innerHTML += `<br>Don't worry, you'll do better next time! Try again. 💪`;
        nextButton.innerHTML = "Retake Test";
        nextButton.onclick = function () {
            window.location.href = "fee3.html";  
        };
    }
    timerElement.style.display="none";
    nextButton.style.display = "block";
}


function getGrade(percentage) {
    if (percentage >= 90) {
        return "A";
    } else if (percentage >= 80) {
        return "B";
    } else if (percentage >= 70) {
        return "C";
    } else if (percentage >= 60) {
        return "D";
    } else if (percentage >= 50) {
        return "E";
    } else {
        return "F";
    }
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        timerElement.innerHTML = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNextButton(); 
        }
    }, 1000);
}


function startGlobalTimer() {
    globalTimer = setInterval(function () {
        globalTimeLeft--;
        if (globalTimeLeft <= 0) {
            clearInterval(globalTimer);
            showScore();
        }
    }, 1000);
}

nextButton.addEventListener("click", handleNextButton);
startQuiz(); 

