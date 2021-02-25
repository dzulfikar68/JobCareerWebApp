<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- template categries -->
    <v-container grid-list-sm>
      <div class="text-right">
        <v-btn small text to="/category" class="blue--text">
          All Jobs <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap>
        <v-flex v-for="(category) in categories" :key="`category-`+category.id" xs4>
          <v-card :to="'/category/'+ category.slug">
            <v-img :src="category.image" class="white--text">
              <v-card-title class="fill-height align-end" v-text="category.name"></v-card-title>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- template books -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  data: () => ({
    categories: [
      {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'Jobs by Company',
        slug: 'company'
      },
      {
        id: 2,
        image: 'https://via.placeholder.com/150',
        name: 'Jobs by City',
        slug: 'city'
      },
      {
        id: 3,
        image: 'https://via.placeholder.com/150',
        name: 'Jobs by Commitment',
        slug: 'commitment'
      }
    ]
  })
}
</script>
