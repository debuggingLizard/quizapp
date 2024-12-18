let currentQuestion = 0;
let correctQuestion = 0;
let AUDIO_CORRECT = new Audio('sounds/correct.mp3');
let AUDIO_WRONG = new Audio('sounds/wrong.mp3');
let AUDIO_FINISHED = new Audio('sounds/finished.mp3');

function init() {
    renderQuestionCount();
    showQuestion();
}

function renderQuestionCount() {
    document.getElementById('total-questions-count').innerText = questions.length;
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen()
    } else {
        updateProgressBar();
        renderCurrentQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('progress-bar-quiz').innerHTML = `100 %`;
    document.getElementById('progress-bar-quiz').style = `width: 100%`;
    AUDIO_FINISHED.play();
    document.getElementById('finish-screen').style = '';
    document.getElementById('trophy-image').style = '';
    document.getElementById('questions-container').style = 'display:none';
    document.getElementById('next-button').style = 'display:none';

    document.getElementById('correct-questions-finish-screen').innerHTML = correctQuestion;
    document.getElementById('total-questions-finish-screen').innerHTML = questions.length;
}

function updateProgressBar() {
    let progressPercent = Math.round((currentQuestion / questions.length) * 100);
    document.getElementById('progress-bar-quiz').innerHTML = `${progressPercent} %`;
    document.getElementById('progress-bar-quiz').style = `width: ${progressPercent}%`;
}

function renderCurrentQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('current-question-count').innerText = currentQuestion + 1;
    document.getElementById('question').innerText = question['question'];
    document.getElementById('answer_1').innerText = question['answer_1'];
    document.getElementById('answer_2').innerText = question['answer_2'];
    document.getElementById('answer_3').innerText = question['answer_3'];
    document.getElementById('answer_4').innerText = question['answer_4'];
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idRightAnswer = "answer_" + question['right_answer'];

    if (answerIsCorrect(selectedQuestionNumber, question)) {
        correctAnswer(selection);
    } else {
        wrongAnswer(selection, idRightAnswer);
    }

    document.getElementById('next-button').disabled = false;
    toggleDisableAnswers();
}

function toggleDisableAnswers() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById('answer_' + i).toggleAttribute("disabled");
    }
}

function answerIsCorrect(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}

function correctAnswer(selection) {
    document.getElementById(selection).parentNode.classList.add('question-correct');
    AUDIO_CORRECT.play();
    correctQuestion++;
}

function wrongAnswer(selection, idRightAnswer) {
    document.getElementById(selection).parentNode.classList.add('question-false');
    document.getElementById(idRightAnswer).parentNode.classList.add('question-correct');
    AUDIO_WRONG.play();
}

function nextQuestion() {
    currentQuestion++;
    resetQuestionTemplate()
    showQuestion();
}

function resetQuestionTemplate() {
    document.getElementById('next-button').disabled = true;

    toggleDisableAnswers();
    removeQuestionsBackgroundColor();
}

function removeQuestionsBackgroundColor() {
    for (let i = 1; i <= 4; i++) {
        document.getElementById('answer_' + i).parentNode.classList.remove('question-false');
        document.getElementById('answer_' + i).parentNode.classList.remove('question-correct');
    }
}

function restartGame() {
    currentQuestion = 0;
    correctQuestion = 0;

    document.getElementById('finish-screen').style = 'display:none';
    document.getElementById('trophy-image').style = 'display:none';
    document.getElementById('questions-container').style = '';
    document.getElementById('next-button').style = '';

    init();
}