<template>
  <div class="selfMenu">
    <template v-for="(item, index) in routes">
      <router-link v-if="!item.hidden && !item.children"  :to="item.url">
        <h-menu-item :name = "item.id">
          <h-icon :name="item.icon"></h-icon>  
          <span>{{ item.title }}</span>
        </h-menu-item>
      </router-link> 
      <router-link v-else-if="!item.hidden && item.children && item.children.length == 0"  :to="item.url">
        <h-menu-item :name = "item.id">
          <h-icon :name="item.icon"></h-icon>  
          <span>{{ item.title }}</span>
        </h-menu-item>
      </router-link> 
      <h-submenu :name="item.id" v-else-if="!item.hidden && item.children.length > 0">
        <template slot="title">
          <h-icon :name="item.icon || 'manage'"></h-icon>
          <span>{{ item.title }}</span>
        </template>
        <template v-for="(child, i) in item.children" v-if="!child.hidden" >
          <sidebar-item v-if="child.children && child.children.length > 0" class="menu-indent nest-menu"  :routes="[child]"></sidebar-item>
          <router-link v-else class="menu-indent" :to="child.url">
            <h-menu-item :name = "child.id">
              <h-icon name="ios-circle-outline"></h-icon>
              <span>{{child.title}}</span>
            </h-menu-item>
          </router-link>
        </template>
      </h-submenu>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'SidebarItem',
    props: {
      routes: {
        type: Array
      }
    }
  }
</script>