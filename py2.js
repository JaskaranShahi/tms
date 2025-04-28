const questions = [
    {
        question: "What is a string in Python?",
        answers: [
            {text: "A mutable collection of characters", correct: false},
            {text: "An immutable sequence of characters", correct: true},
            {text: "A collection of numbers", correct: false},
            {text: "A special data type used to store lists of characters", correct: false}
        ]
    },
    {
        question: "Which of the following methods is used to convert a string to lowercase in Python?",
        answers: [
            {text: "lower()", correct: true},
            {text: "to_lower()", correct: false},
            {text: "downcase()", correct: false},
            {text: "convert()", correct: false}
        ]
    },
    {
        question: "What will be the result of the following code: my_string = 'Hello'; my_string[0] = 'h'?",
        answers: [
            {text: "It will raise a TypeError", correct: true},
            {text: "It will update the string to 'hello'", correct: false},
            {text: "It will not modify the string", correct: false},
            {text: "It will raise an IndexError", correct: false}
        ]
    },
     {
        question: "Which of the following is the correct syntax to create a string in Python?",
        answers : [
            {text: "string = {Hello, World}", correct: false},
            {text: "string = (Hello, World)", correct: false},
            {text: "string = 'Hello, World'", correct: true},
            {text: "string = <Hello, World>", correct: false}
        ]
    },
    {
        question: "How do you concatenate two strings in Python?",
        answers: [
            {text: "string1 + string2", correct: true},
            {text: "string1.append(string2)", correct: false},
            {text: "string1.concat(string2)", correct: false},
            {text: "string1.merge(string2)", correct: false}
        ]
    },
    {
        question: "What is the output of the following code: my_string = 'Python'; my_string[1:4]?",
        answers: [
            {text: "'yth'", correct: true},
            {text: "'y', 't', 'h'", correct: false},
            {text: "'P', 'y', 't', 'h', 'o', 'n'", correct: false},
            {text: "Error: Invalid slicing", correct: false}
        ]
    },

    {
        question: "Which of the following methods removes leading whitespaces from a string?",
        answers: [
            {text: "strip()", correct: false},
            {text: "lstrip()", correct: true},
            {text: "rstrip()", correct: false},
            {text: "trim()", correct: false}
        ]
    },
    
    {
        question: "Which of the following methods finds the length of ghe string?",
        answers: [
            {text: "len()", correct: true},
            {text: "length", correct:false},
            {text: "length()", correct: false},
            {text: "lth()", correct: false}
        ]
    },
    {
        question: "How do you check if a string contains a specific substring in Python?",
        answers: [
            {text: "string.has(substring)", correct: false},
            {text: "substring in string", correct: true},
            {text: "string.contains(substring)", correct: false},
            {text: "string.includes(substring)", correct: false}
        ]
    },
    {
        question: "Which of the following methods would you use to find the index of a substring in a string?",
        answers: [
            {text: "find()", correct: true},
            {text: "index()", correct: true},
            {text: "search()", correct: false},
            {text: "substring()", correct: false}
        ]
    }
    // Add more questions here as needed
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
            window.location.href = "python.html";  
        };
    } else {
        questionElement.innerHTML += `<br>Don't worry, you'll do better next time! Try again. 💪`;
        nextButton.innerHTML = "Retake Test";
        nextButton.onclick = function () {
            window.location.href = "py2.html";  
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





