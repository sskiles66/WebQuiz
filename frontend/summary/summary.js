import { get } from 'svelte/store';
import {renderHeaderFooter} from '../utils.mjs';

renderHeaderFooter();

let userData = "";

let loggedIn = false;

function checkUserData() {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
        userData = JSON.parse(storedUserData);
        loggedIn = true;
    }
}

function getHighScore(data){
    let highScore = -1;
    data.forEach(element => {
       if (element.currentScore > highScore){
        highScore = element.currentScore;
       }
    });

    return highScore;

}

function getAverageScore(data){
    let total = 0;
    data.forEach(element => {
       total += element.currentScore;
    });


    return (total / data.length).toFixed(2);

}

checkUserData();

async function getUserSummary() {
    const id = userData._id;

    try {
        const response = await fetch("http://localhost:6969/api/quiz/summary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: id,
            }),
        });

        if (!response.ok) {
            console.error("Could not fetch summary data");
        }

        return await response.json();
    } catch (err) {
        console.error(err);
    }
}

if (loggedIn == true){
    const data = await getUserSummary();

    if (data.summary.length != 0){
        
        console.log(data.summary);

        document.querySelector("#numberOfAttempts").innerHTML = data.summary.length;

        document.querySelector("#highScore").innerHTML = getHighScore(data.summary);

        document.querySelector("#averageScore").innerHTML = getAverageScore(data.summary);

        document.querySelector("#averageScore").innerHTML = getAverageScore(data.summary);

        document.querySelector("#lastAttempt").innerHTML = data.summary[data.summary.length - 1].currentScore;
        
    }else{
        alert("You have not taken any quizzes yet.");
    }
}else{
    alert("You must be logged in to see your scores.")
}




