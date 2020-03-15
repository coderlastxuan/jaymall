import BackTop from 'components/content/backtop/BackTop'

export const BackTopMixin = {
    data() {
        return{
            isShowBackTop: false,
        }
    },
    methods: {
        backTop() {
            this.$refs.scroll.scroll.scrollTo(0,0,500)
        },
    },
    components: {
        BackTop,
    }
}