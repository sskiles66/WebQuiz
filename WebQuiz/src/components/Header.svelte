<script>

</script>

<nav>

    <div id="left">
        <img src="../images/logo.png" alt="logo">
        <h2>WebQuiz</h2>
    </div>

    <div id="right">
        <a href="#">Home</a>
        <a href="#">Quiz</a>
        <a href="#">Stats</a>
        <a href="#">Summary</a>
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
        display: flex;
        background-color: #9BF9FA;
        align-items: center;
        justify-content: space-around;
    }

    #left {
        display: flex;
        align-items: center;
    }

    #left >* {
        margin: 5px;
    }

    #right {
        background-color: #393D3F;
        padding: 10px;
        border-radius: 10px;
    }

    #right >* {
        margin: 10px;
        padding: 10px;
        text-decoration: none;
        color: #9BF9FA;
    }

    img {
        width: 50px;
    }
</style>