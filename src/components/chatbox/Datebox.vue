<template>
  <li class="datebox">
    <span>- - - - - {{ date }} - - - - -</span>
  </li>
</template>
<script>
export default {
  name: 'Datebox',
  props: [ 'date' ],
  mounted(){
  }
};
</script>
<style lang="scss">
$text: #393042;

li.datebox {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 4px 0;


  span {
    font-size: 12px;
    color: #fff;
    line-height: 1.1em;
  }
}
</style>
