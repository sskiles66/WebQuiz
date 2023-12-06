<script>
    import {getRandomQuestion} from "../utils.mjs";

    const question = getRandomQuestion();

    const wrong = question.wrongAnswers;
    let allQuestions = wrong;
    allQuestions.push(question.correctAnswer);
    // Fisher-Yates (Knuth) Shuffle algorithm
    for (let i = allQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }

    let answer;

    console.log(answer);
</script>

<div>
    <h3>{question.questionTitle}</h3>
    <ul class="choices">
        <li class="choice">
            <label class="radio"
            ><input type="radio" name={question.id} value={allQuestions[0]} bind:group={answer}/><span
            >{allQuestions[0]}</span

            ></label
            >
        </li>
        <li class="choice">
            <label class="radio"
            ><input type="radio" name={question.id} value={allQuestions[1]} bind:group={answer}/><span
            >{allQuestions[1]}</span
            ></label
            >
        </li>
        <li class="choice">
            <label class="radio"
            ><input type="radio" name={question.id} value={allQuestions[2]} bind:group={answer}/><span
            >{allQuestions[2]}</span
            ></label
            >
        </li>
        <li class="choice">
            <label class="radio"
            ><input type="radio" name={question.id} value={allQuestions[3]} bind:group={answer}/><span
            >{allQuestions[3]}</span
            ></label
            >
        </li>
    </ul>
</div>

<style>

    h3 {
        margin-left: 2vw;
        color: white;
    }

    .choices {
        border-top: 1px solid rgba(255, 255, 255, 0.699);
        list-style: none;
        background-color: #393d3f00;
        margin: 0;
        padding-bottom: 10px;
        border-bottom-left-radius: 18px;
        border-bottom-right-radius: 18px;
    }

    .choice {
        font-family: Roboto, sans-serif;
        margin: .9vw;
        color: rgb(255, 255, 255);
        
    }

    div {
        width: 50vw;
        padding: 5px;
        border-radius: 20px;
        margin: 30px auto;
        background-color: rgba(63, 63, 63, 0.149);
        box-shadow: 1px 1px 10px rgba(55, 55, 55, 0.61);
    }

    div p {
        margin-left: 2vw;

    }

</style>