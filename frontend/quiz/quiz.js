import {questionPool, renderHeaderFooter, renderQuestions} from "../utils.mjs";

renderHeaderFooter();

// if (false){
renderQuestions();
// }


// submit handler on form (use the formData like in sleepoutside)


document.forms["quiz"].addEventListener("submit", (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    var formStuff = formDataToJSON(e.target);
    checkQuestions(formStuff);

});


function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function checkQuestions(formData) {
    let correct = 0;
    let t = 0;
    for (let answer in formData) {

        if (questionPool[t].correctAnswer === formData[answer]) {
            correct += 1;
        } else {
            console.log("wrong");
        }
        t += 1;
    }
    alert(`Congrats you got ${correct} / 10!`);
    // window.location.href = '/'; // Redirect to homepage
}

// prevent default
// look into for of or for in loops (for objects)
// review checkout stuff for the sleep outside 