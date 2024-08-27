<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="card flex-fill mb-3">
    <img v-if="src==''" src="https://th.bing.com/th/id/R.f73b090264984c91166b1a038bcb988a?rik=yMdm4pld0JN95w&pid=ImgRaw&r=0" :alt="alt" class="card-img-top">
    <img v-else="" :src="src" :alt="alt" class="card-img-top">
  </div>
</template>
