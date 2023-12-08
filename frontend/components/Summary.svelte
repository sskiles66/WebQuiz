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
            <td>DATE</td>
            <td>SCORE</td>
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

<style>
    table {
        background-color: rgba(63, 63, 63, 0.149);
        margin: 10px auto;
        padding: 20px 0;
        width: 50%;
        border-radius: 20px;
        box-shadow: 1px 5px 2px rgb(255, 255, 255);
        margin-bottom: 50px;
    }

    thead {
        background: rgba(240, 248, 255, 0.2)
    }

    td {
        border: 1px solid rgba(240, 248, 255, 0.427);
        font-size: 1.6rem
    }

</style>