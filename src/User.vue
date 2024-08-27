<template>
  <Header></Header>
  <Content></Content>
  <Footer></Footer>
</template>

<script>
import Content from './components/Content.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';


export default {
  components: {
    Footer,
    Header,
    Content
  },
};
</script>

