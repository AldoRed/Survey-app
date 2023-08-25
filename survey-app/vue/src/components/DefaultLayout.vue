<template>
    <div class="leading-normal tracking-normal" id="main-body">
      <div class="flex flex-wrap">
  
        <Sidebar />
  
        <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" :class="sideBarOpen ? 'overlay' : ''" id="main-content">
  
          <Navbar />
  
          <div class="p-6 bg-gray-100 mb-20">
            <router-view></router-view>
          </div>
  
          <Footer />
  
        </div>
      </div>
    </div>
</template>
  
<script>
import { mapState, useStore } from 'vuex'
import { computed } from 'vue'

import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
import Sidebar from '../components/Sidebar.vue'

export default {
    name: 'Dashboard',
    computed: {
        ...mapState(['sideBarOpen'])
    },
    setup() {
      const store = useStore()

      return {
        user: computed(() => store.state.user.data),
      }

    },
    components: {
      Sidebar,
      Navbar,
      Footer
    }
}
</script>