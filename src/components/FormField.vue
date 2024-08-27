<script>
export default {

}
</script>

<template>
  <div class="field d-flex flex-md-row flex-column my-3 px-0">
    <slot></slot>
  </div>
</template>

<style>
.field {
  width: 100%;
  flex-grow: 1;
  align-items: stretch;
  justify-content: space-between;
  margin: 0;
  padding: 0;
}

.container > .field > * {
  background-color: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 12px;
  margin: 3px;
}

.field > * {
  color:white;
}

input, textarea {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.final_button {
  width: 300px;
  background-color: rgba(105, 64, 168, 0.631);
  color: whitesmoke;
  display: flex;
  justify-content: center;
  border: 2px solid wheat;
  border-radius: 12px;
  margin: 3px;
}

button:hover {
  background-color: rgba(0,0,0,30%);
}

input::placeholder, textarea::placeholder{
  color: rgba(255, 255, 255, 0.6);
}

.field > p {
  flex-grow: 1;
  text-align: center;
  padding: 6px;
}

.delete_field {
  background-color: rgba(0, 0, 0, 0.2);
  min-width: 150px;
  max-width: 250px;
}

</style>