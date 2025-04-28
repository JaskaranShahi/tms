const questions = [
    {
        question: "What is a tuple in Python?",
        answers: [
            {text: "A mutable collection of elements", correct: false},
            {text: "An immutable collection of ordered elements", correct: true},
            {text: "A special data type used to store lists of elements", correct: false},
            {text: "A collection of elements with no order", correct: false}
        ]
    },
    {
        question: "Which of the following methods can be used to add an element to a tuple in Python?",
        answers: [
            {text: "append()", correct: false},
            {text: "insert()", correct: false},
            {text: "Tuples are immutable and cannot be modified", correct: true},
            {text: "extend()", correct: false}
        ]
    },
    {
        question: "What is the result of the following code: my_tuple = (1, 2, 3); my_tuple[1] = 4?",
        answers: [
            {text: "It will raise a TypeError", correct: true},
            {text: "It will modify the tuple to (1, 4, 3)", correct: false},
            {text: "It will create a new tuple with the value (1, 4, 3)", correct: false},
            {text: "It will not raise any error", correct: false}
        ]
    },
    {
        question: "Which of the following is the correct syntax to create a tuple in Python?",
        answers: [
            {text: "tuple = (1, 2, 3)", correct: true},
            {text: "tuple = [1, 2, 3]", correct: false},
            {text: "tuple = {1, 2, 3}", correct: false},
            {text: "tuple = <1, 2, 3>", correct: false}
        ]
    },
    {
        question: "How do you convert a list to a tuple in Python?",
        answers: [
            {text: "tuple(list)", correct: true},
            {text: "list(tuple)", correct: false},
            {text: "tuple.add(list)", correct: false},
            {text: "list.convert_to_tuple()", correct: false}
        ]
    },
    {
        question: "What will be the output of the following code: my_tuple = (1, 2, 3, 4); my_tuple[1:3]?",
        answers: [
            {text: "(2, 3)", correct: true},
            {text: "[2, 3]", correct: false},
            {text: "(1, 2, 3)", correct: false},
            {text: "Error: Invalid slicing", correct: false}
        ]
    },
    {
        question: "Can you change the size of a tuple in Python after it is created?",
        answers: [
            {text: "Yes, tuples are mutable and their size can be changed.", correct: false},
            {text: "No, tuples are immutable and cannot be resized.", correct: true},
            {text: "Yes, but only by using the append() method.", correct: false},
            {text: "No, but you can modify the elements inside a tuple.", correct: false}
        ]
    },
    {
        question: "What is the result of the following code: my_tuple = (1, 2, 3); my_tuple + (4, 5)?",
        answers: [
            {text: "(1, 2, 3, 4, 5)", correct: true},
            {text: "(1, 2, 3, (4, 5))", correct: false},
            {text: "(4, 5, 1, 2, 3)", correct: false},
            {text: "Error: Invalid operation", correct: false}
        ]
    },
    {
        question: "Which of the following is true about a tuple in Python?",
        answers: [
            {text: "Tuples can contain elements of different types", correct: true},
            {text: "Tuples can only contain integers", correct: false},
            {text: "Tuples are always ordered and mutable", correct: false},
            {text: "Tuples must contain exactly three elements", correct: false}
        ]
    },
    {
        question: "What will be the result of the following code: my_tuple = (1, 2, 3); my_tuple[1:2]?",
        answers: [
            {text: "(2)", correct: true},
            {text: "(1, 2)", correct: false},
            {text: "[2]", correct: false},
            {text: "Error: Invalid slicing", correct: false}
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
            window.location.href = "python.html";  
        };
    } else {
        questionElement.innerHTML += `<br>Don't worry, you'll do better next time! Try again. 💪`;
        nextButton.innerHTML = "Retake Test";
        nextButton.onclick = function () {
            window.location.href = "py3.html";  
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
