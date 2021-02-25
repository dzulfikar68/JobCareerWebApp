<template>
	<div>
		<v-container grid-list-sm>
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="primary"
      ></v-progress-circular>
			<v-layout v-if="!loading" wrap>
				<v-card
          class="mx-auto"
          tile
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title><b>Detail Job</b></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>Title</v-list-item-title>
              <v-list-item-subtitle>{{ title }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Commitment</v-list-item-title>
              <v-list-item-subtitle>
                {{ commitment }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Company</v-list-item-title>
              <v-list-item-subtitle>
                {{ company }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Description</v-list-item-title>
              <v-list-item-subtitle>
                {{ description }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Apply Url</v-list-item-title>
              <v-list-item-subtitle>
                <a target="_blank" rel="noopener noreferrer" :href="applyUrl">
                  {{ applyUrl }}
                </a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Posted At</v-list-item-title>
              <v-list-item-subtitle>
                {{ postedAt }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>City</v-list-item-title>
              <v-list-item-subtitle>
                {{ city }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Country</v-list-item-title>
              <v-list-item-subtitle>
                {{ country }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Website Url</v-list-item-title>
              <v-list-item-subtitle>
                <a target="_blank" rel="noopener noreferrer" :href="websiteUrl">
                  {{ websiteUrl }}
                </a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title>Twitter</v-list-item-title>
              <v-list-item-subtitle>
                <a target="_blank" rel="noopener noreferrer" :href="twitterToUrl()">
                  {{ twitterToUrl()  }}
                </a>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
			</v-layout>
		</v-container>
	</div>
</template>

<script>
export default {
  name: 'JobsByCategory',
  data: () => ({
    companySlug: null,
    jobSlug: null,
    loading: false,
    id: null,
    title: null,
    description: null,
    applyUrl: null,
    postedAt: null,
    viewedAt: null,
    commitment: null,
    city: null,
    country: null,
    company: null,
    websiteUrl: null,
    twitter: null
  }),
  methods: {
      twitterToUrl() {
        if (this.twitter) {
          return (this.twitter.includes("http")) ? this.twitter : "https://twitter.com/" + this.twitter
        } else {
          return "-"
        }
      },
      dateToString(input) {
        var date = input.getDate()
        var month = input.getMonth() + 1
        var year = input.getFullYear()
        var hours = input.getHours()
        var minutes = input.getMinutes()
        var seconds = input.getSeconds()
        return  year + 
                "-" + 
                this.toTwoDigit(month) + 
                "-" + 
                this.toTwoDigit(date) + 
                " | " + 
                this.toTwoDigit(hours) + 
                ":" + 
                this.toTwoDigit(minutes) + 
                ":" + 
                this.toTwoDigit(seconds)
      },
      toTwoDigit(number) {
        return ("0" + number).slice(-2)
      }
  },
    async created() {
      this.loading = true
      let { companySlug, jobSlug } = this.$route.params
      this.companySlug = companySlug
      this.jobSlug = jobSlug
      const input = {
          jobSlug: this.jobSlug, 
          companySlug: this.companySlug
      }
      const query = `
      query Job($input: JobInput!) {
          job(input: $input) {
              id
              title
              slug
              description
              applyUrl
              postedAt
              commitment {
                  title
              }
              cities {
                  name
                  country {
                      name
                  }
              }
              company {
                  name
                  slug
                  websiteUrl
                  twitter
              }
          }
      }`
      fetch('https://api.graphql.jobs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { input },
        })
      })
      .then(result => result.json())
      .then(({ data, errors }) => {
        const { job } = data
        var city
        try {
          city = job.cities[0].name
        } catch (e) {
          city = "-"
        }
        var country
        try {
          country = job.cities[0].country.name
        } catch (e) {
          country = "-"
        }
        this.id = job.id
        this.title = job.title
        this.description = job.description
        this.applyUrl = job.applyUrl
        this.postedAt = job.postedAt
        this.viewedAt = new Date()
        this.commitment = job.commitment.title
        this.city = city
        this.country = country
        this.company = job.company.name
        this.websiteUrl = job.company.websiteUrl
        this.twitter = job.company.twitter
        this.$store.commit(
          'addHistory', 
          {
            id: this.id,
            companySlug: this.companySlug,
            jobSlug: this.jobSlug,
            title: this.title,
            company: this.company,
            postedAt: this.dateToString(new Date(this.postedAt)),
            viewedAt: this.dateToString(this.viewedAt)
          }
        )
        console.log(errors)
      })
      .catch(error => alert(error));
      this.loading = false
    },
}
</script>
