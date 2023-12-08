<script>
    import {slide} from "svelte/transition";
    import {onMount} from "svelte";
    import {navigate} from "svelte-routing";
    import {user} from "../store.js";

    let showDropdown = false;
    let showLogin = false;
    let showSignUp = false;
    let signUpError = "";
    let loginErr = "";
    let signupSuccess = "";
    let loginSuccess = "";

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

        await response.json();
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
            loginErr = "Login failed";
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
        <img id="logo" src="../images/logo.svg">
        <h1>Web Quiz</h1>
    </div>
    <div id="right">
        <a href="../index.html">Home</a>
        <a href="../quiz/index.html">Quiz</a>
        <a href="../summary/index.html">Summary</a>
        
        <div id="login-cont">
            <button id="loginIconButton" on:click={toggleDropdown}>Login</button>
            {#if showDropdown}
                <div transition:slide class="dropdown"
                     style="position: absolute; top: 100%; width:400px; border-radius:20px;">
                    <div class="dropdown-header">
                        {#if !userData}
                            <button on:click={showLoginForm} id="loginDrop">Log In</button>
                            {#if showLogin}
                                <form transition:slide on:submit|preventDefault={loginUser} method="post">
                                    <h2>Login</h2>

                                    <label for="account_email">Email: </label><br>
                                    <input type="email" id="account_email" name="account_email" required><br>

                                    <label for="account_password">Password: </label><br>
                                    <input type="password" id="account_password" name="account_password" required><br>

                                    <input id="loginButton" type="submit" value="Log In">
                                    {#if loginErr}
                                        <p>{loginErr}</p>
                                    {/if}
                                </form>
                            {/if}
                            <button on:click={showSignUpForm} id="signUpDrop">Sign Up</button>
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
                        {/if}
                        {#if userData}
                            <button class="logout" on:click={logoutUser}>Logout</button>
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
        {#if userData}
            <p class="welcome">Welcome, <span class="capitalize">{userData.name}</span></p>
        {/if}
    </div>
</nav>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron&family=Roboto&display=swap');

    h1, h2 {
        font-family: 'Orbitron', sans-serif;
        color: white;
    }

    p, a {
        font-family: 'Roboto', sans-serif;
    }

    nav {
        display: grid;
        grid-template-columns: 1fr 1fr;
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
        border-radius: 10px;
        justify-content: center;
        align-items: center;
    }

    #right > * {
        padding: 10px;
        text-decoration: none;
        color: white;
    }

    #right > *:hover {
        text-decoration: underline;
    }

    #login-cont {
        cursor: pointer;
    }

    #loginIconButton {
        border: 1px solid white;
        padding: 10px 20px;
        background-color: transparent;
        color: white;
        font-size: 90%;
    }

    #login-cont {
        text-align: center;
        position: relative;
    }

    img {
        width: 30px;
    }

    button {
        border-radius: 10px;
    }

    .dropdown {
        width: 400px;
        text-align: left;
        left:-150%;
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
        background-color: rgba(255, 255, 255, 0);
        border: 1px solid white;
        color: white;
        margin: 10px auto;
        width: 100px;

    }

    #loginDrop:hover, #signUpDrop:hover {
        background-color: #126087;
        color: white;
        cursor: pointer;
    }

    form {
        background-color: #323334;
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

    form input {
        width: 90%;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
        border: 1px solid #9BF9FA;
        background-color: #393D3F;
        color: #9BF9FA;
    }

    #signUpButton, #loginButton,  .logout{
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

    #logo{
        margin-right: 6px;
    }

    @media screen and (max-width: 610px ){
        .dropdown{
            left: -180%;
        }

        nav{
            grid-template-columns: 1fr;
        }

        #right{
            margin:0 auto;
            width: 50vw;
        }
        #right a{
            font-size: .8rem;
        }
        #left{
            font-size: .9rem;
        }

        #loginIconButton{
            font-size: .8rem;
            padding:5px;
        }

    }
</style>