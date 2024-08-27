<script>
export default {
  props: {
    title: String
  }
}
</script>

<template>
  <div class="card flex-fill mb-3">
    <div class="card-body">
      <h5 class="card-title" style="word-wrap: break-word;">{{ title }}</h5>
      <slot></slot>
    </div>
  </div>
</template>
