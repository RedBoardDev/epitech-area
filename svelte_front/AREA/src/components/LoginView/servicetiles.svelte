<!-- <script>
    import logopropal2Artboard_1 from '../../Assets/logopropal2Artboard_1.png';
    // import githubLogo from '../../Assets/services/githubLogo.png';
    export var logoPath;
    import logo from logoPath;
</script>

<serviceTiles>
    <div class= "serviceTile-content">
        <img src={githubLogo} alt="githubLogo">
    </div>
</serviceTiles>


<style>
    .serviceTile-content {
        display: flex;
        align-items: center; /* Align items vertically */
    }
  
    img {
        width: 10%;
        height: 10%;
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
  </style> -->

  <!-- Card.svelte -->

<script>
    export let title;
    export let subtitle;
    export let imageUrl;
</script>
  
<div class="card">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={imageUrl} alt="Card Image">
    <div class="card-content">
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
</div>
  
<style>
    .card {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      /* width: 200px;
      height: 100px; */
      /* width: auto;
      height: auto; */
      border: 1px solid #ccc;
      background-color: aquamarine;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 10px;
      margin-bottom: 20px;
      margin-left: 200px;
      margin-right: 200px;
    }
  
    img {
      width: 20%;
      height: auto;
      border-radius: 8px;
    }
  
    .card-content {
      /* align-items: center; */
      text-size-adjust: auto;
      text-align: center;
      /* padding: 16px; */
    }
  
    h2 {
      margin: 0;
      font-size: 1.5em;
    }
  
    p {
      margin: 0;
      color: #555;
    }
</style>