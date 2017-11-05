<template lang="html">
  <b-container v-if="checked">
    <router-link :to="{ name: 'index'}">Hackitv Overflow</router-link>
    <b-row>
      <b-card no-body cols="4" class="mx-auto">
          <b-tabs ref="tabs" card>
              <b-tab title="Sign-in" active>
                  <login/>
              </b-tab>
              <b-tab title="Sign-up">
                  <register/>
              </b-tab>
          </b-tabs>
      </b-card>

    </b-row>
  </b-container>
</template>

<script>
import register from '@/components/register';
import login from '../components/login';

export default {
  data() {
    return {
      checked: false,
    };
  },
  components: {
    login,
    register,
  },
  mounted() {
    const user = this.$store.state.user;
    if (user) {
      this.$router.push({ name: 'index' });
    } else {
      this.checked = true;
    }
  },
};
</script>

<style lang="css">
</style>
