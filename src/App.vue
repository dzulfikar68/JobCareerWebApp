<template>
	<v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Jobs Career App</v-toolbar-title>
      <!-- pemisah konten -->
      <v-spacer></v-spacer>
      <v-btn icon to="/create">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
		<v-navigation-drawer app v-model="drawer">
			<v-list>
        <v-list-item v-for="(item, index) in menus" :key="`menu-`+index" :to="item.route">
          <v-list-item-icon>
            <v-icon left>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
		</v-navigation-drawer>
		<v-main>
			<v-container fluid>
				<!-- jika menggunakan vue-router -->
				<router-view></router-view>
			</v-container>
		</v-main>
		<v-card>
      <v-footer absolute app>
        <v-card-text class="text-center">
          &copy; {{ new Date().getFullYear() }} — <strong>Jobs Career App</strong>
        </v-card-text>
      </v-footer>
    </v-card>
	</v-app>
</template>
<script>
	export default {
    name: 'App',
    data: () => ({
      drawer: false,
      menus: [
        { title: 'Home', icon: 'mdi-home', route: '/' },
        { title: 'Jobs', icon: 'mdi-apps', route: '/category' },
        { title: 'History', icon: 'mdi-history', route: '/history' },
        { title: 'About', icon: 'mdi-account', route: '/about' },
      ]
    })
	}
</script>