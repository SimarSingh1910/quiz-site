console.log("starting");
let quiz_category = localStorage.getItem("selectedCategory");
let URL = `https://opentdb.com/api.php?amount=10&category=${quiz_category}&difficulty=easy&type=multiple`;
let results = [];
let correctAnswers = [];
function decodeHtmlEntities(text) {
    let parser = new DOMParser();
    let decodedString = parser.parseFromString(text, "text/html").body.textContent;
    return decodedString;
}
async function fetching(URL) {
    let response = await fetch(URL);
    let data = await response.json();
    results = data.results;
    correctAnswers = results.map(result => result.correct_answer);
    QuesDisplay();
    AnswerDisplay();
}
function QuesDisplay() {
    for (ques in results) {
        let question = document.querySelector(`.question-${ques}`);
        question.textContent = decodeHtmlEntities(results[ques].question);
    }
}
function AnswerDisplay() {
    for (ques in results) {
        let answerArray = results[ques].incorrect_answers.concat(results[ques].correct_answer);
        answerArray.sort(() => Math.random() - 0.5);
        for (let i = 0; i < 4; i++) {
            let answer = document.querySelector(`#LabelAnswer${ques}-${i + 1}`);
            let RadioVal = document.querySelector(`#answer${ques}-${i + 1}`);
            answer.textContent = decodeHtmlEntities(answerArray[i]);
            RadioVal.value = answerArray[i];
        }
    }
}
// submit button functionality

fetching(URL);
document.querySelector(".btn").addEventListener("click", () => {
    let score = 0;
    for (let ques in results) {
        let userAnswer = document.querySelector(`input[name="answer${ques}"]:checked`).value;
        if (userAnswer === correctAnswers[ques]) {
            score++;
        }
    }
    alert(`Your Score is ${score}`);

});