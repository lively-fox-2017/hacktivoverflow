<template lang="html">
<div>
  <md-menu md-size="4" md-direction="top right" ref="menu">
    <md-button class="md-icon-button" md-menu-trigger>
      <md-icon>contacts</md-icon>
    </md-button>

    <md-menu-content>
      <div class="author-card">
        <md-avatar class="md-large">
          <img src="assets/marcosmoura.jpg" alt="Marcos Moura">
        </md-avatar>

        <div class="author-card-info">
          <span>Marcos Moura</span>
          <div class="author-card-links">
            <a href="https://linkedin.com/in/marcosvmmoura" target="_blank" rel="noopener">Linkedin</a>
            <a href="https://github.com/marcosmoura" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </div>
    </md-menu-content>
  </md-menu>

  <md-menu md-size="4">
    <md-button class="md-icon-button" md-menu-trigger>
      <md-icon>phone</md-icon>
    </md-button>

    <md-menu-content>
      <md-menu-item>
        <md-icon>phone</md-icon>
        <span>My Item 1</span>
      </md-menu-item>

      <md-menu-item>
        <md-icon>phone</md-icon>
        <span>My Item 2</span>
      </md-menu-item>

      <md-menu-item>
        <md-icon>phone</md-icon>
        <span>My Item 3</span>
      </md-menu-item>
    </md-menu-content>
  </md-menu>

  <md-menu md-direction="bottom left" md-size="4">
    <md-button class="md-icon-button" md-menu-trigger>
      <md-icon>near_me</md-icon>
    </md-button>

    <md-menu-content>
      <md-menu-item>
        <span>Find on map</span>
        <md-icon>near_me</md-icon>
      </md-menu-item>

      <md-menu-item>
        <span>Call</span>
        <md-icon>phone</md-icon>
      </md-menu-item>
    </md-menu-content>
  </md-menu>

  <md-button class="md-raised md-primary" @click="$refs.menu.open">Open contact card</md-button>
</div>
</template>

<script>
export default {}
</script>

<style lang="css">
.author-card {
  padding: 8px 16px;
  display: flex;
  align-items: center;

  .md-avatar {
    margin-right: 16px;
  }

  .author-card-info {
    display: flex;
    flex-flow: column;
    flex: 1;
  }

  span {
    font-size: 16px;
  }

  .author-card-links {
    display: flex;

    a + a {
      margin-left: 8px;
    }
  }
}
</style>
