const questions = [
    {
        question: "What is the capital of France?",
        answers: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Mars", "Jupiter", "Venus", "Saturn"],
        correct: 0
    },
    {
        question: "What is the largest mammal?",
        answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1
    },
    {
        question: "What is the largest lake in the world?",
        answers: ["Caspian Sea", "Baikal", "Lake Superior", "Ontario"],
        correct: 1
    },
    {
        question: "What chemical element is designated as Hg?",
        answers: ["Silver", "Tin", "Gold", "Mercury"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const resultModal = new bootstrap.Modal(document.getElementById("result-modal"));
const resultMessage = document.getElementById("result-message");
const errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
const errorMessage = document.getElementById("errorMessage");

function loadQuestion() {
    const question = questions[currentQuestion];
    questionEl.textContent = question.question;
    
    answersEl.innerHTML = "";
    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("btn", "btn-outline-primary", "me-2", "mb-2");
        button.onclick = () => selectAnswer(index);
        answersEl.appendChild(button);
    });

    if (currentQuestion === questions.length - 1) {
        nextBtn.classList.add("d-none");
        submitBtn.classList.remove("d-none");
    } else {
        nextBtn.classList.remove("d-none");
        submitBtn.classList.add("d-none");
    }
}

function selectAnswer(index) {
    const buttons = answersEl.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = "btn btn-outline-primary me-2 mb-2";
    }
    buttons[index].className = "btn btn-primary me-2 mb-2";
}

function showError(message) {
    errorMessage.textContent = message;
    errorModal.show();
}

function nextQuestion() {
    const selectedButton = answersEl.querySelector(".btn-primary");
    if (selectedButton) {
        const selectedAnswer = Array.from(answersEl.children).indexOf(selectedButton);
        if (selectedAnswer === questions[currentQuestion].correct) {
            score++;
        }
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        }
    } else {
        showError("Please select an answer before proceeding.");
    }
}

function submitQuiz() {
    const selectedButton = answersEl.querySelector(".btn-primary");
    if (selectedButton) {
        nextQuestion();
        resultMessage.textContent = `You scored ${score} out of ${questions.length}!`;
        resultModal.show();
    } else {
        showError("Please select an answer before submitting.");
    }
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
submitBtn.addEventListener("click", submitQuiz);

document.getElementById("result-modal").addEventListener('hidden.bs.modal', resetQuiz);


// Feedback form validation and submission
const feedbackForm = document.getElementById('feedback-form');
const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
const feedbackToast = new bootstrap.Toast(document.getElementById('feedback-toast'));

feedbackForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        // Form is valid, show success message and close modal
        feedbackModal.hide();
        feedbackToast.show();
        feedbackForm.reset();
    }
});

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        alert('All fields are required');
        return false;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Initialize quiz
loadQuestion();