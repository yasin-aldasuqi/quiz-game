// Quiz Data
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Tool Multi Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used for styling web pages?",
        answers: ["HTML", "JQuery", "CSS", "XML"],
        correct: 2
    },
    {
        question: "Which is NOT a JavaScript framework?",
        answers: ["React", "Angular", "Vue", "Django"],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1
    },
    {
        question: "Which company developed TypeScript?",
        answers: ["Google", "Facebook", "Microsoft", "Apple"],
        correct: 2
    },
    {
        question: "What is the correct way to declare a variable in JavaScript?",
        answers: ["variable x = 5", "v x = 5", "let x = 5", "int x = 5"],
        correct: 2
    },
    {
        question: "Which database is NoSQL?",
        answers: ["MSSQL", "MongoDB", "MySQL", "PostgreSQL"],
        correct: 1
    },
    {
        question: "What does API stand for?",
        answers: [
            "Application Programming Interface",
            "Applied Programming Interface",
            "Application Process Integration",
            "Automated Programming Interface"
        ],
        correct: 0
    },
    {
        question: "Which is a backend framework?",
        answers: ["React", "Next.js", "Express.js", "Vue"],
        correct: 2
    },
    {
        question: "What year was JavaScript created?",
        answers: ["1993", "1995", "1997", "2000"],
        correct: 1
    }
];

// State
let currentQuestion = 0;
let score = 0;
let answered = false;

// Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const questionCounter = document.getElementById('question-counter');
const scoreDisplay = document.getElementById('score-display');
const progressFill = document.getElementById('progress-fill');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');

// Functions
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = false;
    showScreen(quizScreen);
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    const q = questions[currentQuestion];
    
    questionCounter.textContent = `Question ${currentQuestion + 1}/${questions.length}`;
    scoreDisplay.textContent = `Score: ${score}`;
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
    
    questionText.textContent = q.question;
    answersContainer.innerHTML = '';
    
    q.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = answer;
        btn.onclick = () => selectAnswer(index, btn);
        answersContainer.appendChild(btn);
    });
    
    nextBtn.style.display = 'none';
}

function selectAnswer(index, btn) {
    if (answered) return;
    answered = true;
    
    const q = questions[currentQuestion];
    const allButtons = document.querySelectorAll('.answer-btn');
    
    allButtons.forEach(b => b.disabled = true);
    
    if (index === q.correct) {
        btn.classList.add('correct');
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    } else {
        btn.classList.add('wrong');
        allButtons[q.correct].classList.add('correct');
    }
    
    nextBtn.style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    showScreen(resultScreen);
    finalScore.textContent = score;
    
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "🏆 Perfect score! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "🌟 Excellent! Great job!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "👍 Good work! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "📚 Not bad! Try again!";
    } else {
        resultMessage.textContent = "💪 Keep practicing! You'll get there!";
    }
}

function restartQuiz() {
    showScreen(startScreen);
}

// Event Listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);
