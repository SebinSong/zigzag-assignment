<template>
  <div class="list">
    <h2 class="friends">Friends List</h2>
    <ul class="userlist">
      <li v-for="(user, index) in myProp" class="userItem" :key="index" @click="getInChatRoom(user)">
        <div class="img"><img :src="'@/../static/pictures/' + user.img" /></div>
        <div class="userInfo">
          <div class="name">{{ user.name }}</div>
          <p class="msg">{{ user.dialog | shortenMsg }}</p>
          <span class="time">{{ user.dialog | stringifyTime }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { strMonth, strMin } from '@/js/utils';

export default {

  name: "List",
  data(){
    return {

    };
  },
  props: [ 'myProp' ],
  methods: {
    getInChatRoom(user){
      this.$emit("getin", user);
    }
  },
  filters: {
    shortenMsg(dialog){
      let str = dialog[dialog.length - 1].content;

      return (str.length < 30)? str :
              `${str.slice(0,27)}...`;
    },
    stringifyTime(dialog){
      let latest = new Date( dialog[dialog.length - 1].time );
      let now = new Date();
      let retString = "";

      now = {
        yr: now.getFullYear(), month: now.getMonth(), date: now.getDate(),
        hr: now.getHours(), min: now.getMinutes()
      };
      latest = {
        yr: latest.getFullYear(), month: latest.getMonth(), date: latest.getDate(),
        hr: latest.getHours(), min: latest.getMinutes()
      };

      if(now.yr === latest.yr){

        if(now.month === latest.month)
          retString = (now.date === latest.date)?
                        `${latest.hr}:${strMin(latest.min)}` :
                        `${latest.date} ${strMonth(latest.month)}`;
        else
          retString = `${latest.date} ${strMonth(latest.month)}`;

      }
      else
        retString = `${strMonth(latest.month)} ${latest.yr}`;

      return retString;
    }
  },
  mounted(){

  }
};

</script>
<style lang="scss" >

$itemh: 90px;
$text: #393042;
$bg_list: #DAD6CD;
$slight-border: 1px solid rgba($text, 0.5);

div.list {
  position: absolute;
  width: 100%; height: 100%;

  font: {
    family: "Monda", courier;
    size: 17px;
  }
}

h2.friends {
  position: absolute;
  width: 100%; height: 50px;
  top: 0; left: 0;

  line-height: 50px;
  text-align: center;

  background-color: $text;
  color: #fff;

  font: {
    size: 19px;
    weight: 500;
  }
}

ul.userlist {
  position: absolute;
  width: 100%; height: calc(100% - 50px);
  bottom: 0; left: 0;

  overflow-y: auto;

  li {
    height: $itemh;
    line-height: $itemh;

    border-top: $slight-border;
  }

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

li.userItem {

  cursor: pointer;
  color: $text;
  div {
    height: 100%;
  }
}

div.img{
  width: $itemh;
  float:left;

  border: {
    right: $slight-border;
  }

  img {
    width: 100%; height: 100%;
  }
}

div.userInfo{
  position: relative;
  overflow: hidden;

  width: calc(100% - 90px); height: 100%;
  float: right;
  padding-left: 15px;

  &:hover {
    background-color: rgba($text, 0.05);
  }
  &:active {
    background-color: rgba($text, 0.15);
  }

  display: flex;
  flex-direction: column;
  justify-content: center;

  font-weight: bold;

  div.name, p.msg {
    line-height: 1.4em;
    height: min-content; width: max-content;
    max-width: 90%;
  }
  div.name {
    padding: 5px;
    color: $text;
  }
  p.msg {
    font-size: 13px;
    padding: 0px 5px;
    color: rgba($text, 0.55);
    word-wrap: break-word;
  }
  span.time {
    position: absolute;
    top: 8px; right: 8px;
    color: rgba($text, 0.55);

    font: {
      size: 12px;
    }
    line-height: 1.1em;
  }
}

</style>
