<template>
  <div class="sidebar-box">
      <h1>My C3</h1>
      <ul>
          <li v-for="menu in menus"
            :class="{'active': $route.name === menu.to}"
            @click="handleMenu(menu.to)">
              {{menu.name}}
            </li>
      </ul>
  </div>
</template>

<script>
export default {
    data () {
        return {
            menus: [
                {
                    name: '新建',
                    to: 'edit'
                },
                {
                    name: '列表',
                    to: 'list'
                }
            ]
        };
    },

    components: {},

    computed: {},

    mounted () {},

    methods: {
        handleMenu (to) {
            this.$router.push(to);
        }
    }
}
</script>
<style lang='less' scoped>
@import url('../../common/colors.less');
.sidebar-box{
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: @inverse;
    color: #fff;
    text-align: center;
    h1 {
        
    }
    li {
        height: 45px;
        line-height: 45px;
        cursor: pointer;
        &:hover{
            color: @primary;
        }
    }
    li.active {
        color: @primary;
    }
}
</style>