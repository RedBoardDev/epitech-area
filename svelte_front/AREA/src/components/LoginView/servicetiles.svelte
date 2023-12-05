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
      text-size-adjust: auto;
      text-align: center;
    }
  
    h2 {
      margin: 0;
      font-size: 1.5em;
    }
  
    p {
      margin: 0;
      color: #949393;
    }
</style>