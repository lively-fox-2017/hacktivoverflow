<template>
  <div class="col-md-3">
    <sidebar-content :content="content"></sidebar-content>
  </div>
</template>

<script>
import SidebarContent from '@/components/SidebarContent'
export default {
  props: ['content'],
  components: {
    SidebarContent
  }
}
</script>