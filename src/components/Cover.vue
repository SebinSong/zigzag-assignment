<template>
  <div class="cover" :class="{close: close}">
    <div class="circle">
      <p>ZigZag<br/>ChatRoom</p>
      <button @click="close = !close">Get In</button>
    </div>

    <p class="info">Created with Vue.js, SASS<br />By. Sebin Song<br />On. Aug 8th</p>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        close: false
      };
    }
  };
</script>
<style lang="scss">
@import '@/scss_modules/mixins.scss';

div.cover {
  $zigzag: #C20139;
  $slight: rgba(0,0,0,0.1);

  position: absolute;
  width: 100%; height: 100%;
  transition: all 0.5s ease-out;
  top: 0;

  outline: 2px solid #fff;
  outline-offset: -10px;

  font: {
    family: "Monda", courier;
    size: 20px;
  }

  background:
  linear-gradient(135deg, $slight 25%, transparent 25%) -25px 0,
  linear-gradient(225deg, $slight 25%, transparent 25%) -25px 0,
  linear-gradient(315deg, $slight 25%, transparent 25%),
  linear-gradient(45deg, $slight 25%, transparent 25%);
  background-size: 50px 50px;
  background-color: $zigzag;

  z-index: 1;

  animation: bgmove 1s linear infinite;

  &.close {
    top: 120%;
  }

  div.circle {
    @include absoluteCenter;

    width: 220px; height: 220px;
    border-radius: 50%;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:after {
      @include absoluteCenter;
      content: "";
      display: block;
      width: 110%; height: 110%;

      border: 3px solid #fff;
      border-radius: 50%;
    }

    font: {
      weight: bold;
      size: 20px;
    }
    color: $zigzag;

    @media screen and (max-width: 300px){
      width: 200px; height: 200px;
    }

    p {
      line-height: 1.4;
      text-align: center;
      text-shadow: 2px 2px 0px rgba($zigzag, 0.2);
      letter-spacing: 3px;

      margin-bottom: 12px;
    }

    button {
      padding: 5px 10px;
      color: inherit;
      text-shadow: 2px 2px 0px rgba($zigzag, 0.2);
      font: {
        weight: bold; size: 15px; family: "Monda";
      }

      background-color: #fff;
      border: 2px solid rgba($zigzag, 0.8);
      outline: 2px solid rgba($zigzag, 0.8);
      outline-offset: -5px;

      cursor: pointer;
      z-index: 1;

      &:hover { background-color: rgba($zigzag, 0.075); }
      &:active { transform: scale(0.97); }
    }
  }

  p.info {
    position: absolute;
    bottom: 20px; right: 20px;
    text-align: right;
    color: #fff;

    font: {
      size: 12px; family: "Monda";
    }
  }
}

@keyframes bgmove {
  0% { background-position: -25px 0, -25px 0, 0 0, 0 0; }
  100% { background-position: 25px 0, 25px 0, 50px 0, 50px 0; }
}


</style>
