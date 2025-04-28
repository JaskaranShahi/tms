const questions = [
    {
        question: "What is a list in Python?",
        answers: [
            {text: "A collection of elements that can store multiple values of the same type", correct: false},
            {text: "A mutable, ordered collection that can store elements of different data types", correct: true},
            {text: "An immutable, unordered collection", correct: false},
            {text: "A special data type used to store only strings", correct: false}
        ]
    },
  
    {
        question: "What will be the result of the following code: `my_list = [1, 2, 3]; my_list[1] = 4`?",
        answers: [
            {text: "It will raise an IndexError", correct: false},
            {text: "It will update the list to [1, 4, 3]", correct: true},
            {text: "It will not modify the list", correct: false},
            {text: "It will delete the element at index 1", correct: false}
        ]
    },
    {
        question: "Which of the following is the correct syntax to create a list in Python?",
        answers: [
            {text: "list = {1, 2, 3}", correct: false},
            {text: "list = (1, 2, 3)", correct: false},
            {text: "list = [1, 2, 3]", correct: true},
            {text: "list = <1, 2, 3>", correct: false}
        ]
    },
    {
        question: "How do you remove the first occurrence of an element from a list in Python?",
        answers: [
            {text: "list.remove(element)", correct: true},
            {text: "list.delete(element)", correct: false},
            {text: "list.pop(element)", correct: false},
            {text: "list.removeAt(element)", correct: false}
        ]
    },
    {
        question: "What is the output of the following code: `my_list = [1, 2, 3]; my_list * 2`?",
        answers: [
            {text: "[1, 2, 3, 1, 2, 3]", correct: true},
            {text: "[2, 4, 6]", correct: false},
            {text: "[1, 2, 3, 2, 4, 6]", correct: false},
            {text: "Error: Invalid operation", correct: false}
        ]
    },
    {
        question: "How do you check if an element is present in a list in Python?",
        answers: [
            {text: "list.contains(element)", correct: false},
            {text: "element in list", correct: true},
            {text: "list.has(element)", correct: false},
            {text: "list.exists(element)", correct: false}
        ]
    },
    {
        question: "What will be the output of the following code: `my_list = [1, 2, 3, 4, 5]; my_list[1:4]`?",
        answers: [
            {text: "[2, 3, 4]", correct: true},
            {text: "[1, 2, 3, 4]", correct: false},
            {text: "[2, 3]", correct: false},
            {text: "[4, 5]", correct: false}
        ]
    },
    {
        question: "What is the output of the following code: `my_list = [1, 2, 3]; my_list.pop()`?",
        answers: [
            {text: "1", correct: false},
            {text: "3", correct: true},
            {text: "Error: Invalid operation", correct: false},
            {text: "[1, 2]", correct: false}
        ]
    },
    {
        question: "Which of the following methods is used to combine two lists in Python?",
        answers: [
            {text: "combine()", correct: false},
            {text: "concat()", correct: false},
            {text: "extend()", correct: true},
            {text: "merge()", correct: false}
        ]
    },
    {
        question: "What is the default value of a list element when the list is created with a fixed size in Python?",
        answers: [
            {text: "None", correct: true},
            {text: "0", correct: false},
            {text: "Empty", correct: false},
            {text: "Undefined", correct: false}
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
            window.location.href = "py1.html";  
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

