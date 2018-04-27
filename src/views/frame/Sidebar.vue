<template>
  <div v-show="childRoute.length > 0">      
    <div class="h-sidebar-head">
      <div class="h-sidebar-head-search" v-show="isSidebarExpand">   
         <h-select v-model="search" style="width: 150px;" 
                 ref = "select"
                 :placeholder="searchText" 
                 :not-found-text="notFoundText"
                 filterable
                 @on-change="handleSearch">
          <h-option v-for="(item, index) in searchRoute" :value="item.path" :key="item.name" v-if="!item.hidden">{{ item.name}}</h-option>
        </h-select>  
      </div>
      <div class="expandIcon" @click.prevent.stop="expandSiderbar">
        <!-- 展开 -->
        <h-icon name="navicon"></h-icon>
      </div>
    </div>
    <div class="h-sidebar-menu">   
      <h-menu mode='vertical' 
              theme='dark' 
              accordion
              :collapse="!sidebar.opened"
              width='220px'>
          <sidebar-item :routes="childRoute"></sidebar-item>  
      </h-menu>
    </div>
  </div>
</template>
<script>
  /* mapGetters工具函数会将store中的getter映射到局部计算属性中 */
  /* 使用对象扩展操作符把getter混入到computed中 */
  import { mapGetters } from 'vuex'
  import SidebarItem from './SidebarItem'
  export default {
    data () {
      return {
        isAccordion: true,
        childRoute: [],
        search: '',
        searchText: '请输入关键词',
        notFoundText: '没有匹配页面',
        menusType: window.sessionStorage.getItem('menusType')
      }
    },
    components: {
      SidebarItem
    },
    computed: {
      ...mapGetters([
        'activeIndex',
        'menusRoot',
        'menusNoRoot',
        'searchRoute',
        'sidebar'
      ]),
      isSidebarExpand () {
        return this.sidebar.opened
      }
    },
    watch: {
      activeIndex () {
        this.computChildRoute()
      }
    },
    methods: {
      handleSearch (path) {
        this.search = ''
        this.$refs.select.setQuery('')
        this.$nextTick(() => {
          setTimeout(() => {
            this.$router.push(path)
          }, 300)
        })
      },
      expandSiderbar () {
        this.$store.dispatch('ToggleSidebar')
      },
      computChildRoute () {
        if(this.menusType && this.menusType == '1' && this.menusRoot.length > 0) { //多个子系统
          this.childRoute = this.menusRoot[this.activeIndex].children
        } else { // 单个系统
          this.childRoute = this.menusNoRoot
        }
      }
    },
    created () {
      this.computChildRoute()
      // 兼容IE中路由无法跳转问题
      let that = this
      if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) { 
        // detect it's IE11
        window.addEventListener("hashchange", function(event) {
          var currentPath = window.location.hash.slice(1);
          if (that.$route.path !== currentPath) {
            that.$router.push(currentPath)
          }
        }, false)
      }
    }
  }
</script>