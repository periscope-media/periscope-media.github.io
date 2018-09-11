<template>
  <div class="some-resources">
    <section class="section">
      <div class="container">
        <article class="message is-primary">
          <div class="message-header">
            <p>Periscope</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            <b-tabs v-model="activeTab">
              <b-tab-item label="Curated News">
                <div class="card">
                  <!-- <div class="card-image">
                    <figure class="image">
                      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                    </figure>
                  </div> -->
                  <div class="card-content" v-for="newsResource in newsResources">
                    <div class="media">
                      <div class="media-left">
                        <figure class="image is-200x200">
                          <img :src="newsResource.image" alt="Placeholder image">
                        </figure>
                      </div>
                      <div class="media-content">
                        <p class="title is-1">{{ newsResource.title }}</p>
                        <p class="subtitle is-2">{{ newsResource.description }}</p>
                      </div>
                    </div>

                    <div class="content">
                      <span>by</span> <a>@{{ newsResource.author }}</a>
                      <span>via</span> <a href="#">#css</a> <a :href="newsResource.url">{{ newsResource.url }}</a>
                      <br>
                      <span>published at</span> <time :datetime="getDate(newsResource.published)">{{ getPrettyDate(newsResource.published) }}</time>
                      <span>found at</span> <time :datetime="getDate(newsResource.found)">{{ getPrettyDate(newsResource.found) }}</time>
                    </div>
                  </div>
                </div>
              </b-tab-item>
              <b-tab-item label="Debug">
                <b-table :data="newsResources">

                  <template scope="props">
                      <b-table-column label="news" width="60" numeric>
                          {{ props.row }}
                      </b-table-column>

                      <!-- <b-table-column label="Name">
                          {{ props.row.rname }}
                      </b-table-column> -->
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
        </article>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import moment from 'moment'
  export default {
    name: 'some-resources',
    data () {
      return {
        activeTab: 0
      }
    },
    computed: {
      ...mapGetters([
        'newsResources'
      ])
    },
    methods: {
      ...mapActions([
        'fetchResource'
      ]),
      getDate (date) {
        return moment(date).format('YYYY-MM-DD')
      },
      getPrettyDate (date) {
        return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')
      },
      async fetch () {
        this.busy = true
        await this.fetchResource({
          url: 'https://periscope-news.herokuapp.com/api/v2/news',
          prop: 'newsResources'
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

  div.content > span {
    font-weight: bold;
  }
</style>
