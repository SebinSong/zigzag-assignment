<template>
<li class="chatbox_you">
  <div class="container">
    <div class="img"><img :src="'@/../static/pictures/' + img"></div>
    <div class="contentbox">{{ content }}</div>
    <div class="time"><span>{{ time | timeTransform }}</span></div>
  </div>
</li>
</template>
<script>
import { strMin } from '@/js/utils';

export default {
  name: "Chatbox_you",
  props: [ "content", "time", "img" ],
  filters: {
    timeTransform(num){
      let date = new Date(num);
      let hr, min;

      hr = date.getHours().toString(10);
      min = date.getMinutes().toString(10);

      return `${hr}:${strMin(min)}`;
    }
  }
};
</script>
<style lang="scss">
@import '@/scss_modules/mixins.scss';

$text: #393042;
$slight-border: 1px solid rgba($text, 0.5);

li.chatbox_you {
  width: 100%;
  display: flex;
  padding: 2px 0px;
}

li.chatbox_you div.container {
  width: 90%;
  float: left;
  display: flex;
  justify-content: flex-start;
  position: relative;

  color: $text;

  div.contentbox {
    $bg-color: #fff;

    position: relative;
    max-width: 85%;
    border-radius: 4px;
    margin: {
      top: 3px; bottom: 3px;
      left: 65px; right: 3px;
    }
    padding: 7px 10px;
    background-color: $bg-color;
    box-shadow: -5px 3px 5px 2px rgba(0,0,0,0.15);
    line-height: 1.4em;

    @media screen and (max-width: 300px){
      word-wrap: break-word;
      word-break: break-all;
    }

    font: {
      size: 15px;
    }

    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 0; height: 0;
      top: 6px; left: -10px;

      border: {
        top: 5px solid transparent;
        bottom: 5px solid transparent;
        right: 10px solid $bg-color;
      }
    }
  }
  div.time {
    position: relative;
    max-width: 15%;
    padding: 3px;
    margin: 3px;
    margin-right: 0px;
    display: flex;
    align-items: flex-end;
    color: #fff;

    font: {
      size: 11px;
    }
  }
  div.img {
    position: absolute;
    width: 50px; height: 50px;
    border-radius: 50%;
    box-shadow:
    0px 0px 0px 2px rgba(255,255,255, 1),
    0px 0px 0px 4px rgba($text, 0.6);
    overflow: hidden;

    img {
      width: 100%; height: 100%;
    }

  }
}

</style>
