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
                <curated-news :news-resources="newsResources" v-if="!busy"></curated-news>
                <i class="fas fa-redo fa-spin" style="font-size:150px;opacity:.25;" v-else></i>
              </b-tab-item>
              <b-tab-item label="Debug">
                <b-table :data="newsResources">

                  <template scope="props">
                      <b-table-column label="news" width="60" numeric>
                          {{ props.row }}
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
                <br>
                <br>
                <pre>{{newsResources}}</pre>
              </b-tab-item>
              <b-tab-item>
                <template slot="header">
                  <i class="fas fa-plus" style="opacity:.15"></i>
                </template>
                <b-field v-if="!authenticated">
                  <b-input placeholder="Username"
                    icon-pack="far"
                    icon="user"
                    v-model="username">
                  </b-input>
                </b-field>
                <b-field v-if="!authenticated">
                  <b-input placeholder="Password"
                    type="password"
                    icon-pack="fas"
                    icon="key"
                    v-model="password">
                  </b-input>
                </b-field>
                <b-field v-if="!authenticated">
                  <b-input placeholder="Unauthorized"
                    icon-pack="fas"
                    icon="lock"
                    disabled>
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Authenticated"
                    class="authenticated"
                    icon-pack="fas"
                    icon="lock-open"
                    v-model="authorization"
                    disabled>
                  </b-input>
                  <!-- <a class="button is-success" style="width:100%;background-color:#5cff95;">
                    <i class="fas fa-lock-open"></i>
                    <span style="padding-left:15px;">Authenticated</span>
                  </a> -->
                </b-field>
                <a class="button is-primary"
                  v-if="!authenticated && !busy"
                  v-on:click="onAuthenticate">
                  Authenticate
                </a>
                <a class="button is-warning" v-if="busy && !authenticated">
                  <i class="fas fa-redo fa-spin" style="color:white;"></i>
                </a>
                <b-field v-if="authenticated">
                  <b-input placeholder="Title"
                    :key="10"
                    v-model="title">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Description"
                    v-model="description">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Author"
                    v-model="author">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Url"
                    v-model="url">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Image"
                    v-model="image">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="published"
                    v-model="published">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Found"
                    v-model="found"
                    disabled>
                  </b-input>
                </b-field>
                <a class="button is-primary"
                  v-if="authenticated && !busy"
                  v-on:click="onRecordNewsStory">
                  Record News Story
                </a>
                <br><br>
                <a class="button is-warning" v-if="busy && authenticated">
                  <i class="fas fa-redo fa-spin" style="color:white;"></i>
                </a>
                <b-field v-if="authenticated">
                  <b-input placeholder="Import"
                    v-model="newsStorysInput">
                  </b-input>
                </b-field>
                <a class="button is-primary"
                  v-if="authenticated && !busy"
                  v-on:click="onRecordNewsStorys">
                  Record ({{ newsStorys.length }}) News Storys
                </a>
                <a class="button is-warning" v-if="busy && authenticated">
                  <i class="fas fa-redo fa-spin" style="color:white;"></i>
                </a>
                <br><br>
                <curated-news :news-resources="newsStorys" v-if="newsStorys.length"></curated-news>
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
  import CuratedNews from '@/components/CuratedNews'
  export default {
    name: 'some-resources',
    components: {
      CuratedNews
    },
    data () {
      return {
        newsStorysInput: `[]`,
        newsStorys: [],
        title: null,
        description: null,
        author: null,
        url: null,
        image: null,
        published: null,
        found: new Date().getTime(),
        username: null,
        password: null,
        authenticated: false,
        activeTab: 0,
        busy: false
      }
    },
    watch: {
      newsStorysInput (input) {
        this.newsStorys = JSON.parse(input)
      }
    },
    computed: {
      ...mapGetters([
        'authorization',
        'authorizationResources',
        'newsResources'
      ])
    },
    methods: {
      ...mapActions([
        'recordNewsStory',
        'authenticate',
        'fetchResource'
      ]),
      async onRecordNewsStorys () {
        this.busy = true
        const l = this.newsStorys.length
        for (let i = 0; i < l; i++) {
          try {
            await this.recordNewsStory({
              url: 'https://periscope-news.herokuapp.com/api/v2/news',
              body: {
                title: this.newsStorys[i].title,
                description: this.newsStorys[i].description,
                author: this.newsStorys[i].author,
                url: this.newsStorys[i].url,
                image: this.newsStorys[i].image,
                published: this.newsStorys[i].published,
                found: this.newsStorys[i].found
              },
              prop: 'recordNewsStorysResources',
              additive: true
            })
            this.authenticated = true
          } catch (e) {
            this.authenticated = false
          }
        }
        this.busy = false
      },
      async onRecordNewsStory () {
        this.busy = true
        try {
          await this.recordNewsStory({
            url: 'https://periscope-news.herokuapp.com/api/v2/news',
            body: {
              title: this.title,
              description: this.description,
              author: this.author,
              url: this.url,
              image: this.image,
              published: this.published,
              found: this.found
            },
            prop: 'recordNewsStoryResources'
          })
          this.authenticated = true
        } catch (e) {
          this.authenticated = false
        }
        this.busy = false
      },
      async onAuthenticate () {
        this.busy = true
        try {
          await this.authenticate({
            url: 'https://periscope-news.herokuapp.com/api/v2/authenticate',
            body: {
              username: this.username,
              password: this.password
            },
            prop: 'authorizationResources'
          })
          this.authenticated = true
        } catch (e) {
          this.authenticated = false
          console.log(e)
        }
        this.busy = false
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

<style>
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
