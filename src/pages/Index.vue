<template>
  <q-page>
    <q-tabs
      v-model="tab"
      class="bg-positive text-white shadow-5"
      dense
      @input="loadTab()"
    >
      <q-tab name="seg" label="Seg" />
      <q-tab name="ter" label="Ter" />
      <q-tab name="qua" label="Qua" />
      <q-tab name="qui" label="Qui" />
      <q-tab name="sex" label="Sex" />
      <q-tab name="sab" label="Sáb" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="q-mt-sm">
      <q-tab-panel :name="tabSelected" class="q-pa-sm">
        <div class="row q-col-gutter-sm">
          <div class="col-xs-12 col-sm-6 col-lg-3" v-for="n in 5" :key="`xs-${n}`">
            <q-card class="my-card">
              <q-card-section class='text-white q-py-sm' :class='getBackgroundColor()'>
                <div class="text-subtitle2">Linguagem de Programação 3</div>
              </q-card-section>

              <q-separator />

              <q-card-section>
                <div class="row items-center">
                  <div class="col-8 text-grey-9 text-caption text-weight-medium no-wrap items-center">
                    <q-icon size="15px" name="query_builder" class="q-mr-sm text-weight-medium"/>
                    18:50 - 19:35
                  </div>
                  <div class="col-4 text-grey-9 text-caption text-weight-medium no-wrap items-center">
                    <q-icon size="15px" name="location_on" class="q-mr-sm text-weight-medium"/>
                    LAB 1
                  </div>
                </div>
                <div class="row no-wrap items-center">
                  <div class="col-8 text-grey-9 text-caption text-weight-medium no-wrap items-center">
                    <q-icon size="15px" name="query_builder" class="q-mr-sm text-weight-medium"/>
                    18:50 - 19:35
                  </div>
                  <div class="col-4 text-grey-9 text-caption text-weight-medium no-wrap items-center">
                    <q-icon size="15px" name="location_on" class="q-mr-sm text-weight-medium"/>
                    LAB 1
                  </div>
                </div>
              </q-card-section>

              <q-separator />

              <q-card-section class="row text-center q-py-sm">
                <div class="text-caption text-weight-medium col-12">
                  Jean Carlo Wai Keung Ma
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'PageIndex',
  data () {
    return {
      tab: '',
      tabSelected: '',
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
    loadTab () {
      console.log(this.getAulasIndex)
    },
    setTabDay () {
      const today = moment().day()
      this.tab = this.daysWeek[today]
    },
    getBackgroundColor () {
      return _.sample(this.colors)
    },
    ...mapActions('aulas', ['setAulasWeek']),
    ...mapActions('professores', ['setProfessores']),
    ...mapActions('disciplinas', ['setDisciplinas'])
  },
  computed: {
    ...mapGetters('aulas', ['getAulasThisTab'])
  },
  async mounted () {
    await this.setTabDay()
    await this.setDisciplinas()
    await this.setProfessores()
    await this.setAulasWeek()
    await this.loadTab()
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
