<template>
  <Teleport to="body">
    <div v-if="this.$store.getters.IS_MODAL_OPEN" class="custom-modal">
       <img style="position:absolute;top:10px;right:10px;width: 24px; cursor: pointer" 
              @click="this.$store.commit('SET_MODAL_OPEN', false)"
              src="../images/close.svg"
            />
      <slot name="content"></slot>
    </div>
  </Teleport>
</template>

<style>
.custom-modal {
  background: white;
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  min-width: 350px;
  margin-left: -150px;
  padding: 30px;
  border: 1px solid gray;
   transition: all .3s ease;
}
h5 {
  text-align: center;
}
</style>
