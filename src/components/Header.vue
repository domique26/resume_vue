<script>
import DropdownMenu from './DropdownMenu.vue';

export default {
  components: {
    DropdownMenu
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
      <div class="col-3"></div>
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

<style>
#form_btn {
  background-color: black;
  color: white;
}

.header_item {
  padding: 5px;
  border: none;
}

.dropdown-item {
  background-color: rgba(0, 0, 0, 0.7);
  color:white;
}
.dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.header_item, .dropdown-menu {
  background-color: rgba(0, 0, 0, 0.2);
  color:white;
}

.header_item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color:white;
  border-radius: 15px;
  border: 5px solid white;
}

.header-box {
  display: flex;
  align-items: center;
}

</style>
 