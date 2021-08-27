<template>
  <header>
    <b-navbar
      sticky
      toggleable
      class="navbar navbar-toggleable-sm navbar-expand-md"
      style="background-color: #2bb573;"
    >
      <b-navbar-brand to="/">
        <div class="logo-image">
          <img src="../assets/logo.png" class="img-fluid" />
        </div>
      </b-navbar-brand>
      <b-navbar-toggle target="navbar-toggle-collapse">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon> </template
        >/
      </b-navbar-toggle>
      <b-collapse id="navbar-toggle-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-nav-item v-if="!loggedIn" to="/">
              Home
              <span class="sr-only">(current)</span>
            </b-nav-item>
            <!-- <b-nav-item v-if="!loggedIn" to="/about">About</b-nav-item> -->
            <b-nav-item v-if="loggedIn" to="/">Book</b-nav-item>
            <b-nav-item v-if="loggedIn" to="/list">Cultivar List</b-nav-item>
            <b-nav-item v-if="loggedIn" to="/orderHistory">My Order</b-nav-item>
            <b-nav-item-dropdown v-if="loggedIn" right>
              <template v-slot:button-content>
                <b>{{ usernameFunction }}</b>
              </template>
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown
              v-if="!loggedIn"
              class="dropdown w-25"
              text="User"
              right
            >
              <b-dropdown-item to="/login">Login</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import { authComputed } from '../store/helpers.js'
export default {
  computed: {
    ...authComputed,
    usernameFunction: function() {
      return localStorage.username
    }
  },
  methods: {
    logout() {
      // console.log('logout')
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
.navbar {
  padding: 0px auto;
  margin: 0px auto;
}

.logo-image {
  width: 80px;
  height: 40px;

  overflow: hidden;
}

.navbar-nav {
  font-size: 18px;
  font-family: 'Nunito', 'Futura', sans-serif;
  font-weight: 700;
  letter-spacing: 0.2px;
}

.navbar-nav > .active {
  color: red;
}

/* .ul {
  list-style-type: none;
} */

.nav-item {
  margin-right: 10px;
}
</style>
