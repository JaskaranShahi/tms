const questions = [
    {
        question: "Which of the following is the correct syntax for a 'for' loop in Java?",
        answers: [
            {text: "for (int i = 0; i < 10; i++)", correct: true},
            {text: "for (int i = 0; i < 10)", correct: false},
            {text: "for (i = 0; i < 10; i++)", correct: false},
            {text: "for int i = 0; i < 10; i++", correct: false}
        ]
    },
  
    {
        question: "What will happen if the condition in a while loop is always true?",
        answers: [
            {text: "The loop will run indefinitely", correct: true},
            {text: "The loop will execute only once", correct: false},
            {text: "The loop will never execute", correct: false},
            {text: "The loop will execute a fixed number of times", correct: false}
        ]
    },
    {
        question: "Which loop is guaranteed to execute at least once, even if the condition is false?",
        answers: [
            {text: "for loop", correct: false},
            {text: "while loop", correct: false},
            {text: "do-while loop", correct: true},
            {text: "None of the above", correct: false}
        ]
    },
    {
        question: "What is the output of the following code: `int sum = 0; for (int i = 0; i < 3; i++) { sum += i; } System.out.println(sum);`?",
        answers: [
            {text: "6", correct: false},
            {text: "3", correct: true},
            {text: "0", correct: false},
            {text: "3", correct: false}
        ]
    },
    {
        question: "Which of the following statements is true about a 'for-each' loop in Java?",
        answers: [
            {text: "It is used to iterate over arrays and collections", correct: true},
            {text: "It works only with arrays", correct: false},
            {text: "It requires an index", correct: false},
            {text: "It can only be used with lists", correct: false}
        ]
    },
    // Additional Questions
    {
        question: "What will be the output of the following code: `int[] arr = {1, 2, 3}; for(int num : arr) { System.out.print(num); }`?",
        answers: [
            {text: "1 2 3", correct: true},
            {text: "123", correct: false},
            {text: "Error", correct: false},
            {text: "1, 2, 3", correct: false}
        ]
    },
    {
        question: "Which of the following loops is ideal for iterating over a known number of times?",
        answers: [
            {text: "for loop", correct: true},
            {text: "while loop", correct: false},
            {text: "do-while loop", correct: false},
            {text: "None of the above", correct: false}
        ]
    },
    {
        question: "What is the result of the following code: `int i = 10; do { System.out.println(i); i--; } while(i > 0);`?",
        answers: [
            {text: "10, 9, 8, 7, 6, 5, 4, 3, 2, 1", correct: true},
            {text: "10, 9, 8, 7, 6, 5, 4, 3, 2", correct: false},
            {text: "9, 8, 7, 6, 5, 4, 3, 2, 1", correct: false},
            {text: "Infinite loop", correct: false}
        ]
    },
    {
        question: "What will be the output of the following code: `int i = 0; do { System.out.println(i); i++; } while(i < 3);`?",
        answers: [
            {text: "0 1 2", correct: true},
            {text: "0 1 2 3", correct: false},
            {text: "1 2 3", correct: false},
            {text: "3 2 1", correct: false}
        ]
    },
  
    {
        question: "Which of the following statements is true about the 'continue' statement in Java?",
        answers: [
            {text: "It skips the current iteration and proceeds to the next iteration of the loop", correct: true},
            {text: "It terminates the loop", correct: false},
            {text: "It exits the entire program", correct: false},
            {text: "It skips the first iteration of the loop", correct: false}
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
            window.location.href = "java3.html";  
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

