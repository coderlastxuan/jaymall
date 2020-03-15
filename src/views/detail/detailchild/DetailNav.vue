<template>
  <div class="detail-nav">
      <nav-bar>
          <div slot="left" class="nav-back">
              <img src="~assets/img/common/back.svg" alt="" @click="goBack">
          </div>
          <div slot="center" class="nav-title">
              <div v-for="(title, index) in titles" class="nav-title-item" 
              :class="{'active':index === currentIndex}" @click="navclick(index)" :key="index">
              {{title}}
              </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name: 'DetailNav',
    data() {
       return {
            titles: ['商品','参数','评论','推荐'],
            currentIndex: 0,
       }
    },
    components: {
        NavBar
    },
    methods: {
        navclick(index) {
            this.currentIndex = index
            this.$emit('titleClick',index)
        },
        goBack() {
            this.$router.back()
            this.$bus.$emit('deBackToHome')
        }
    }
}
</script>

<style>
.nav-title{
    display: flex;
    font-size: 14px;
}

.nav-title-item {
    flex:1;
}

.active {
    color: var(--color-high-text);
}

.nav-back img {
    margin-top: 12px;
    width: 20px;
}
</style>