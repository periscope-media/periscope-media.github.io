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
              <b-tab-item label="Junk Yard">
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
                    :value="authorization"
                    disabled>
                  </b-input>
                  <!-- <a class="button is-success" style="width:100%;background-color:#5cff95;">
                    <i class="fas fa-lock-open"></i>
                    <span style="padding-left:15px;">Authenticated</span>
                  </a> -->
                </b-field>
                <a class="button" :class="{
                    'is-primary': !busy && authenticated
                  }"
                  :disabled="busy || !authenticated"
                  v-on:click="onGetDumpResources">
                  Pick up Dump
                </a>
                <a class="button" :class="{
                    'is-primary': !busy && authenticated
                  }"
                  :disabled="busy || !authenticated"
                  v-on:click="onGetUsersResources">
                  Users*
                </a>
                <a class="button is-warning" v-if="busy && authenticated">
                  <i class="fas fa-redo fa-spin" style="color:white;"></i>
                </a>
                <br><br>
                <curated-news :news-resources="dumpResources" v-if="!busy"></curated-news>
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
                    :value="authorization"
                    disabled>
                  </b-input>
                  <!-- <a class="button is-success" style="width:100%;background-color:#5cff95;">
                    <i class="fas fa-lock-open"></i>
                    <span style="padding-left:15px;">Authenticated</span>
                  </a> -->
                </b-field>
                <b-field>
                  <b-input placeholder="Username"
                    icon-pack="far"
                    icon="user"
                    v-model="username"
                    :disabled="authenticated">
                  </b-input>
                </b-field>
                <b-field>
                  <b-input placeholder="Password"
                    type="password"
                    icon-pack="fas"
                    icon="key"
                    v-model="password"
                    :disabled="authenticated">
                  </b-input>
                </b-field>
                <a class="button"
                  :class="{
                    'is-primary': !authenticated,
                    'is-light': authenticated
                  }"
                  :disabled="authenticated || busy"
                  v-on:click="onAuthenticate">
                  <span v-if="!authenticated">Authenticate</span>
                  <span v-else>Authenticated</span>
                </a>
                <a class="button" style="background-color:#5bff94;" v-if="authenticated">
                  <i class="fas fa-thumbs-up" style="color:white;"></i>
                </a>
                <a class="button is-warning" v-if="busy && !authenticated">
                  <i class="fas fa-redo fa-spin" style="color:white;"></i>
                </a>
                <br><br>
                <h2 class="title" v-if="authenticated">New News</h2>
                <b-field v-if="authenticated">
                  <b-input placeholder="Title"
                    :key="10"
                    v-model="ntitle">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Description"
                    v-model="ndescription">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Author"
                    v-model="nauthor">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Url"
                    v-model="nurl">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Image"
                    v-model="nimage">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="published"
                    type="number"
                    v-model="npublished">
                  </b-input>
                </b-field>
                <b-field v-if="authenticated">
                  <b-input placeholder="Found"
                    v-model="nfound"
                    disabled>
                  </b-input>
                </b-field>
                <a class="button is-primary"
                  v-if="authenticated && !busy"
                  v-on:click="onRecordNewsStory">
                  Record News Story
                </a>
                <br><br>
                <h2 class="title" v-if="authenticated">Preview</h2>
                <curated-news v-if="authenticated" :news-resources="getNewNewsPreview()"></curated-news>
                <br><br>
                <h2 class="title" v-if="authenticated">Debug</h2>
                <pre v-if="authenticated">{{getNewNewsPreview()}}</pre>
                <br><br>
                <!-- -->
                <h2 class="title" v-if="authenticated">Batch News</h2>
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
        ntitle: null,
        ndescription: null,
        nauthor: null,
        nurl: null,
        nimage: null,
        npublished: new Date().getTime(),
        nfound: new Date().getTime(),
        nusername: null,
        npassword: null,
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
        'usersResource',
        'dumpResources',
        'authorization',
        'authorizationResources',
        'newsResources'
      ])
    },
    methods: {
      ...mapActions([
        'usersResource',
        'recordNewsStory',
        'authenticate',
        'fetchResource'
      ]),
      getNewNewsPreview () {
        return [{
          ntitle: this.ntitle || 'There just in, there is some new news.',
          ndescription: this.ndescription || 'Stay turned, don\'t change that channel. I\'m telling you, you do not want to miss this.',
          nauthor: this.nauthor || 'Periscope QA',
          nurl: this.nurl || 'https://news.eg',
          nimage: this.nimage || 'https://picsum.photos/100/100/?random',
          npublished: this.npublished,
          nfound: this.nfound
        }]
      },
      async onGetUsersResources () {
        this.busy = true
        try {
          await this.fetchResource({
            url: 'https://periscope-news.herokuapp.com/api/v2/users',
            prop: 'usersResources'
          })
        } catch (e) {
          console.log(e)
        }
        this.busy = false
      },
      async onGetDumpResources () {
        this.busy = true
        try {
          await this.fetchResource({
            url: 'https://periscope-news.herokuapp.com/api/v2/news/dump',
            prop: 'dumpResources'
          })
        } catch (e) {
          console.log(e)
        }
        this.busy = false
      },
      async onRecordNewsStorys () {
        this.busy = true
        const l = this.newsStorys.length
        for (let i = 0; i < l; i++) {
          try {
            await this.recordNewsStory({
              url: 'https://periscope-news.herokuapp.com/api/v2/news',
              body: {
                ntitle: this.newsStorys[i].ntitle,
                ndescription: this.newsStorys[i].ndescription,
                nauthor: this.newsStorys[i].nauthor,
                nurl: this.newsStorys[i].nurl,
                nimage: this.newsStorys[i].nimage,
                npublished: this.newsStorys[i].npublished,
                nfound: this.newsStorys[i].nfound
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
              ntitle: this.ntitle,
              ndescription: this.ndescription,
              nauthor: this.nauthor,
              nurl: this.nurl,
              nimage: this.nimage,
              npublished: this.npublished,
              nfound: this.nfound
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
  .message-header + .message-body {
    border-width: 1px;
  }
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
