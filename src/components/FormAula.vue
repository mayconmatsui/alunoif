<template>
  <q-page>
    <div class="text-subtitle2 q-ma-sm text-grey-9">Cadastro de Professor</div>
    <q-form class="q-mx-sm" @submit.prevent="salvarRegistro()">
      <q-input v-model="data" label="Data" color="black" :rules="[val => !!val || 'Data deve ser Informada']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date minimal color="black" mask="DD/MM/YYYY" v-model="data" @input="() => $refs.qDateProxy.hide()" :locale="myLocale"/>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-select
        class="q-mb-xs"
        v-model="disciplina"
        color="black"
        use-input
        clearable
        :options="listDisciplinas"
        label="Disciplina"
        @filter="filtrarDisciplina"
        :rules="[val => !!val || 'Disciplina deve ser Selecionado']"
      />
      <div class="text-subtitle2 q-my-lg text-grey-9">
        Horários da Aula
        <q-btn
          class="float-right q-mr-sm"
          outline
          round
          size="12px"
          color="black"
          icon="add"
          @click="addCampoHora()"
        />
      </div>
      <div class="row q-col-gutter-xs" v-for="(aula, index) in aulas" :key="index">
        <div class="col-2 q-mt-lg">Aula {{index + 1}} </div>
        <div class="col-5">
          <q-input
            color="black"
            v-model="aula.horaInicial"
            mask="time"
            :rules="['time']"
            label="Inicio"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time color="positive" v-model="aula.horaInicial" format24h>
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="OK" color="positive" flat v-close-popup />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-5">
          <q-input
            color="black"
            v-model="aula.horaFinal"
            mask="time"
            :rules="['time']"
            label="Fim"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time color="positive" v-model="aula.horaFinal" format24h>
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="OK" color="positive" flat v-close-popup />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row flex flex-center q-my-lg">
        <q-btn
          color="positive"
          type="submit"
          class="btn-fixed-width"
          label="Salvar"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      id: this.$route.params.id ? this.$route.params.id : '',
      disciplina: '',
      data: '',
      listDisciplinas: this.disciplinas,
      aulas: [
        {
          horaInicial: '',
          horaFinal: ''
        }
      ],
      myLocale: {
        /* starting with Sunday */
        days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
        daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        firstDayOfWeek: 0
      }
    }
  },
  methods: {
    salvarRegistro () {
      const dados = {
        [this.disciplina.value]: {
          data: this.data,
          horarios: this.getHorarios(this.aulas)
        }
      }
      this.addAula(dados)
      this.$q.notify({
        color: 'green-5',
        textColor: 'white',
        icon: 'done',
        message: 'Registro salvo com sucesso!'
      })
      this.$router.push('/aulas')
    },
    getHorarios (horarios) {
      return horarios.map((a) => {
        return `${a.horaInicial}|${a.horaFinal}`
      })
    },
    addCampoHora () {
      this.aulas.push({
        horaInicial: '',
        horaFinal: ''
      })
    },
    filtrarDisciplina (val, update) {
      update(() => {
        if (val === '') {
          this.listDisciplinas = this.disciplinas
        } else {
          const needle = val.toLowerCase()
          this.listDisciplinas = Object.values(this.disciplinas).filter(v => {
            return v.label.toLowerCase().indexOf(needle) > -1
          })
        }
      })
    },
    ...mapActions('aulas', ['addAula'])
  },
  computed: {
    ...mapGetters('disciplinas', { disciplinas: 'getDisciplinasSelect' })
  },
  async mounted () {
    // if (this.id) {
    //   this.nome = await this.getProfessorById(this.id)[0].nome
    // }
  }
}
</script>

<style>
.btn-fixed-width {
  width: 98vw;
}
</style>
