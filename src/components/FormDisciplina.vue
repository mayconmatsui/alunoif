<template>
  <q-page>
    <div class="text-subtitle2 q-ma-sm text-grey-9">Cadastro de Disciplina</div>
    <q-form class="q-mx-sm" @submit.prevent="salvarRegistro()">
      <q-input
        v-model="nome"
        color="black"
        clearable
        label="Nome"
        :rules="[val => !!val || 'Nome da disciplina deve ser informado']"
      />
      <q-select
        class="q-mb-xs"
        v-model="professor"
        color="black"
        use-input
        clearable
        :options="listProfessores"
        label="Professor"
        @filter="filtrarProfessor"
        :rules="[val => !!val || 'Professor deve ser Selecionado']"
      />
      <div class="text-subtitle2 q-my-lg text-grey-9">
        Dias de aula
        <q-btn
          class="float-right q-mr-sm"
          outline
          round
          size="12px"
          color="black"
          icon="add"
          @click="addCampoAula()"
        />
      </div>
      <div class="row q-col-gutter-xs q-px-sm rounded-borders"
        v-for="(aula, index) in horarios"
        :key="index"
        :class="getBackground(index)"
      >
        <div class="col-5">
          <q-select
            class="q-mb-xs"
            style="margin-bottom: 0"
            v-model="aula.aula"
            color="black"
            :options="diasSemana"
            :label="`Aula ${index + 1}`"
            :rules="[val => !!val || 'Dia deve ser Selecionado']"
          />
        </div>
        <div class="col-7">
          <q-input
            v-model="aula.local"
            color="black"
            clearable
            label="Local"
            :rules="[val => !!val || 'Local deve ser informado']"
          />
        </div>
        <div class="col-6">
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
        <div class="col-6">
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
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      id: this.$route.params.id ? this.$route.params.id : '',
      professor: '',
      nome: '',
      horarios: [
        {
          aula: '',
          horaInicial: '',
          horaFinal: '',
          local: ''
        }
      ],
      listProfessores: this.professores,
      diasSemana: [
        {
          label: 'Domingo',
          value: 0
        },
        {
          label: 'Segunda',
          value: 1
        },
        {
          label: 'Terça',
          value: 2
        },
        {
          label: 'Quarta',
          value: 3
        },
        {
          label: 'Quinta',
          value: 4
        },
        {
          label: 'Sexta',
          value: 5
        },
        {
          label: 'Sábado',
          value: 6
        }
      ]
    }
  },
  methods: {
    getBackground (index) {
      return { 'bg-green-1': index % 2 === 1 }
    },
    filtrarProfessor (val, update) {
      update(() => {
        if (val === '') {
          this.listProfessores = this.professores
        } else {
          const needle = val.toLowerCase()
          this.listProfessores = Object.values(this.professores).filter(v => {
            return v.label.toLowerCase().indexOf(needle) > -1
          })
        }
      })
    },
    addCampoAula () {
      this.horarios.push({
        aula: '',
        horaInicial: '',
        horaFinal: '',
        local: ''
      })
    },
    async salvarRegistro () {
      const dados = {
        nome: this.nome,
        professor: this.$dbfs.doc(`professores/${this.professor.value}`),
        horarios: this.setHorarios(this.horarios)
      }

      if (this.id) {
        dados.id = this.id
        this.updateDisciplina(dados)
      } else {
        this.addDisciplina(dados)
      }
      this.$q.notify({
        color: 'green-5',
        textColor: 'white',
        icon: 'done',
        message: 'Registro salvo com sucesso!'
      })
      this.$router.push('/disciplinas')
    },
    setHorarios (h) {
      const horarios = {}
      function customizer (objValue, srcValue) {
        if (_.isArray(objValue)) {
          return objValue.concat(srcValue)
        }
      }
      h.forEach(a => {
        _.mergeWith(
          horarios,
          {
            [a.aula.value]: [{
              horaInicial: a.horaInicial,
              horaFinal: a.horaFinal,
              local: a.local
            }]
          },
          customizer
        )
      })
      return horarios
    },
    popuplaForm () {
      const disciplina = this.disciplina(this.id)[0]
      this.nome = disciplina.nome
      this.local = disciplina.local
      this.professor = this.getProfessorById(disciplina.professor.id)[0]
      this.horarios = this.getHorarios(disciplina.horarios)
    },
    getProfessorById (id) {
      return this.professores.filter((p) => {
        return p.value === id
      })
    },
    getHorarios (h) {
      const horarios = []
      Object.entries(h).map((a) => {
        const aula = this.diasSemana.filter((b) => {
          return b.value === Number(a[0])
        })[0]

        a[1].map((c) => {
          const t = {
            aula: aula,
            horaInicial: c.horaInicial,
            horaFinal: c.horaFinal,
            local: c.local
          }
          horarios.push(t)
        })
      })
      return horarios
    },
    ...mapActions('professores', ['setProfessores']),
    ...mapActions('disciplinas', ['setDisciplinas', 'addDisciplina', 'updateDisciplina'])
  },
  computed: {
    ...mapGetters('professores', { professores: 'getProfessoresSelect' }),
    ...mapGetters('disciplinas', { disciplina: 'getDisciplinaById' })
  },
  async mounted () {
    await this.setDisciplinas()
    await this.setProfessores()
    if (this.id) {
      await this.popuplaForm()
    }
  }
}
</script>

<style>
.btn-fixed-width {
  width: 98vw;
}
</style>
