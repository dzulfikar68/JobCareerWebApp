<template>
<div>
    <v-container grid-list-sm>
        <v-progress-linear v-if="loading" indeterminate color="cyan"></v-progress-linear>
        <v-layout v-if="!loading" wrap>
            <v-card class="mx-auto" width="800" tile>
                <v-list-item three-line>
                    <v-list-item-content>
                        <v-form>
                            <v-text-field
                            v-model="title"
                            label="Title"
                            required
                            ></v-text-field>

                            <v-select
                            v-model="commitment"
                            :items="commitmentsTitle"
                            :rules="[v => !!v || 'Item is required']"
                            label="Commitment"
                            required
                            ></v-select>

                            <v-text-field
                            v-model="locationNames"
                            label="Location"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="companyName"
                            label="Company"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="userEmail"
                            label="E-mail"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="description"
                            label="Description"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="applyUrl"
                            label="Apply URL"
                            required
                            ></v-text-field>

                            <v-btn color="success" class="mr-4" @click="postJob()" >Submit</v-btn>
                        </v-form>
            
                    </v-list-item-content>
                </v-list-item>
            </v-card>
        </v-layout>
    </v-container>
</div>
</template>

<script>
export default {
  name: 'CreateJob',
  data: () => ({
    loading: false,
    commitmentsId: ["cjtu8esth000z0824x00wtp1i", "cjuvc2urp01cf0735lk9j0e87"],
    commitmentsTitle: ["Full-time", "Part-time"],
    title: "",
    commitment: "",
    companyName: "",
    locationNames: "",
    userEmail: "",
    description: "",
    applyUrl: ""
  }),
  methods: {
    getCommitment(input) {
      if(input == this.commitmentsTitle[1]) {
        return this.commitmentsId[1]
      }else if (input == this.commitmentsTitle[0]) {
        return this.commitmentsId[0]
      }else {
        return null
      }
    },
    postJob() {
      this.loading = true
      const input = {
          title: this.title, 
          commitmentId: this.getCommitment(this.commitment),
          companyName: this.companyName,
          locationNames: this.locationNames,
          userEmail: this.userEmail,
          description: this.description,
          applyUrl: this.applyUrl
      }
      const query = `
      mutation PostJob($input: PostJobInput!) {
          postJob(input: $input) {
              id
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
      .then(data => {
        if(data.data) {
          alert("Create Job - Berhasil")
          this.$router.push({ name: 'All' })
        } else {
          alert(data.errors[0].message)
        }
      });
      this.loading = false
    }
  }
}
</script>