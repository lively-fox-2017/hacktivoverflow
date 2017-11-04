<template lang="html">
<div>
  <md-divider />
  <md-tabs md-fixed class="md-accent">
    <md-tab md-label="My Profile" md-icon="account_circle">
      <MyProfile/>
    </md-tab>
    <md-tab md-label="My Question" md-icon="live_help">
      <MyQuestion/>
    </md-tab>
    <md-tab md-label="My Answer" md-icon="forum">
      <MyAnswer/>
    </md-tab>
  </md-tabs>
</div>
</template>

<script>
import MyProfile from '@/components/MyProfile'
import MyAnswer from '@/components/MyAnswer'
import MyQuestion from '@/components/MyQuestion'

export default {
  components: {
    MyProfile,
    MyQuestion,
    MyAnswer
  }
}
</script>

<style lang="css">
</style>
