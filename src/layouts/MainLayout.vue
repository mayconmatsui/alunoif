<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
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
      <div class="bg-positive" style="height: 130px">
        <q-avatar class="absolute" size="60px" style="top: 15px; left: 15px">
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
        <div class="absolute text-weight-bold text-white" style="top: 85px; left: 15px">Razvan Stoenescu</div>
        <div class="absolute text-white" style="top: 100px; left: 15px">@rstoenescu</div>
      </div>
      <q-list padding class="text-grey-10">
      <q-item
        to="/disciplinas"
        clickable
        v-ripple
        :active="link === 'inbox'"
        @click="link = 'inbox'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="class" />
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
    </q-list>
    </q-drawer>

    <q-page-container>
      <transition name="fade">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      link: ''
    }
  }
}
</script>

<style>
.my-menu-link {
  color: white!important;
  font-weight: bold;
  background: #21BA45
}

.q-img__content > div {
  background: none;
}

</style>
