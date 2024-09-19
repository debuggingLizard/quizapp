let currentQuestion = 0;

function init() {
    renderQuestionCount()
    showQuestion()
}

function renderQuestionCount() {
    document.getElementById('total-questions-count').innerText = questions.length;
    
}

function showQuestion() {
    let question = questions[currentQuestion];
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

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('question-correct');
    } else {
        document.getElementById(selection).parentNode.classList.add('question-false');
        document.getElementById(idRightAnswer).parentNode.classList.add('question-correct');
    }

    document.getElementById('next-button').disabled = false;
}