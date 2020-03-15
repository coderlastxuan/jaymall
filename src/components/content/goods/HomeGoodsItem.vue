<template>
  <div class="goodslist-item" @click="toDetail">
      <img v-lazy="imgSrc" alt="" @load="imgLoad">
      <div class="item-info">
          <p class="item-title">{{goodsItem.title}}</p>
          <span class="item-price">{{goodsItem.price}}</span>
          <span class="item-icon">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name: 'HomeGoodsItem',
    props: {
        goodsItem: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        imgSrc() {
            return this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods: {
        imgLoad() {
            this.$bus.$emit('imgLoad')
        },
        toDetail() {
            let iid = this.goodsItem.iid
            this.$router.push({
                path: '/detail',
                query:{iid}
            })
        }
    }
}
</script>

<style>
.goodslist-item {
    width: 50%;
    padding: 5px;
}

.goodslist-item img {
    width: 100%;
    border-radius: 5px;
}

.item-info {
    font-size: 13px;
    text-align: center;
    position: relative;
}

.item-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.item-price {
    color: var(--color-high-text);
    margin-right: 20px;
}

.item-icon::before {
    content: '';
    position: absolute;
    top: 14px;
    right: 85px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>