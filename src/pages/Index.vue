<template>
  <q-page>
    <q-tabs
      v-model="tab"
      class="bg-positive text-white shadow-5"
      dense
      @input="getItensTab()"
    >
      <q-tab name="seg" label="Seg" />
      <q-tab name="ter" label="Ter" />
      <q-tab name="qua" label="Qua" />
      <q-tab name="qui" label="Qui" />
      <q-tab name="sex" label="Sex" />
      <q-tab name="sab" label="Sáb" />
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="slide-right"
      transition-next="slide-left"
      class="q-mt-sm"
    >
      <q-tab-panel
      v-for="(aulas, index) in aulasWeek"
      :key="aulas.id"
      :name="daysWeek[index]"
      class="q-pa-sm">
        <div class="row q-col-gutter-sm" v-if="aulas.length > 0">
          <div
            class="col-xs-12 col-sm-6 col-lg-3"
            v-for="(aula, id) in aulas"
            :key="id"
          >
            <q-card class="my-card">
              <q-card-section
                class="text-white q-py-sm"
                :class="getBackgroundColor()"
              >
                <div class="text-subtitle2">{{ aula.nome }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section>
                <div class="row items-center"
                  v-for="(hora, ids) in aula.horarios"
                  :key="ids"
                  >
                  <div
                    class="col-8 text-grey-9 text-caption text-weight-medium no-wrap items-center"
                  >
                    <q-icon
                      size="15px"
                      name="query_builder"
                      class="q-mr-sm text-weight-medium"
                    />
                    {{ hora.horaInicial }} - {{ hora.horaFinal }}
                  </div>
                  <div
                    class="col-4 text-grey-9 text-caption text-weight-medium no-wrap items-center"
                  >
                    <q-icon
                      size="15px"
                      name="location_on"
                      class="q-mr-sm text-weight-medium"
                    />
                    {{ hora.local }}
                  </div>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-section class="row text-center q-py-sm">
                <div class="text-caption text-weight-medium col-12">
                  {{ aula.professor.nome }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <q-list bordered v-else>
          <q-item>
            <q-item-section class="text-weight-medium text-grey-9 text-center">Nenhuma aula</q-item-section>
          </q-item>
        </q-list>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
// import { QSpinner } from 'quasar'

export default {
  data () {
    return {
      tab: 'seg',
      nameTab: '',
      colors: [
        'bg-positive',
        'bg-accent',
        'bg-dark',
        'bg-negative',
        'bg-info',
        'bg-warning'
      ],
      daysWeek: {
        0: 'dom',
        1: 'seg',
        2: 'ter',
        3: 'qua',
        4: 'qui',
        5: 'sex',
        6: 'sab'
      }
    }
  },
  methods: {
    setTabDay () {
      const today = moment().day()
      this.tab = this.daysWeek[today]
      this.nameTab = this.tab
    },
    getItensTab () {
      this.nameTab = this.tab
    },
    getBackgroundColor () {
      return _.sample(this.colors)
    },
    ...mapActions('auth', ['setAulasUserWeek'])
  },
  computed: {
    ...mapGetters('auth', { aulasWeek: 'getAulasUserWeek' })
  },
  async mounted () {
    await this.setTabDay()
  }
}
</script>

<style lang="sass" scoped>
.my-content
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)

.q-tab
  padding: 0 10px!important
</style>
