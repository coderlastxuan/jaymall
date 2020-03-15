<template>
  <div class="toast" v-show="isShow"> 
      {{msg}}
  </div>
</template>

<script>
export default {
    name: 'Toast',
    data() {
        return {
            isShow: false,
            msg: ''
        }
    },
    methods: {
        showToast(msg='', delay=1000) {
            this.msg = msg
            this.isShow = true
            setTimeout(() => {
                this.msg = ''
                this.isShow = false
            }, delay)
        }
    }
}
</script>

<style>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 5px 8px;
    color: #fff;
    background-color: rgba(0,0,0,.75);
    z-index: 99;
}
</style>