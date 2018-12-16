<template>
  <div class="room">
    <h2 class="name"><span id="span_name">{{ $route.params.id }}</span><span id="back" @click="back">Back</span></h2>
    <div class="ulWrapper">
      <ul class="dialog" ref="ul">
        <template v-for="(item, index) in dialog">
          <Datebox v-if="item.author === 'date'" :date="item.content" />
          <Chatbox-me v-else-if="item.author === 'me'" v-bind="{ content: item.content, time: item.time }" />
          <Chatbox-you v-else v-bind="{ content: item.content, time: item.time, img: myProp.img }" />
        </template>
      </ul>
      <Typing-animation v-show="aniOn" :name="myProp.name" />
    </div>
    <div class="input">
      <input type="text" placeholder="type something to send.." v-model="text" @keydown.enter="submit"/><button @click="submit">Send</button>
    </div>
  </div>
</template>
<script>
// Components import
import ChatboxMe from "./chatbox/Chatbox_me";
import ChatboxYou from "./chatbox/Chatbox_you";
import Datebox from './chatbox/Datebox';
import TypingAnimation from './chatbox/TypingAnimation';

import { strMonth, dateString } from '@/js/utils';

export default {
  name: "Room",
  data(){
    return {
      dialog: null,
      text: null,
      aniOn: false
    };
  },
  components: {
    ChatboxMe, ChatboxYou, Datebox, TypingAnimation
  },
  props: [ 'myProp' ],
  methods: {
    back(){
      this.$emit("back");
      this.$router.go(-1);
    },

    submit(){
      if(!this.text.trim()) return;

      if(this.areDatesDifferent(Date.now(), this.dialog[this.dialog.length - 1].time)){
        this.myProp.dialog.push({
          author: "date", content: dateString(Date.now())
        });
      }

      this.myProp.dialog.push(
        {
          author: "me",
          time: Date.now(),
          content: this.text
        }
      );

      let text = this.text;
      this.text = "";

      if(!this.aniOn){

        this.aniOn = true;

        setTimeout(()=>{
          this.aniOn = !this.aniOn;
          this.myProp.dialog.push(
            {
              author: "you",
              time: Date.now(),
              content: this.gibberish(text)
            }
          );
        }, 1000 + Math.random()*1200 );

      }

    },
    areDatesDifferent(time1, time2){
      let [ str1, str2 ] = [
        dateString(time1), dateString(time2)
      ];

      return str1 !== str2;
    },
    gibberish(text){
      let wordsArr = text.trim()
                         .replace(/[\]\[\+\!\*\.\?\>\<\@\#\$\=\%\^\&\*\)\(\`\"\'\-]+/g, "")
                         .split(" ");

      return wordsArr.map(mix).join(" ");

      function mix(word){
        word = word.split("");

        for(let i=0; i<5; i++){
          word.sort( (a,b) => [-1,1][Math.floor(2*Math.random())] );
        }

        return word.join("");
      }
    },
    scrollTop(){
      const ul = this.$refs.ul;

      if(!ul) return;

      let gap = ul.scrollHeight - ul.clientHeight;

      if(gap != ul.scrollTop) ul.scrollTop = gap;
    },
    insertDate(dialog){
      let track = null;
      const info = [];

      dialog.forEach( (item, index) => {
        let dateStr = dateString(item.time);

        if( !track || dateStr !== track){
          track = dateStr;
          info.push([index, dateStr]);
        }
      });

      info.forEach( item => {
        dialog.splice(item[0], 0, {
          author: "date",
          content: item[1]
        });
      });
    }

  },
  created(){
    if(!this.myProp) this.$router.replace({ path: '/' });
  },
  mounted(){
    this.dialog = this.myProp.dialog;

    if(this.dialog[0].author !== "date")
      this.insertDate(this.dialog);


  },
  updated(){
    this.scrollTop();
  }
};

</script>
<style lang="scss" >
$text: #393042;
$bg_list: #DAD6CD;
$slight-border: 1px solid rgba($text, 0.5);

div.room {
  position: absolute;
  width: 100%; height: 100%;

  font: {
    family: "Monda", courier;
    size: 17px;
  }
}

h2.name {
  position: relative;
  width: 100%; height: 50px;

  line-height: 50px;
  text-align: center;

  background-color: $text;
  color: #fff;

  font: {
    size: 19px;
    weight: 500;
  }

  span#back {
    position: absolute;
    left: 10px; top: 50%;
    transform: translateY(-50%);
    color: rgba(#fff, 0.8);
    font-size: 14px;

    border: 1px solid rgba(#fff, 0.8);
    border-radius: 5px;
    line-height: 1.2em;
    padding: 5px;
    cursor: pointer;
    opacity: 0.4;

    &:hover { opacity: 0.6; }
    &:active { opacity: 1; margin-top: 1px; }
  }
}
div.ulWrapper {
  position: relative;
  width: 100%; height: calc(100% - 110px);
}
ul.dialog {
  $zigzag: rgba(#C20139, 0.9);
  $slight: rgba(0,0,0,0.1);

  position: absolute;
  width: 100%; height: 100%;
  background-color: rgba($text, 0.1);
  padding: 10px;
  padding-bottom: 15px;

  overflow-y: auto;

  background:
  linear-gradient(135deg, $slight 25%, transparent 25%) -25px 0,
  linear-gradient(225deg, $slight 25%, transparent 25%) -25px 0,
  linear-gradient(315deg, $slight 25%, transparent 25%),
  linear-gradient(45deg, $slight 25%, transparent 25%);
  background-size: 50px 50px;
  background-color: $zigzag;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-left: $slight-border;
  }

  &::-webkit-scrollbar-thumb {
    $pattern: rgba(0,0,0,0.2);

    background-color: rgba($text, 0.85);
    border-radius: 5px;
  }
}

div.input {
  position: relative;
  width: 100%; height: 60px;
  border-top: $slight-border;

  input {
    height: 100%; width: 80%;
    padding: 15px;
    color: $text;
    background-color: #fff;

    font: {
      family: "Monda", courier;
      size: 17px;
    }
  }

  button {
    position: absolute;
    right: 10px; top: 50%;
    transform: translateY(-50%);

    padding: 6px 10px;
    box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.075);
    cursor: pointer;

    font: {
      family: "Monda", courier;
      size: 17px;
    }

    color: #fff;
    background: #5348f2;
    background: -moz-linear-gradient(-90deg, #5348f2 0%, #2c6bd6 50%, #60a5ea 100%);
    background: -webkit-linear-gradient(-90deg, #5348f2 0%,#2c6bd6 50%,#60a5ea 100%);
    background: linear-gradient(180deg, #5348f2 0%,#2c6bd6 50%,#60a5ea 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5348f2', endColorstr='#60a5ea',GradientType=1 );

    &:hover { outline: 1px solid rgba($text, 0.3); outline-offset: 2px; }
    &:active { margin-top: 1px; }
  }
}

</style>

// ZIZZHZ
