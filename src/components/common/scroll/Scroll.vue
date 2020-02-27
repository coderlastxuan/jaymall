<template>
  <div class="scroll-wrapper" ref="wrapper">
      <div class="scroll-content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    data() {
        return {
            scroll: null
        }
    },
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullupLoad: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            probeType: this.probeType,
            pullupLoad: this.pullupLoad
        }),
        this.scroll.on('scroll',(pos) => {
            this.$emit('scrollPos',pos)
        }),
        this.scroll.on('pullingUp',() => {
            this.$emit('loadMore')
        })
    },
    methods: {
        refresh() {
            this.scroll && this.scroll.refresh()
            console.log("refreshed");            
        }
    }

}
</script>

<style>

</style>