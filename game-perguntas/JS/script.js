const questions = [
    {
        question: "Qual é a célula fundamental da vida?",
        options: ["Célula eucariótica", "Célula procariótica", "Célula epitelial", "Célula nervosa"],
        answer: "Célula eucariótica"
    },
    {
        question: "Qual organelo é conhecido como o 'centro de energia' da célula?",
        options: ["Núcleo", "Mitocôndria", "Ribossomo", "Lisossomo"],
        answer: "Mitocôndria"
    },
    {
        question: "Qual é o processo pelo qual as plantas produzem seu alimento?",
        options: ["Respiração celular", "Fermentação", "Fotossíntese", "Digestão"],
        answer: "Fotossíntese"
    },
    {
        question: "Qual é o maior órgão do corpo humano?",
        options: ["Coração", "Pulmão", "Fígado", "Pele"],
        answer: "Pele"
    },
    {
        question: "Qual tipo de macromolécula é o DNA?",
        options: ["Proteína", "Carboidrato", "Lipídio", "Ácido nucleico"],
        answer: "Ácido nucleico"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

function loadQuestion() {
    const { question, options } = questions[currentQuestionIndex];
    questionElement.textContent = question;
    optionsElement.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => handleOptionClick(option));
        optionsElement.appendChild(button);
    });
}

function handleOptionClick(selectedOption) {
    const { answer } = questions[currentQuestionIndex];
    showFeedback(selectedOption === answer ? 'correct' : 'wrong');
    if (selectedOption === answer) {
        score++;
    }
}

function showFeedback(type) {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = type === 'correct' ? 'Correto!' : 'Errado!';
    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
        loadNextQuestion();
    }, 1000);
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionElement.textContent = '';
    optionsElement.innerHTML = '';
    scoreElement.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
    resultElement.classList.remove('hidden');
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    resultElement.classList.add('hidden');
    loadQuestion();
}

restartButton.addEventListener('click', restartQuiz);

document.addEventListener('DOMContentLoaded', loadQuestion);
