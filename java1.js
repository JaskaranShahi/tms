const questions = [
    {
        question: "What is a string in Java?",
        answers: [
            {text: "A mutable sequence of characters", correct: false},
            {text: "An immutable sequence of characters", correct: true},
            {text: "A special data type used to store lists of characters", correct: false},
            {text: "A collection of numbers", correct: false}
        ]
    },
    {
        question: "Which of the following methods is used to convert a string to lowercase in Java?",
        answers: [
            {text: "toLowerCase()", correct: true},
            {text: "convertToLower()", correct: false},
            {text: "lower()", correct: false},
            {text: "downcase()", correct: false}
        ]
    },
    {
        question: "What will be the result of the following code: `String myString = 'Hello'; myString[0] = 'h';`?",
        answers: [
            {text: "It will raise a StringIndexOutOfBoundsException", correct: true},
            {text: "It will update the string to 'hello'", correct: false},
            {text: "It will not modify the string", correct: false},
            {text: "It will raise a NullPointerException", correct: false}
        ]
    },
    {
        question: "Which of the following is the correct syntax to create a string in Java?",
        answers: [
            {text: "String str = {Hello, World}", correct: false},
            {text: "String str = (Hello, World)", correct: false},
            {text: "String str = 'Hello, World'", correct: true},
            {text: "String str = <Hello, World>", correct: false}
        ]
    },
    {
        question: "How do you concatenate two strings in Java?",
        answers: [
            {text: "string1 + string2", correct: true},
            {text: "string1.concat(string2)", correct: true},
            {text: "string1.merge(string2)", correct: false},
            {text: "string1.append(string2)", correct: false}
        ]
    },
    {
        question: "What is the output of the following code: `String myString = 'Java'; myString.substring(1, 3);`?",
        answers: [
            {text: "'av'", correct: true},
            {text: "'a', 'v'", correct: false},
            {text: "'J', 'a', 'v'", correct: false},
            {text: "Error: Invalid indices", correct: false}
        ]
    },
    // Additional Questions
    {
        question: "Which of the following methods is used to find the length of a string in Java?",
        answers: [
            {text: "size()", correct: false},
            {text: "length()", correct: true},
            {text: "getLength()", correct: false},
            {text: "count()", correct: false}
        ]
    },
    {
        question: "What will be the output of `String s = 'abc'; s.charAt(1);`?",
        answers: [
            {text: "'a'", correct: false},
            {text: "'b'", correct: true},
            {text: "'c'", correct: false},
            {text: "Error: Index out of bounds", correct: false}
        ]
    },
   
    {
        question: "Which of the following will return the index of the first occurrence of the character 'a' in the string 'banana'?",
        answers: [
            {text: "banana.indexOf('a')", correct: true},
            {text: "banana.charAt('a')", correct: false},
            {text: "banana.indexOf(a)", correct: false},
            {text: "banana.indexOf('b')", correct: false}
        ]
    },
    {
        question: "What is the result of the following code: `String str = 'Hello'; str.equals('hello');`?",
        answers: [
            {text: "true", correct: false},
            {text: "false", correct: true},
            {text: "Error: Compilation error", correct: false},
            {text: "null", correct: false}
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
            window.location.href = "java.html";  
        };
    } else {
        questionElement.innerHTML += `<br>Don't worry, you'll do better next time! Try again. 💪`;
        nextButton.innerHTML = "Retake Test";
        nextButton.onclick = function () {
            window.location.href = "java1.html";  
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

