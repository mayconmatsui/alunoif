<template>
  <q-layout view="lHh Lpr lFf">
    <q-header :elevated="elevated" >
      <q-toolbar class="bg-positive">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Aluno IF
        </q-toolbar-title>

        <div>v 0.0.1 alpha</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-grey-1"
    >
      <avatar v-if="user" :user="user"/>
      <q-list padding class="text-grey-10">
      <q-item
        to="/"
        clickable
        v-ripple
        :active="link === 'home'"
        @click="link = 'home'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="local_library" />
        </q-item-section>

        <q-item-section>Aulas</q-item-section>
      </q-item>

      <q-item
        to="/disciplinas"
        clickable
        v-ripple
        :active="link === 'inbox'"
        @click="link = 'inbox'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="class" null/>
        </q-item-section>

        <q-item-section>Disciplinas</q-item-section>
      </q-item>

      <q-item
        to="/aulas"
        clickable
        v-ripple
        :active="link === 'outbox'"
        @click="link = 'outbox'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="swap_horizontal_circle" />
        </q-item-section>

        <q-item-section>Aulas Trocadas</q-item-section>
      </q-item>

      <q-item
        to="/professores"
        clickable
        v-ripple
        :active="link === 'trash'"
        @click="link = 'trash'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="assignment_ind" />
        </q-item-section>

        <q-item-section>Professores</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        :active="link === 'settings'"
        @click="link = 'settings'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="date_range" />
        </q-item-section>

        <q-item-section>Lembretes</q-item-section>
      </q-item>
      <q-item
        to="/config"
        clickable
        v-ripple
        :active="link === 'config'"
        @click="link = 'config'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>

        <q-item-section>Configurações</q-item-section>
      </q-item>

      <q-item clickable @click="logout">
        <q-item-section avatar>
          <q-icon name="exit_to_app" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Sair</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import avatar from '../components/Avatar'

export default {
  name: 'MainLayout',
  components: { avatar },
  data () {
    return {
      leftDrawerOpen: false,
      link: 'home'
    }
  },
  methods: {
    ...mapActions('auth', ['logout'])
  },
  computed: {
    elevated: vm => vm.$route.path !== '/',
    ...mapGetters('auth', {
      isLoggedIn: 'getLoginState',
      user: 'getUser'
    })
  },
  mounted () {
    this.$auth.onAuthStateChanged(user => {
      if (!user) {
        this.$router.push({ path: '/auth' })
      }
    })
  }
}
</script>

<style>
.q-item.q-item-type.row.no-wrap.q-router-link--exact-active.my-menu-link.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable.q-item--active {
  color: white!important;
  font-weight: bold!important;
  background: #21BA45!important
}

.q-img__content > div {
  background: none;
}

</style>
