<template>
  <div id="app">
    <h2 id="title">Chat Room</h2>
    <content>
      <transition name="router">
        <router-view
          :myProp="myProps"
          @getin="getIn"
          @back="resort" />
      </transition>
    </content>
    <transition name="cover">
      <Cover @coverclose="coverOn = !coverOn" v-if="coverOn"/>
    </transition>
  </div>
</template>

<script>
import userList from "./js/userList";
import Cover from "@/components/Cover";

export default {
  name: 'App',
  components: { Cover },
  data(){
    return {
      userData: null,
      selectedUser: null,
      coverOn: true
    };
  },
  computed: {
    myProps(){
      if(this.$route.name === "List") return this.userData;
      else return this.selectedUser;
    }
  },
  methods: {
    getIn(user){
      this.selectedUser = user;

      this.$router.push({
        name: "Room",
        params: { id: user.name }
      });
    },
    resort(){
      this.userData.sort( (a, b) => {
        let [a_time, b_time] = [
          a.dialog[a.dialog.length -1].time,
          b.dialog[b.dialog.length -1].time
        ];
        return b_time - a_time;
      });
    }
  },
  mounted(){
    this.userData = userList.slice();
    this.resort();
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Monda");
@import './scss_modules/normalize.scss';
@import './scss_modules/mixins.scss';

$text: #393042;

#app {
  @include absoluteCenter;

  width: 350px; height: 600px;
  background-color: #fff;

  border: 1px solid rgba($text, 0.5);
  overflow: hidden;

  box-shadow: 15px 15px 0px 0px rgba(0,0,0,0.2);
  outline: 1px solid rgba(#fff,0.4);
  outline-offset: 4px;

  @media screen and (max-width: 350px){
    width: 100vw;
  }

  @media screen and (max-height: 600px){
    height: 100vh;
  }
}

h2#title {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 70px;

  background: #5348f2;
  background: -moz-linear-gradient(-45deg, #5348f2 0%, #2c6bd6 50%, #60a5ea 100%);
  background: -webkit-linear-gradient(-45deg, #5348f2 0%,#2c6bd6 50%,#60a5ea 100%);
  background: linear-gradient(135deg, #5348f2 0%,#2c6bd6 50%,#60a5ea 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5348f2', endColorstr='#60a5ea',GradientType=1 );
  /*
  background: #2c9ff7;
  background: -moz-linear-gradient(-45deg, #2c9ff7 0%, #c20139 51%, #7d73ef 100%);
  background: -webkit-linear-gradient(-45deg, #2c9ff7 0%,#c20139 51%,#7d73ef 100%);
  background: linear-gradient(135deg, #2c9ff7 0%,#c20139 51%,#7d73ef 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2c9ff7', endColorstr='#7d73ef',GradientType=1 );
  */
  background-size: 300% 300%;

  animation: bgani 15s ease-in-out infinite;

  color: #fff;
  text-align: center;

  letter-spacing: 2px;
  line-height: 70px;
  font: {
    family: "Monda", courier;
    size: 20px;
  }

  @keyframes bgani {
    0%{ background-position: 0% 0%; }
    50%{ background-position: 100% 100%; }
    100%{ background-position: 0% 0%; }
  }

}

content {
  position: absolute;
  bottom: 0; left: 0;
  width: 100%; height: calc(100% - 70px);
  overflow: hidden;
}


.router-enter {
  opacity: 0;
  left: -100%;
}
.router-enter-active {
  animation: routerIn 0.3s ease-out;
}
.router-leave-active {
  animation: routerOut 0.3s ease-out;
}

@keyframes routerIn {
  0%{ left: -100%; }
  100%{ left: 0; }
}
@keyframes routerOut {
  0%{ left: 0; }
  100%{ left: 100%; }
}
.router-leave-to {
  left: 100%;
}

.cover-leave-active {
  animation: coverOut 0.4s ease-out;
}
.cover-leave-to {
  top: 100%; opacity: 0;
}
@keyframes coverOut {
  0%{ top: 0; opacity: 1; }
  100%{ top: 100%; opacity: 0; }
}

</style>
