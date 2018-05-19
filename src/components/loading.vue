<template>
   <div class="loading" v-show="loading">
      <div class="loading-inner">
        <label></label>
        <label></label>
        <label></label>
        <label></label>
        <label></label>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
/*loading动画*/
.loading {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  user-select: none;
  overflow: hidden;
}

.loading-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}
.loading-inner label {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 10px;
  border-radius: 50%;
  background: #39f;
}

.loading-inner label:nth-child(1) {
  animation: loader 3s 600ms infinite ease-in-out;
}

.loading-inner label:nth-child(2) {
  animation: loader 3s 500ms infinite ease-in-out;
}

.loading-inner label:nth-child(3) {
  animation: loader 3s 400ms infinite ease-in-out;
}

.loading-inner label:nth-child(4) {
  animation: loader 3s 300ms infinite ease-in-out;
}

.loading-inner label:nth-child(5) {
  animation: loader 3s 200ms infinite ease-in-out;
}

.loading-inner label:nth-child(6) {
  animation: loader 3s 100ms infinite ease-in-out;
}

@keyframes loader {
  0% {
    opacity: 0;
    transform: translateX(-300px) scale(1);
  }
  33% {
    opacity: 1;
    transform: translateX(0px) scale(2);
  }
  66% {
    opacity: 1;
    transform: translateX(0px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(300px) scale(2);
  }
}
</style>
