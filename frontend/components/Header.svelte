<script>
    import {slide} from "svelte/transition";
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";
    import {user} from "../store.js";

    let showDropdown = false;
    let showLogin = false;
    let showSignUp = false;
    let signUpError = "";

    function toggleDropdown() {
        showDropdown = !showDropdown;
    }

    function showLoginForm() {
        showLogin = !showLogin;
    }

    function showSignUpForm() {
        showSignUp = !showSignUp;
    }

    // Reloads page when this function is executed
    function reloadPage() {
        location.reload();
    }

    async function toggleSignUp(event) {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const name = formData.get("account_firstname");
        const email = formData.get("account_email");
        const password = formData.get("account_password");

        try {
            await registerUser({name, email, password});
            navigate("/");
        } catch (err) {
            signUpError = err.message;
        }
    }

    async function registerUser(user) {
        const response = await fetch("http://localhost:6969/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Registration failed");
        }

        console.log(response);
        const userData = await response.json();
        console.log(userData);
    }

    async function loginUser(e) {
        const form = e.target;
        const formData = new FormData(form);

        const email = formData.get("account_email");
        const password = formData.get("account_password");

        const response = await fetch("http://localhost:6969/api/users/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const userData = await response.json();
        localStorage.setItem("userData", JSON.stringify(userData));
        user.set(userData);
        reloadPage();
    }

    // Check if user is logged in
    let userData = null;

    onMount(() => {
        const storedUserData = localStorage.getItem("userData");

        if (storedUserData) {
            userData = JSON.parse(storedUserData);
        }
    });

    async function logoutUser() {
        localStorage.removeItem("userData");
        reloadPage();

        const response = await fetch("http://localhost:6969/api/users/logout", {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }
    }
</script>

<nav>


    <div id="left">
        <img src="../images/logo.png" alt="logo">
        <h1>WebQuiz</h1>
    </div>

    <div id="right">
        <a href="#">Home</a>
        <a href="#">Quiz</a>
        <a href="#">Summary</a>
    </div>

    <div id="login-cont">
        <button id="loginIconButton" on:click={toggleDropdown}><img id="login-icon"
                                                                    src="../images/black-login-icon--0.png"
                                                                    alt="logo icon"></button>
        {#if showDropdown}
            <div transition:slide class="dropdown" style="position: absolute; top: 155%;">
                <div class="dropdown-header">
                    <button on:click={showLoginForm} id="loginDrop">Log In ></button>
                    {#if showLogin}
                        <form transition:slide on:submit|preventDefault={loginUser} method="post">

                            <h2>Login In</h2>

                            <label for="account_email">Email: </label><br>
                            <input type="email" id="account_email" name="account_email" required><br>

                            <label for="account_password">Password: </label><br>
                            <input type="password" id="account_password" name="account_password" required><br>

                            <input id="loginButton" type="submit" value="Log In">

                        </form>
                    {/if}
                    <button on:click={showSignUpForm} id="signUpDrop">Sign Up ></button>
                    {#if showSignUp}
                        <form transition:slide on:submit|preventDefault={toggleSignUp}>

                            <h2>Sign Up</h2>

                            <label for="account_firstname">First name: </label><br>
                            <input type="text" id="account_firstname" name="account_firstname" required><br>

                            <label for="account_lastname">Last Name: </label><br>
                            <input type="text" id="account_lastname" name="account_lastname" required><br>

                            <label for="account_email">Email: </label><br>
                            <input type="email" id="account_email" name="account_email" required><br>

                            <label for="account_password">Password: </label><br>
                            <input type="password" id="account_password" name="account_password" required><br>

                            <input id="signUpButton" type="submit" value="Sign Up">

                            {#if signUpError}
                                <p>{signUpError}</p>
                            {/if}
                        </form>
                    {/if}
                    {#if userData}
                        <button on:click={logoutUser}>Logout</button>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</nav>


<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron&family=Roboto&display=swap');

    h1, h2, h3 {
        font-family: 'Orbitron', sans-serif;
    }

    p, a {
        font-family: 'Roboto', sans-serif;
    }

    nav {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        background-color: #9BF9FA;
        align-items: center;

    }

    #left {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #left > * {
        margin: 0;
    }

    #right {
        display: flex;
        background-color: #393D3F;

        border-radius: 10px;
        margin: 0 auto;
        width: 300px;
        justify-content: center;
    }

    #right > * {
        padding: 10px;
        text-decoration: none;
        color: #9BF9FA;
    }

    #right > *:hover {
        background-color: #535758;
    }

    #login-icon {
        width: 20px; /* Adjust as needed */
        height: 20px; /* Adjust as needed */
        cursor: pointer;
    }

    #login-cont {
        cursor: pointer;
    }

    #loginIconButton {
        background-color: #9BF9FA;
        border: none;
        padding: 0;
    }

    #login-icon:hover {
        cursor: pointer;
    }

    #login-cont {
        text-align: center;
        position: relative;
    }

    img {
        width: 50px;
    }

    button {
        border-radius: 10px;
    }

    .dropdown {
        background-color: #393D3F;
        width: 100%;
        text-align: left;
    }

    .dropdown-header {
        padding: 10px;
        margin: 10px;
    }

    .dropdown-header > * {
        padding: 10px;
        margin: 10px;
    }

    #loginDrop, #signUpDrop {
        display: block;
        padding: 10px;
        background-color: #9BF9FA;

    }

    #loginDrop:hover, #signUpDrop:hover {
        background-color: #bafeff;
        cursor: pointer;
    }

    form {
        background-color: #393D3F;
        padding: 20px;
        border-radius: 5px;
        color: #9BF9FA;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form h2 {
        color: #9BF9FA;
    }

    form input, form select, form textarea {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: 1px solid #9BF9FA;
        background-color: #393D3F;
        color: #9BF9FA;
    }

    #signUpButton, #loginButton {
        margin: 0 auto;
        background-color: #9BF9FA;
        color: #393D3F;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
    }

    #signUpButton:hover, #loginButton:hover {
        background-color: #bafeff;
    }
</style>