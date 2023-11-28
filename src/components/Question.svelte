<script>
    import {getRandomQuestion} from "../utils.mjs";
    const question = getRandomQuestion();
    const wrong = question.wrongAnswers;
    console.log(wrong);


</script>



<h2>Question </h2>
<div>
    <p>{question.questionTitle}</p>
    <!-- <ul class="choices">
        <li class = "choice">
            <label
                ><input type="radio" name="question0" value="A" /><span
                    >{wrong[1]}</span
                ></label
            >
        </li>
        <li class = "choice">
            <label
                ><input type="radio" name="question0" value="A" /><span
                    >{question.correctAnswer}</span
                ></label
            >
        </li>
        <li class = "choice">
            <label
                ><input type="radio" name="question0" value="A" /><span
                    >{wrong[2]}</span
                ></label
            >
        </li>
        <li class = "choice">
            <label
                ><input type="radio" name="question0" value="A" /><span
                    >{wrong[0]}</span
                ></label
            >
        </li>
    </ul> -->
</div>

<style>
    .choices{
        border-top: 2px solid gainsboro;
        list-style: none;
        background-color: aliceblue;
        margin: 0;
        padding-bottom: 10px;
        border-bottom-left-radius: 18px;
        border-bottom-right-radius: 18px;
    }
    .choice{
        font-family: 'Roboto';
        margin: .9vw;
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
    h2{
        text-align: center;
    }
</style>