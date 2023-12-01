<!-- MyComponent.svelte -->
<script>
    import {getRandomQuestion} from "../utils.mjs";

    const question = getRandomQuestion();
    console.log(question);
</script>


<h1>Hello from MyComponent!</h1>
<p>This is a test Svelte component.</p>
<p>{question.questionTitle}</p>