<template>
  <div class="typingani">
    <p class="text">{{ name }} is<br />typing ...</p>
    <div class="ani"><span class="obj one"></span><span class="obj two"></span></div>
  </div>
</template>
<script>
  export default {
    name: "TypingAnimation",
    props: [ 'name' ]
  };
</script>
<style lang="scss">
$text: #393042;

div.typingani {
  border: 1px solid rgba(125,20,25,0.7);
  position: absolute;
  bottom: 2px; left: 2px;
  background-color: $text;

  outline: 1px solid #fff;
  outline-offset: -3px;

  min-width: 120px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  p.text {
    width: max-content; height: max-content;
    color: #fff;
    font: {
      size: 11px; weight: bold;
    }
    line-height: 1.1;
    margin-right: 8px;
  }

  div.ani {
    position: relative;
    width: 30px; height: 30px;
    border: 1px solid #fff;
    border-radius: 3px;

    span.obj {
      position: absolute;
      width: 11px; height: 11px;
      border: 1px solid #fff;
      border-radius: 3px;
    }

    span.one {
      top: 2px; left: 2px;
      animation: moveone 1s ease-out infinite;
    }
    span.two {
      top: 15px; left: 15px;
      background-color: #fff;
      animation: movetwo 1s ease-out infinite;
    }

    @keyframes moveone {
      0%{ top: 2px; left: 2px; }
      25%{ top: 2px; left: 15px; }
      50%{ top: 15px; left: 15px; }
      75%{ top: 15px; left: 2px; }
      100%{ top: 2px; left: 2px; }
    }

    @keyframes movetwo {
      0%{ top: 15px; left: 15px; }
      25%{ top: 15px; left: 2px; }
      50%{ top: 2px; left: 2px; }
      75%{ top: 2px; left: 15px; }
      100%{ top: 15px; left: 15px; }
    }
  }
}
</style>
