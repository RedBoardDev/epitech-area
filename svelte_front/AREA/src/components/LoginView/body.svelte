<script>
    export let title = 'Welcome to AREA';
    export let subtitle = 'Ratio';
    import logopropal2Artboard_1 from '../../../public/Assets/logopropal2Artboard_1.png';
</script>

<header>
    <img src={logopropal2Artboard_1} alt="Logo">
    <h1>{title} !</h1>
    <p>{subtitle}</p>

    <nav>
        <a href="#Home">Home</a>
        <a href="#About">About</a>
        <a href="#Contact">Contact</a>
    </nav>
</header>

<style>
    img {
        display: flex;
        justify-content: flex-start;
        width: 10%;
        height: 10%;
    }

    header {
      background-color: #333;
      color: white;
      /* padding: 1em; */
      text-align: center;
      border-radius: 16px;
      /* opacity: 0.3; */
    }
  
    h1, p {
      display: flex;
      /* margin: 10; */
      margin-left: 200px;
      text-align: flex-start;
    }
  
    nav {
      display: flex;
      justify-content: flex-end;
      padding: 0.5em;
    }
  
    a {
      color: white;
      text-decoration: none;
      padding: 0.5em 1em;
    }
  
    a:hover {
      background-color: #777;
    }
</style>