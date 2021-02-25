<template>
	<div>
		<v-container grid-list-sm class="layout">
			<v-subheader>
				Jobs by All
			</v-subheader>
            <v-progress-linear v-if="loading" indeterminate color="cyan"></v-progress-linear>
			<v-layout v-if="!loading" wrap>
				<v-simple-table fixed-header height="500px">
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
                                v-for="job in jobs"
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
			</v-layout>
		</v-container>
	</div>
</template>

<script>
export default {
  name: 'JobsByAll',
  data: () => ({
    loading: false,
    jobs: [],
  }),
    async created() {
      this.loading = true
      try {
        var result = await this.axios({
          method: "POST",
          url: "https://api.graphql.jobs/",
          data: {
            query: `
              query{
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
            `
          }
        });
        let datas = result.data.data.jobs
        this.jobs = datas
      } catch (error) {
        console.error(error);
      }
      this.loading = false
    },
}
</script>

<style>
.layout {
    display: inline-block;
    width: 100%;
}
</style>