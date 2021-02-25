<template>
	<div>
		<v-container grid-list-sm class="layout">
			<v-subheader>
				Jobs by History
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
                                <th class="text-left">
                                    Viewed At
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
                                <td>{{ (job.company) ? job.company : "-" }}</td>
                                <td>{{ job.postedAt }}</td>
                                <td>{{ job.viewedAt }}</td>
                                <td>
                                    <v-btn icon :to="'/category/job/'+ job.companySlug + '/' + job.jobSlug">
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
  name: 'JobsByCategory',
  data: () => ({
    loading: false,
    jobs: [],
  }),
    async created() {
      const jobsHistory = this.$store.state.jobsHistory
      this.loading = true
      try {
        this.jobs = jobsHistory
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