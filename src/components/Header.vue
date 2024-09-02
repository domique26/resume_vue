<script>
import DropdownMenu from './DropdownMenu.vue';

export default {
  components: {
    DropdownMenu,
  },
  data() {
    return { 
      user: {},
    };
  },
  created() {
    fetch(`http://localhost:3000/users/${this.$route.params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      this.user = data;
    })
    .catch(error => console.error('Error:', error));
  }
};
</script>


<template>
  <header class="container-fluid">
    <div class="row">
      <div class="col-3">
      </div>
      <div class="col-6 d-flex justify-content-between align-items-center p-3">
        <img id="logo" src="../assets/images/sybit_logo_new.png" alt="Logo" class="logo me-3 d-none d-md-block">
        <h1 v-if="user?.first_name || user?.last_name" id="title" class="m-0 fs-4 fs-md-3 fs-lg-2">{{ user?.first_name + " " + user?.last_name }}</h1>
      </div>
      <div class="header-box col-3 d-flex justify-content-end">
        <router-link to="/form">
        <button class="header_item">Go to Form</button>
        </router-link>
        <DropdownMenu></DropdownMenu>
      </div>
    </div>
  </header>
</template>
