<template>
<li class="chatbox_me">
  <div class="container">
    <div class="time"><span>{{ time | timeTransform }}</span></div>
    <div class="contentbox">{{ content }}</div>
  </div>
</li>
</template>
<script>
import { strMin } from '@/js/utils';

export default {
  name: "Chatbox_me",
  props: [ "content", "time" ],
  filters: {
    timeTransform(num){
      let date = new Date(num);
      let hr, min;

      hr = date.getHours().toString(10);
      min = date.getMinutes().toString(10);

      return `${hr}:${strMin(min)}`;
    }
  },
  mounted(){

  }
};
</script>
<style lang="scss">
$text: #393042;
$slight-border: 1px solid rgba($text, 0.5);

li.chatbox_me {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 2px 0px;
}

li.chatbox_me div.container {
  width: 85%;
  float: right;
  display: flex;
  justify-content: flex-end;

  color: $text;

  div.contentbox {
    $bg-color: #fff;

    position: relative;
    max-width: 85%;
    border-radius: 4px;
    margin: {
      top: 3px; bottom: 3px;
      left: 3px; right: 18px;
    }
    padding: 7px 10px;
    background-color: $bg-color;
    box-shadow: 5px 3px 5px 2px rgba(0,0,0,0.15);
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
      bottom: 6px; right: -10px;

      border: {
        top: 5px solid transparent;
        bottom: 5px solid transparent;
        left: 10px solid $bg-color;
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
}

</style>
