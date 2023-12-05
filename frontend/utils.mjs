import Header from "./components/Header.svelte";
import Footer from "./components/Footer.svelte";
import Question from "./components/Question.svelte";


export function renderHeaderFooter() {
    new Header({
        target: document.querySelector("#header"),
    });
    new Footer({
        target: document.querySelector("#footer"),
    });
}

export const questionPool = [
    {
        questionTitle: "What is the difference between `==` and `===` in JavaScript?",
        wrongAnswers: ["i dont know", "idk", "i really dont know"],
        id: 1,
        correctAnswer: "While comparing values, triple equals also compares type.",
    },
    {
        questionTitle: "Can you explain how CSS selectors work?",
        wrongAnswers: ["i dont know", "idk", "i really dont know"],
        id: 2,
        correctAnswer: "CSS selectors are used to select the content you want to style.",
    },
    {
        questionTitle: "What is the purpose of HTML5 semantic elements?",
        wrongAnswers: ["i dont know", "idk", "i really dont know"],
        id: 3,
        correctAnswer: "Semantic elements provide information about the type of content they contain.",
    },
    {
        questionTitle: "How does event propagation work in JavaScript?",
        wrongAnswers: ["i dont know", "idk", "i really dont know"],
        id: 4,
        correctAnswer: "Event propagation describes the order in which events are received on the page.",
    },
    {
        questionTitle: "What is the difference between `localStorage` and `sessionStorage`?",
        wrongAnswers: ["i dont know", "idk", "i really dont know"],
        id: 5,
        correctAnswer: "`localStorage` persists until explicitly deleted, while `sessionStorage` lasts for one session.",
    },
    {
        questionTitle: "Can you explain the box model in CSS?",
        wrongAnswers: ["i dont know", "idk", "i really dont know"],
        id: 6,
        correctAnswer: "The CSS box model is a box that wraps around every HTML element.",
    },
    {
        questionTitle: "What are the benefits of using Svelte over other JavaScript frameworks?",
        wrongAnswers: ["i dont know", "idk", "i really dont know"],
        id: 7,
        correctAnswer: "Svelte offers a simpler and more intuitive API, better performance, and smaller bundle sizes.",
    },
    {
        questionTitle: "How can you handle form submission in JavaScript?",
        wrongAnswers: ["i dont know", "idk", "i really dont know"],
        id: 8,
        correctAnswer: "Form submission can be handled by listening to the `submit` event.",
    },
    {
        questionTitle: "What is the purpose of the `document.querySelector` method in JavaScript?",
        wrongAnswers: ["i dont know", "idk", "i really dont know"],
        id: 9,
        correctAnswer: "`document.querySelector` returns the first Element within the document that matches the specified selector.",
    },
    {
        questionTitle: "How can you include external CSS and JavaScript files in your HTML document?",
        wrongAnswers: [" i dont know", " idk", " i really dont know"],
        id: 10,
        correctAnswer: "External CSS and JavaScript files can be included using the `link` and `script` tags respectively.",
    },
    {questionTitle: "How do you select an HTML element with the id example using JavaScript?",
    wrongAnswers: [" getElementByTag('example')", " document.selectById('example')", " select.elementById('example')"],
    id: 11,
    correctAnswer: " document.querySelector('#example')",
    },
    {questionTitle: "What is the purpose of the 'JSON.parse()' method in JavaScript?",
    wrongAnswers: [" Converts a JSON object to a string", " Parses HTML content", " Creates a new JSON object"],
    id: 12,
    correctAnswer: " Converts a string to a JSON object",
    },
    {questionTitle: "How do you comment out multiple lines in JavaScript?",
    wrongAnswers: [" ''' Comment '''", " // Comment //", " <!-- Comment -->"],
    id: 13,
    correctAnswer: " /* Comment */",
    },
    {questionTitle: "How do you declare a variable in JavaScript?",
    wrongAnswers: [" declare myVar;", " v myVar;", " variable myVar"],
    id: 14,
    correctAnswer: " var myVar",
    },
    {questionTitle: " How can you select an element with the class name 'example'?",
    wrongAnswers: [" #example;", " example", " element.example"],
    id: 15,
    correctAnswer: " .example",
    },
    {questionTitle: " What does CSS stand for?",
    wrongAnswers: [" Computer Style Sheets", " Creative Style Sheets", " Content Style Sheets"],
    id: 16,
    correctAnswer: "  Cascading Style Sheets",
    },
    {questionTitle: " What is the purpose of the 'localStorage' object in JavaScript?",
    wrongAnswers: [" Stores data permanently on the server", " Validates user input in forms", " Manages server-side sessions"],
    id: 17,
    correctAnswer: " Stores data temporarily in the browser",
    },
    {questionTitle: " How do you import a Svelte component named 'Example' into another Svelte component?",
    wrongAnswers: [" include Example from './Example.svelte';", " require Example from './Example.svelte';", "import './Example.svelte' as Example;"],
    id: 18,
    correctAnswer: " import Example from './Example.svelte', ",
    },
    {questionTitle: " How can you center an element horizontally in CSS?",
    wrongAnswers: [" text-align: center;", " align: center;",  "float: center;"],
    id: 19,
    correctAnswer: " margin: auto;",
    },{questionTitle: " What is the purpose of the CSS property 'z-index'?",
    wrongAnswers: [" Adjusts the opacity of an element", " Specifies the width of an element", " Sets the background color of an element"],
    id: 20,
    correctAnswer: "  Defines the stacking order of positioned elements",
    }
];

let usedQuestionIndex = [];

export function getRandomQuestion() {
    let randomIndex = Math.floor(Math.random() * questionPool.length);
    while (usedQuestionIndex.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * questionPool.length);
    }
    usedQuestionIndex.push(randomIndex);
    return questionPool[randomIndex];
}

export function renderQuestions() {
    for (let i = 0; i < 10; i++) {
        new Question({
            target: document.querySelector("#questions"),
        });
    }

}

