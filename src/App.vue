<template>
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
    <Tabbar route placeholder v-show="showFooter">
      <TabbarItem replace to="/" icon="home-o">Home</TabbarItem>
      <TabbarItem replace to="/about" icon="search">About</TabbarItem>
      <TabbarItem replace to="/todoList" icon="friends-o">ToDo</TabbarItem>
      <TabbarItem replace to="/luckdraw" icon="setting-o">LuckDraw</TabbarItem>
    </Tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Tabbar, TabbarItem } from "vant";
export default defineComponent({
  name: 'App',
  components: {
    Tabbar,
    TabbarItem
  },
  computed: {
    showFooter() {
      return this.$route.path.split("/").length < 3
    }
  }
})
</script>
