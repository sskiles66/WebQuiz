import Header from "./components/Header.svelte";
import Footer from "./components/Footer.svelte";

export function renderHeaderFooter(){
    new Header({
        target: document.querySelector("#header"),
    });
    new Footer({
        target: document.querySelector("#footer"),
    });
}