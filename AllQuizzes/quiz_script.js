console.log("starting");
let quiz_category = localStorage.getItem("selectedCategory");
let results = [];
let correctAnswers = [];

// decode HTML entities function
function decodeHtmlEntities(text) {
    let parser = new DOMParser();
    let decodedString = parser.parseFromString(text, "text/html").body.textContent;
    return decodedString;
}

// fetch API data and display questions and answers in DOM elements
async function fetching(URL) {
    let response = await fetch(URL);
    let data = await response.json();
    results = data.results;
    correctAnswers = results.map(result => result.correct_answer);
    QuesDisplay();
    AnswerDisplay();
}

// display questions in DOM elements
function QuesDisplay() {
    for (ques in results) {
        let question = document.querySelector(`.question-${ques}`);
        question.textContent = decodeHtmlEntities(results[ques].question);
    }
}

// display answers in DOM elements in radio buttons and labels 4 at a time, with random order
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
$(document).ready(function () {
    $("#generate").click(function (event) {
        event.preventDefault();
        console.log("Generating quiz...");
        let numQuestions = $("#numQuestions").val();
        let difficulty = $("#difficulty").val();
        let container = $(".question-form");
        container.empty(); // Clear previous questions

        for (let i = 0; i < numQuestions; i++) {
            let questionBlock = `
            <div class="col q${i + 1} text-start">
                <h2>Question ${i + 1}.</h2>
                <h3 class="question-${i}"></h3>
                <div class="container-fluid">
                    <input type="radio" name="answer${i}" id="answer${i}-1" value="option1">
                    <label for="answer${i}-1" id="LabelAnswer${i}-1"></label><br>

                    <input type="radio" name="answer${i}" id="answer${i}-2" value="option2">
                    <label for="answer${i}-2" id="LabelAnswer${i}-2"></label><br>

                    <input type="radio" name="answer${i}" id="answer${i}-3" value="option3">
                    <label for="answer${i}-3" id="LabelAnswer${i}-3"></label><br>

                    <input type="radio" name="answer${i}" id="answer${i}-4" value="option4">
                    <label for="answer${i}-4" id="LabelAnswer${i}-4"></label><br>
                </div>
                
                <p class="top" id="answer${i}"></p>
                <p id="correctAnswer${i}"></p>
                <p id="feedback${i}"></p>
                <hr class="border border-2 border-secondary rounded-pill">
            </div>`;
            container.append(questionBlock);
        }
        let URL = `https://opentdb.com/api.php?amount=${numQuestions}&category=${quiz_category}&difficulty=${difficulty}&type=multiple`;
        fetching(URL);
        window.location.hash = `no.ofQues=${numQuestions}&category=${quiz_category}&difficulty=${difficulty}#generate`;
        $(".submit").css("display", "block");
    });
});