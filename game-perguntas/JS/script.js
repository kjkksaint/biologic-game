const questions = [
    {
        question: "Qual é a principal função dos defensivos agrícolas?",
        options: ["Controlar pragas", "Aumentar o crescimento das plantas", "Melhorar a qualidade do solo", "Promover a polinização"],
        answer: "Controlar pragas"
    },
    {
        question: "Qual é o tipo de defensivo agrícola utilizado para controlar ervas daninhas?",
        options: ["Inseticida", "Herbicida", "Fungicida", "Rodenticida"],
        answer: "Herbicida"
    },
    {
        question: "Qual é um dos principais riscos associados ao uso excessivo de defensivos agrícolas?",
        options: ["Diminuição da produtividade", "Resistência de pragas", "Aumento da fotossíntese", "Melhora da qualidade do ar"],
        answer: "Resistência de pragas"
    },
    {
        question: "Qual medida é recomendada para minimizar os impactos ambientais dos defensivos agrícolas?",
        options: ["Aplicação indiscriminada", "Uso de EPI", "Uso controlado e conforme as instruções", "Aplicação em dias chuvosos"],
        answer: "Uso controlado e conforme as instruções"
    },
    {
        question: "O que são defensivos agrícolas biológicos?",
        options: ["Produtos químicos sintéticos", "Defensivos que utilizam organismos vivos para o controle de pragas", "Fertilizantes químicos", "Pesticidas de alta toxicidade"],
        answer: "Defensivos que utilizam organismos vivos para o controle de pragas"
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
