import {questionPool, renderHeaderFooter, renderQuestions} from "../utils.mjs";

renderHeaderFooter();

// if (false){
renderQuestions();
// }


// submit handler on form (use the formData like in sleepoutside)


var formSubmitHandler = function(e) {
    e.preventDefault();
    var formStuff = formDataToJSON(e.target);
    checkQuestions(formStuff);
    document.forms["quiz"].removeEventListener("submit", formSubmitHandler);
};

document.forms["quiz"].addEventListener("submit", formSubmitHandler);


function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

let correct = 0;
function checkQuestions(formData) {
    for (let answer in formData) {
        console.log(answer)
        if (questionPool[answer-1].correctAnswer === formData[answer]) {
            console.log(questionPool[answer-1].correctAnswer);
            console.log(formData[answer]);
            correct += 1;
        } else {
            console.log("wrong");
        }
    }
    // alert(`Congrats you got ${correct} / 10!`);
    let button1 = document.querySelector("#home-button");
    let button2 = document.querySelector("#again-button");
    let results = document.querySelector("#results");
    let score = document.querySelector("#score");
    
    if (correct == 10){
        results.classList.add("good")
    }
    else if(correct <= 2){
        results.classList.add("bad");
    }
    score.classList.remove("hidden");
    results.classList.remove("shrunk");
    button1.classList.remove("hidden");
    button2.classList.remove("hidden");
    button1.classList.add("appear");
    button2.classList.add("appear");
    score.classList.add("appear");
    results.classList.add("show");
    score.textContent = `Your score is ${correct} / 10`
    // window.location.href = '/'; // Redirect to homepage

    sendQuizScores(correct)
}

// prevent default
// look into for of or for in loops (for objects)
// review checkout stuff for the sleep outside


// Send quiz scores on submit

async function sendQuizScores(quizScore) {
    let userData = JSON.parse(localStorage.getItem('userData'));
    let userId = userData._id
    const date = new Date()

    const response = await fetch("http://localhost:6969/api/quiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({currentScore: quizScore, userId: userId, date}),
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Could not send quiz scores");
    }

    console.log(response);
    const userQuizScores = await response.json();
    console.log(userQuizScores);
}
