<script>
    let userData = "";

    function checkUserData() {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData) {
            userData = JSON.parse(storedUserData);
        }
    }

    checkUserData();

    async function displayUserSummary() {
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

    // displayUserSummary();
</script>

<table>
    {#if userData}
    <thead>
    <tr>
        <td>date</td>
        <td>score</td>
    </tr>
    </thead>
    <tbody>
    {#await displayUserSummary()}
        <tr>
            <td>Loading</td>
        </tr>

    {:then data}
        {#each data.summary as item}
            <tr>
                <td>{item.date.slice(0, 10)}</td>
                <td>{item.currentScore}</td>
            </tr>
        {/each}

    {:catch err}
        <tr>
            <td>Error {err}</td>
        </tr>
    {/await}
    </tbody>
        {:else}
        <h1>Please <a href="/">log in</a></h1>
    {/if}
</table>