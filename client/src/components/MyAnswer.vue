<template lang="html">
  <md-card md-with-hover>
    <md-card-header>
      <div class="md-title">My Answer</div>
      <div class="md-subhead">{{user.username}}</div>
    </md-card-header>

    <md-card-content>
      <md-card md-with-hover>
        <md-card-header>
          <div class="md-title">Title goes here</div>
          <div class="md-subhead">Subtitle here</div>
        </md-card-header>

        <md-card-content>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint. Excepturi.
        </md-card-content>

        <md-card-actions>
          <md-button>Show Detail</md-button>
          <md-button>Edit</md-button>
          <md-button>Delete</md-button>
        </md-card-actions>
      </md-card>
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style lang="css">
</style>
