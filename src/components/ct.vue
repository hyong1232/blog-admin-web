<template>
  <transition
    v-bind="$attrs"
  >
    <slot></slot>
  </transition>
</template>

<script lang="ts" setup>
import {reactive, toRefs, ref} from "vue"
</script>

<style lang="scss" scoped>

.bounce-enter-active {
    animation: bounce 0.5s;
}
.bounce-leave-active {
    animation: bounce 0.5s reverse;
}
@keyframes bounce {
    0% {transform: scale(0);}
    50% {transform: scale(1.25);}
    100% {transform: scale(1);}
}
.side-fade-enter-from,
.side-fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
.side-fade-enter-active {
    transition: all .3s ease-out;
}
.side-fade-leave-active {
    transition: all .8s cubic-bezier(1, 0.5, 0.8, 1);
}
.v-enter-from,
.v-leave-to {
    opacity: 0;
}
.v-enter-active,
.v-leave-active {
    transition: opacity .5s ease;
}
</style>
