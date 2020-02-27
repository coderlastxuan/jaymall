<template>
  <div class="tabbar_item" @click="click">
      <div v-if="isActive"><slot name="item-icon-active"></slot></div>
      <div v-else><slot name="item-icon"></slot></div>
      <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
    name: 'TabBarItem',
    data(){
        return{
            // isActive:false,
        }
    },
    computed:{
        isActive(){
            return this.$route.path.indexOf(this.path) != -1
        },
        activeStyle(){
            return this.isActive ? {color:this.activeColor} : {}
        }
    },
    props:{
        path: String,
        activeColor: {
            type: String,
            default: 'pink'
        }
    },
    methods:{
        click(){
            this.$router.push(this.path)
            this.isActive = !this.isActive
        }
    }
}
</script>

<style>
    .tabbar_item{
        flex: 1;
        float: left;
        height: 49px;
        text-align: center;
        font-size: 14px;
    }
    .tabbar_item img{
        margin-top: 3px;
        margin-bottom: 2px;
        width: 24px;
        height: 24px;
        vertical-align: middle;
    }
    /* .tabbar_item .active{
        color: pink;
    } */
</style>