<script>
export default {
props: {
  user: {
    type: Object,
    required: true
  },
},
data() {
  return {
    pics: this.user.pics || []
  }
},
watch: {
  'user.pics': {
    handler(newPics) {
      this.pics = newPics;
    },
    immediate: true,
    deep: true
  }
}


}

</script>
  
<template class="pics">
  <div class="card flex-fill mb-3 bg-white y" v-if="user.pics && user.pics.length === 0">
    <img src="https://th.bing.com/th/id/R.f73b090264984c91166b1a038bcb988a?rik=yMdm4pld0JN95w&pid=ImgRaw&r=0" alt="" class="card-img-top">
  </div>
  <div class="card flex-fill mb-3 bg-white y" v-else-if="user.pics && user.pics.length === 1">
    <img :src="user.pics[0]" alt="" class="card-img-top">
  </div>
  <div class="card flex-fill mb-3 bg-white y" v-else>
    <div id="carouselControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item" v-for="(pic, index) in user.pics" :class="{ active: index === 0 }">
          <img :src="pic" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
