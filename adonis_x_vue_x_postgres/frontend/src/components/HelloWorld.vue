<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Users</h3>
    <div class="card-container">
      <div v-for="user in users" :key="user.id" class="card">
        <p>{{ user.id }}</p>
        <p>{{ user.email }}</p>
      </div>
    </div>
    <h3>Services</h3>
    <div class="card-container">
      <div class="card">
        <img src="/discord.png" alt="Discord Logo" class="logo" />
        <p>Connect our bot to your discord server</p>
      </div>
      <div class="card">
        <img src="/github.png" alt="GitHub Logo" class="logo" />
        <p>Connect with Github</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      users: []
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      try {
        // const response = await fetch('http://127.0.0.1/user')
        // const data = await response.json()
        // this.users = data
        this.users = [{id: 1,email: 'martin.d-herouville@epitech.eu',password: 'oui',created_at: '2020-03-30 16:00:00',}]
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.card-container {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.2s ease-in-out;
}
.card:hover {
  transform: scale(1.05);
}
.logo {
  width: 75%;
  height: auto;
}
</style>
