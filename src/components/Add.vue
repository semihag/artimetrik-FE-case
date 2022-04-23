<template>
    <div @click="Add">
       
    </div>

</template>
<script>
export default {
    methods : {
        Add() {
            this.$emit('Add')
        }
    }
}
</script>
<style scoped>
div {
    cursor:pointer;
}
</style>