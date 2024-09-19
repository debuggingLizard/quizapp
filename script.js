let currentQuestion = 0;
let correctQuestion = 0;

function init() {
    renderQuestionCount()
    showQuestion()
}

function renderQuestionCount() {
    document.getElementById('total-questions-count').innerText = questions.length;
    
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById('finish-screen').style = '';
        document.getElementById('trophy-image').style = '';
        document.getElementById('questions-container').style = 'display:none';
        document.getElementById('next-button').style = 'display:none';
        
        document.getElementById('correct-questions-finish-screen').innerHTML = correctQuestion;
        document.getElementById('total-questions-finish-screen').innerHTML = questions.length;

    } else {
        let question = questions[currentQuestion];

        document.getElementById('current-question-count').innerText = currentQuestion + 1;
        document.getElementById('question').innerText = question['question'];
        document.getElementById('answer_1').innerText = question['answer_1'];
        document.getElementById('answer_2').innerText = question['answer_2'];
        document.getElementById('answer_3').innerText = question['answer_3'];
        document.getElementById('answer_4').innerText = question['answer_4'];
    }
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idRightAnswer = "answer_" + question['right_answer'];

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('question-correct');
        correctQuestion++;
    } else {
        document.getElementById(selection).parentNode.classList.add('question-false');
        document.getElementById(idRightAnswer).parentNode.classList.add('question-correct');
    }

    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    resetQuestionTemplate()
    showQuestion();
} 

function resetQuestionTemplate() {
    document.getElementById('next-button').disabled = true;

    for (let i = 1; i <= 4; i++) {
        document.getElementById('answer_' + i).parentNode.classList.remove('question-false');
        document.getElementById('answer_' + i).parentNode.classList.remove('question-correct');
    }
}
