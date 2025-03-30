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
    console.log("button clicked");
    let score = 0;
    for (let ques in results) {
        let userAnswer = document.querySelector(`input[name="answer${ques}"]:checked`).value;
        $(`#answer${ques}`).text(`Your Answer : ${userAnswer}`);
        $(`#correctAnswer${ques}`).text(`Correct Answer : ${correctAnswers[ques]}`);
        if (userAnswer === correctAnswers[ques]) {
            $(`#feedback${ques}`).css("color", "green");
            $(`#feedback${ques}`).text("Your Answer is CORRECT");
            $(`#answer${ques}`).css("color", "green");
            $(`#correctAnswer${ques}`).css("color", "green");
            score++;
        }
        else {
            $(`#feedback${ques}`).css("color", "red");
            $(`#feedback${ques}`).text("Your Answer is INCORRECT");
            $(`#answer${ques}`).css("color", "red");
            $(`#correctAnswer${ques}`).css("color", "red");
        }
    }
    $(".score").css("display", "block");
    $("#score").text(`Your Score is ${score}`);
});