<script>
export default {
  data() {
    return { 
      user: {},
    };
  },
  created() {
    fetch(`http://localhost:8000/users/${this.$route.params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      this.user = data; 
    })
    .catch(error => console.error('Error:', error));
  }
};
</script>

<template> 
  <footer class="text-white text-center py-3">
    <p class="mb-2">© 2024 {{ user.first_name + " " + user.last_name }}. All rights reserved.</p>
    <ul class="list-inline mb-0">
      <li class="list-inline-item"><a href="#" class="text-white">Privacy Policy</a></li>
      <li class="list-inline-item"><a href="#" class="text-white">Terms of Service</a></li>
      <li class="list-inline-item"><a href="#" class="text-white">Contact Us</a></li>
    </ul>
  </footer>
</template>
