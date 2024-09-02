<template>
    <router-view :key="$route.fullPath"/>
</template>

<script>
import DropdownMenu from './components/DropdownMenu.vue';

export default {
  components: {
    DropdownMenu
  },
};
</script>