const questions = [
    {
        question: "What is an array in Java?",
        answers: [
            {text: "A mutable sequence of elements", correct: false},
            {text: "An immutable sequence of elements", correct: false},
            {text: "A fixed-size collection of elements of the same type", correct: true},
            {text: "A dynamic collection of elements", correct: false}
        ]
    },
    {
        question: "Which of the following methods is used to find the length of an array in Java?",
        answers: [
            {text: "length()", correct: false},
            {text: "getLength()", correct: false},
            {text: "size()", correct: false},
            {text: "length", correct: true}
        ]
    },
    {
        question: "What will be the result of the following code: `int[] myArray = {1, 2, 3}; myArray[3] = 4;`?",
        answers: [
            {text: "It will raise an ArrayIndexOutOfBoundsException", correct: true},
            {text: "It will modify the array to {1, 2, 4}", correct: false},
            {text: "It will add an element at index 3", correct: false},
            {text: "It will not raise any error", correct: false}
        ]
    },
    {
        question: "Which of the following is the correct syntax to create an array in Java?",
        answers: [
            {text: "int[] arr = (1, 2, 3)", correct: false},
            {text: "int[] arr = [1, 2, 3]", correct: false},
            {text: "int[] arr = {1, 2, 3}", correct: true},
            {text: "int arr = <1, 2, 3>", correct: false}
        ]
    },
    {
        question: "How do you initialize a 2D array in Java?",
        answers: [
            {text: "int[][] arr = new int[2][3];", correct: true},
            {text: "int[][] arr = new int[2, 3];", correct: false},
            {text: "int[][] arr = {{1, 2}, {3, 4}};", correct: true},
            {text: "int arr = new int[2, 3];", correct: false}
        ]
    },
    {
        question: "What is the default value of an uninitialized element in an integer array in Java?",
        answers: [
            {text: "0", correct: true},
            {text: "null", correct: false},
            {text: "undefined", correct: false},
            {text: "1", correct: false}
        ]
    },
    // Additional Questions
    {
        question: "Which of the following is used to declare an array of 5 integers in Java?",
        answers: [
            {text: "int[] arr = new int[5];", correct: true},
            {text: "int arr[] = new int[5];", correct: true},
            {text: "int[] arr = {1, 2, 3, 4, 5};", correct: true},
            {text: "int arr = new int(5);", correct: false}
        ]
    },
    {
        question: "How can you access the third element of an array 'arr' in Java?",
        answers: [
            {text: "arr[3]", correct: true},
            {text: "arr(3)", correct: false},
            {text: "arr[2]", correct: false},
            {text: "arr.get(3)", correct: false}
        ]
    },
    
    {
        question: "What will be the output of the following code: `int[] arr = {5, 10, 15}; System.out.println(arr.length);`?",
        answers: [
            {text: "5", correct: false},
            {text: "3", correct: true},
            {text: "10", correct: false},
            {text: "Error", correct: false}
        ]
    },
    {
        question: "Which of the following statements is true about arrays in Java?",
        answers: [
            {text: "Arrays are dynamically sized in Java", correct: false},
            {text: "Arrays can hold elements of different types", correct: false},
            {text: "Arrays in Java are always fixed-size", correct: true},
            {text: "Arrays can store primitive data types only", correct: false}
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
            window.location.href = "java2.html";  
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



