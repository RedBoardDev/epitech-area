<script>
  export let title = 'HarmonieWeb';
  export let subtitle = 'Connecter et harmoniser vos actions de façon simple et sécurisé.';
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
      align-items: center;
  }

  img {
    width: 15%;
    height: auto;
    padding-top: 40px;
  }

  .text-content {
      display: flex;
      text-size-adjust: 1px;
      flex-direction: column;
      margin-left: 10px;
  }

  header {
      background-color: #333;
      color: white;
      text-align: center;
      border-radius: 16px;
      margin-bottom: 10px;
  }

  h1, p {
      margin: 0;
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