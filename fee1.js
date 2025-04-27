const questions = [
    {
        question: "What is HTML?",
        answers: [
            {text: "HTML describes the structure of a webpage", correct: false},
            {text: "HTML is the standard markup language mainly used to create web pages", correct: false},
            {text: "HTML consists of a set of elements that helps the browser how to view the content", correct: false},
            {text: "All of the mentioned", correct: true}
        ]
    },
    {
        question: "Who is the father of HTML?",
        answers: [
            {text: "Rasmus Lerdorf", correct: false},
            {text: "Tim Berners-Lee", correct: true},
            {text: "Brendan Eich", correct: false},
            {text: "Sergey Brin", correct: false}
        ]
    },
    {
        question: "HTML stands for __________?",
        answers: [
            {text: "HyperText Markup Language", correct: true},
            {text: "HyperText Machine Language", correct: false},
            {text: "HyperText Marking Language", correct: false},
            {text: "HighText Marking Language", correct: false}
        ]
    },
    {
        question: "Which of the following is used to read an HTML page and render it?",
        answers: [
            {text: "Web server", correct: false},
            {text: "Web network", correct: false},
            {text: "Web browser", correct: true},
            {text: "Web matrix", correct: false}
        ]
    },
    {
        question: "What is DOM in HTML?",
        answers: [
            {text: "Language dependent application programming", correct: false},
            {text: "Hierarchy of objects in ASP.NET", correct: false},
            {text: "Application programming interface", correct: false},
            {text: "Convention for representing and interacting with objects in html documents", correct: true}
        ]
    },
    {
        question: "Which of the following is the correct description of a semantic HTML element?",
        answers: [
            {text: "It does not have any visual representation on its own", correct: true},
            {text: "It represents a specific part of a web page's content", correct: false},
            {text: "It is used to enhance styling in the page", correct: false},
            {text: "It is a non-semantic element used for layout", correct: false}
        ]
    },
    {
        question: "Which attribute is used to specify alternative text for an image if it cannot be displayed?",
        answers: [
            {text: "alt", correct: true},
            {text: "src", correct: false},
            {text: "title", correct: false},
            {text: "desc", correct: false}
        ]
    },
    {
        question: "Which of the following is a benefit of using external stylesheets in HTML?",
        answers: [
            {text: "Faster page load times and easier maintenance", correct: true},
            {text: "Better SEO optimization", correct: false},
            {text: "Improved accessibility for screen readers", correct: false},
            {text: "Reduced file size of HTML documents", correct: false}
        ]
    },
    {
        question: "What does the <meta> tag in HTML represent?",
        answers: [
            {text: "It defines the metadata for the HTML document", correct: true},
            {text: "It represents the main content of the webpage", correct: false},
            {text: "It contains the visible text for the webpage", correct: false},
            {text: "It is used for embedding images", correct: false}
        ]
    },
    {
        question: "Which of the following is an example of an accessibility feature in HTML?",
        answers: [
            {text: "Using semantic HTML tags like header,footer", correct: true},
            {text: "Avoiding the use of CSS to style the page", correct: false},
            {text: "Using long paragraphs without breaks", correct: false},
            {text: "Embedding all content in a single <div> element", correct: false}
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
            window.location.href = "fee1.html";  
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

