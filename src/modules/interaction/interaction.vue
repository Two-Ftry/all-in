<template>
  <div class="interaction">
      <div class="submenu">
          <ul class="clearfix">
              <li v-for="item in submenu"
                :class="{'active': item.to.name == $route.name}"
                @click="handleMenu(item.to)"
              >
                  {{item.name}}
              </li>
          </ul>
      </div>
      <div class="interaction-page">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            submenu: [
                {
                    name: '鼠标事件',
                    to: {
                        name: 'mouse'
                    }
                },
                {
                    name: '触摸事件',
                    to: {
                        name: 'touch'
                    }
                },
                {
                    name: '缩放、平移',
                    to: {
                        name: 'zoom'
                    }
                },
                {
                    name: '拖拽',
                    to: {
                        name: 'drag'
                    }
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
.interaction{
    height: 100%;
    display: flex;
    flex-direction: column;
    .interaction-page {
        flex: 1;
        overflow: hidden;
    }
}
.submenu {
    li {
        float: left;
        line-height: 24px;
        padding: 0 8px;
        &:hover{
            background-color: #ccc;
        }
        cursor: pointer;
    }
    .active{
        background-color: green;
        color: #fff;
    }
}
</style>