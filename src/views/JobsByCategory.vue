<template>
	<div>
		<v-container grid-list-sm>
			<v-subheader>
				Jobs by {{ this.type.replace(/\b\w/g, l => l.toUpperCase()) }}
			</v-subheader>
            <v-progress-linear v-if="loading" indeterminate color="cyan"></v-progress-linear>
			<v-layout v-if="!loading" wrap>
				<v-expansion-panels focusable>
                    <v-expansion-panel v-for="item in categories" :key="item.id">
                        <v-expansion-panel-header>
                            {{ item.category }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <br/>
                            <v-simple-table dense>
                                <template v-slot:default>
                                    <thead>
                                        <tr>
                                            <th class="text-left">
                                                Name
                                            </th>
                                            <th class="text-left">
                                                Company
                                            </th>
                                            <th class="text-left">
                                                Posted At
                                            </th>
                                            <th class="text-left"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="job in item.jobs"
                                            :key="job.id"
                                        >
                                            <td>{{ job.title }}</td>
                                            <td>{{ (job.company) ? job.company.name : "-" }}</td>
                                            <td>{{ job.postedAt }}</td>
                                            <td>
                                                <v-btn icon :to="'/category/job/'+ ((job.company) ? job.company.slug : 'unknown') + '/' + job.slug">
                                                    <v-icon color="grey lighten-1">mdi-launch</v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
export default {
  name: 'JobsByCategory',
  data: () => ({
    type: null,
    loading: false,
    categories: [],
    queries: [
      {
          type: "company",
          query: `
              query{
                companies {
                  name
                  jobs {
                    id
                    title
                    slug
                    postedAt
                    company {
                      name
                      slug
                    }
                  }
                }
              }
            `
      },
      {
          type: "city",
          query: `
              query{
                cities {
                  name
                  country {
                    name
                  }
                  jobs {
                    id
                    title
                    slug
                    postedAt
                    company {
                       name
                       slug
                    }
                  }
                }
              }
            `
      },
      {
          type: "commitment",
          query: `
              query{
                commitments {
                  title
                  jobs {
                    id
                    title
                    slug
                    postedAt
                    company {
                      name
                      slug
                    }
                  }
                }
              }
            `
      }
    ]
  }),
    async created() {
      this.loading = true
      try {
        let { slug } = this.$route.params
        this.type = slug
        var result = await this.axios({
          method: "POST",
          url: "https://api.graphql.jobs/",
          data: {
            query: this.queries.find(x => x.type == this.type).query
          }
        });
        let datas = []
        if (this.type == "company") {
          datas = result.data.data.companies
        } else if (this.type == "city") {
          datas = result.data.data.cities
        } else if (this.type == "commitment") {
          datas = result.data.data.commitments
        }
        const lists = datas.map(({ name, title, country, jobs }) => {
            let category = "Undefined"
            if (country && name) {
                category = name + ", " + country.name
            } else if (title) {
                category = title
            } else if (name) {
                category = name
            }
            return {
                category: category,
                jobs: jobs.reverse()
            }
        })
        this.categories = lists.sort()
      } catch (error) {
        console.error(error);
      }
      this.loading = false
    },
}
</script>
