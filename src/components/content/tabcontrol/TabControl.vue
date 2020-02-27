<template>
  <div class="hometab">
      <div v-for="(item,index) in titles" class="tab-items" :class="{active:index == currentIndex}"
      @click="itemClick(index)" :key="index">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'TabControl',
    data() {
        return {
            currentIndex: 0
        }
    },
    props: {
        titles: {
            type: Array,
            default() {
            return []
            }
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index
            this.$emit('tabClick',index)
        }
    }

}
</script>

<style>
.hometab {
    display: flex;
    text-align: center;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
}

.tab-items {
    flex: 1;
}

.active {
    color: var(--color-high-text); 
}

.active span {
    border-bottom: 3px solid var(--color-tint);
}

.tab-items span {
    padding: 5px;
}
</style>