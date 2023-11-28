import Header from "./components/Header.svelte";
import Footer from "./components/Footer.svelte";
import Question from "./components/Question.svelte";

export function renderHeaderFooter(){
    new Header({
        target: document.querySelector("#header"),
    });
    new Footer({
        target: document.querySelector("#footer"),
    });
}

export function renderQuestion(){
    new Question({
        target: document.querySelector("#question"),
    });
}