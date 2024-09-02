<template>
  <div class="dropdown">
    <button @click="reloadPage" class="header_item btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
      aria-expanded="false">
      User
    </button>
    <ul v-if="reloaded" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li v-for="(user, index) in users" :key="index">
        <div class="user-item">
          <a @click="selectUser(user)" class="dropdown-item">
            {{ user.first_name }} {{ user.last_name }}
          </a>
          <button @click="deleteUser(user, index)" class="delete-button">x</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      reloaded: false,
    }
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch(`http://localhost:3000/users/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.json())
        .then(data => {
          this.users = data;
          console.log(data);
        })
        .catch(error => console.error('Error:', error));
    },
    reloadPage() {
      this.reloaded = false;
      this.fetchUsers();
      this.reloaded = true;
    },
    selectUser(user) {
      this.$router.push({ path: `/users/${user._id}` });
    },
    deleteUser(user, index) {
      fetch(`http://localhost:3000/users/${user._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          this.users.splice(index, 1);
        })
        .catch(error => console.error('Error:', error));
    }
  },
  watch: {
    users(newUsers) {
      this.reloaded = true;
    }
  }
}
</script>