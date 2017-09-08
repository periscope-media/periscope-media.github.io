<template>
  <div class="some-resources">
    <section class="section">
      <div class="container">
        <b-tabs v-model="activeTab">
          <b-tab-item label="SomeResources">
            <b-table :data="someResources">

              <template scope="props">
                  <b-table-column label="RID" width="60" numeric>
                      {{ props.row.rid }}
                  </b-table-column>

                  <b-table-column label="Name">
                      {{ props.row.rname }}
                  </b-table-column>
              </template>

              <template slot="empty">
                  <section class="section">
                      <div class="content has-text-grey has-text-centered">
                          <p>
                              <b-icon
                                  icon="sentiment_very_dissatisfied"
                                  size="is-large">
                              </b-icon>
                          </p>
                          <p>Nothing here.</p>
                      </div>
                  </section>
              </template>

            </b-table>
          </b-tab-item>
        </b-tabs>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'some-resources',
    data () {
      return {
        activeTab: 0
      }
    },
    computed: {
      ...mapGetters([
        'someResources'
      ])
    },
    methods: {
      ...mapActions([
        'fetchResource'
      ]),
      async fetch () {
        this.busy = true
        await this.fetchResource({
          url: '/api/v1/some-resources',
          prop: 'someResources'
        })
        this.busy = false
      }
    },
    async created () {
      this.fetch()
    },
    mounted () {
      console.log('* Mounted SomeResources Component!')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
