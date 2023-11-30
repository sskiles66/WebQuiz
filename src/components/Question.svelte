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
    
    let answer ;

    console.log(answer);
</script>

<div>
    <h3>{question.questionTitle}</h3>
     <ul class="choices">
        <li class = "choice">
            <label
                ><input type="radio" name={question.id} value={allQuestions[0]} bind:group={answer} /><span
                    >{allQuestions[0]}</span
                    
                ></label
            >
        </li>
        <li class = "choice">
            <label
                ><input type="radio" name={question.id} value={allQuestions[1]} bind:group={answer} /><span
                    >{allQuestions[1]}</span
                ></label
            >
        </li>
        <li class = "choice">
            <label
                ><input type="radio" name={question.id} value={allQuestions[2]} bind:group={answer} /><span
                    >{allQuestions[2]}</span
                ></label
            >
        </li>
        <li class = "choice">
            <label
                ><input type="radio" name={question.id} value={allQuestions[3]} bind:group={answer} /><span
                    >{allQuestions[3]}</span
                ></label
            >
        </li>
    </ul> 
</div>

<style>

    h3 {
        margin-left:2vw;
        font-family: 'Orbitron';;
    }
    
    .choices{
        border-top: 2px solid gainsboro;
        list-style: none;
        background-color: #393D3F;
        margin: 0;
        padding-bottom: 10px;
        border-bottom-left-radius: 18px;
        border-bottom-right-radius: 18px;
    }
    .choice{
        font-family: 'Roboto';
        margin: .9vw;
        color: #9BF9FA;
    }

    div{
        width:50vw;
        border: 2px solid gainsboro;
        border-radius: 20px;
        margin: 30px auto;
        background-color:  #9BF9FA;
        
    }
   
    div p{
        margin-left:2vw;

    }

</style>