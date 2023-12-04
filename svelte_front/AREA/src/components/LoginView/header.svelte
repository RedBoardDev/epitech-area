<script>
  export let title = 'Welcome to AREA';
  export let subtitle = 'Ratio';
  import logopropal2Artboard_1 from '../../../public/Assets/logopropal2Artboard_1.png';
</script>

<header>
  <div class="header-content">
      <img src={logopropal2Artboard_1} alt="Logo">
      <div class="text-content">
          <h1>{title} !</h1>
          <p>{subtitle}</p>
      </div>
  </div>

  <nav>
      <a href="#Home">Home</a>
      <a href="#About">About</a>
      <a href="#Contact">Contact</a>
  </nav>
</header>

<style>
  .header-content {
      display: flex; 
      align-items: center; /*Align items vertically */
  }

  img {
    /* display: flex;
    justify-content: flex-start; */
    width: 15%;
    height: auto;
    padding-top: 40px;
  }

  .text-content {
      display: flex;
      flex-direction: column;
      margin-left: 10px; /* Adjust margin as needed */
  }

  header {
      background-color: #333;
      color: white;
      text-align: center;
      border-radius: 16px;
      margin-bottom: 10px;
  }

  h1, p {
      margin: 0; /* Remove default margins */
      text-align: left;
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