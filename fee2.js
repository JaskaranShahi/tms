const questions = [
    {
        question: "What is CSS?",
        answers: [
            {text: "CSS is a style sheet language", correct: false},
            {text: "CSS is designed to separate the presentation and content, including layout and colors", correct: false},
            {text: "CSS is the language used to style the HTML documents", correct: false},
            {text: "All of the mentioned", correct: true}
        ]
    },
    {
        question: "Which of the following CSS properties is used to change the background color of an element?",
        answers: [
            {text: "color", correct: false},
            {text: "background-color", correct: true},
            {text: "bgcolor", correct: false},
            {text: "text-color", correct: false}
        ]
    },
    {
        question: "Which of the following CSS selectors are used to specify a group of elements?",
        answers: [
            {text: "tag", correct: false},
            {text: "id", correct: false},
            {text: "class", correct: true},
            {text: "both tag and class", correct: false}
        ]
    },
    {
        question: "Which of the following has introduced text, list, box, margin, border, color, and background properties?",
        answers: [
            {text: "HTML", correct: false},
            {text: "PHP", correct: false},
            {text: "CSS", correct: true},
            {text: "None of the above", correct: false}
        ]
    },
    {
        question: "Which of the following CSS property is used to make the text bold?",
        answers: [
            {text: "text-decoration: bold", correct: false},
            {text: "font-weight: bold", correct: true},
            {text: "font-style: bold", correct: false},
            {text: "text-align: bold", correct: false}
        ]
    },
    // Additional Questions
    {
        question: "Which CSS property is used to change the text color?",
        answers: [
            {text: "color", correct: true},
            {text: "background-color", correct: false},
            {text: "font-color", correct: false},
            {text: "text-color", correct: false}
        ]
    },
    {
        question: "What is the purpose of the CSS 'z-index' property?",
        answers: [
            {text: "It controls the opacity of an element.", correct: false},
            {text: "It sets the visibility of an element.", correct: false},
            {text: "It controls the stacking order of elements.", correct: true},
            {text: "It determines the size of an element.", correct: false}
        ]
    },
    {
        question: "Which property is used to change the font size in CSS?",
        answers: [
            {text: "font-size", correct: true},
            {text: "text-size", correct: false},
            {text: "font-style", correct: false},
            {text: "font-weight", correct: false}
        ]
    },
    {
        question: "What is the default value of the 'position' property in CSS?",
        answers: [
            {text: "absolute", correct: false},
            {text: "relative", correct: false},
            {text: "static", correct: true},
            {text: "fixed", correct: false}
        ]
    },
    {
        question: "Which of the following is used to apply a CSS rule to only one element?",
        answers: [
            {text: "Class selector", correct: false},
            {text: "ID selector", correct: true},
            {text: "Universal selector", correct: false},
            {text: "Attribute selector", correct: false}
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
            window.location.href = "fee2.html";  
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

