import Header from "./components/Header.svelte";
import Footer from "./components/Footer.svelte";
import Test from "./components/Test.svelte";



export function renderHeaderFooter(){
    new Header({
        target: document.querySelector("#header"),
    });
    new Footer({
        target: document.querySelector("#footer"),
    });
}

const questionPool = [
    { questionTitle: "What is the difference between `==` and `===` in JavaScript?", 
        wrongAnswers: ["idk", "idk", "idk"], 
        correctAnswer:  "While comparing values, triple equals also compares type."},
    { questionTitle: "Can you explain how CSS selectors work?", 
        wrongAnswers: ["idk", "idk", "idk"], 
        correctAnswer: "CSS selectors are used to select the content you want to style."},
    { questionTitle: "What is the purpose of HTML5 semantic elements?", 
        wrongAnswers: ["idk", "idk", "idk"], 
        correctAnswer: "Semantic elements provide information about the type of content they contain."},
    { questionTitle: "How does event propagation work in JavaScript?", 
        wrongAnswers: ["idk", "idk", "idk"], 
        correctAnswer: "Event propagation describes the order in which events are received on the page."},
    { questionTitle: "What is the difference between `localStorage` and `sessionStorage`?", 
        wrongAnswers: ["idk", "idk", "idk"], 
        correctAnswer: "`localStorage` persists until explicitly deleted, while `sessionStorage` lasts for one session."},
    { questionTitle: "Can you explain the box model in CSS?", 
        wrongAnswers: ["idk", "idk", "idk"], 
        correctAnswer: "The CSS box model is a box that wraps around every HTML element."},
    { questionTitle: "What are the benefits of using Svelte over other JavaScript frameworks?", 
        wrongAnswers: ["idk", "idk", "idk"], 
        correctAnswer: "Svelte offers a simpler and more intuitive API, better performance, and smaller bundle sizes."},
    { questionTitle: "How can you handle form submission in JavaScript?", 
        wrongAnswers: ["idk", "idk", "idk"], 
        correctAnswer: "Form submission can be handled by listening to the `submit` event."},
    { questionTitle: "What is the purpose of the `document.querySelector` method in JavaScript?", 
        wrongAnswers: ["idk", "idk", "idk"], 
        correctAnswer: "`document.querySelector` returns the first Element within the document that matches the specified selector."},
    { questionTitle: "How can you include external CSS and JavaScript files in your HTML document?", 
        wrongAnswers: ["idk", "idk", "idk"], 
        correctAnswer: "External CSS and JavaScript files can be included using the `link` and `script` tags respectively."}
];

let usedQuestionIndex = [];

export function getRandomQuestion() {
    let randomIndex = Math.floor(Math.random() * questionPool.length);
    while (usedQuestionIndex.includes(randomIndex)){
        randomIndex = Math.floor(Math.random() * questionPool.length);
    }
    usedQuestionIndex.push(randomIndex);
    const question = questionPool[randomIndex];
    return question;
}

export function renderQuestions(){
    for (let i = 0; i < 10; i++){
        new Test({
            target: document.querySelector("#questions"),
        });
    }
    
}

