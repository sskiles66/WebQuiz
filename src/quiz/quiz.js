import {renderHeaderFooter} from "../utils.mjs";
import { renderQuestions } from "../utils.mjs";
import { questionPool } from "../utils.mjs";

renderHeaderFooter();
renderQuestions();

// submit handler on form (use the formData like in sleepoutside)


document.forms["quiz"].addEventListener("submit", (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    var formStuff = formDataToJSON(e.target)
    console.log(formStuff)
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

function checkQuestions(formData){
    var i = 1;
    var t = 0;
    for(let answer in formData){

        console.log(answer);
        console.log(questionPool[t].correctAnswer);
        if (questionPool[t].correctAnswer == answer) {
            console.log("correct");
        }
        else{
            console.log("wrong");
        }
        i+=1;
        t+=1;
    }
}
  
// prevent default
// look into for of or for in loops (for objects)
// review checkout stuff for the sleep outside 