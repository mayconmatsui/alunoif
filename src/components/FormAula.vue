<template>
  <q-page>
    <div class="text-subtitle2 q-ma-sm text-grey-9">Cadastro de Professor</div>
    <q-form class="q-mx-sm" @submit.prevent="salvarRegistro()">
      <q-input v-model="data" label="Data" color="black">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date color="black" mask="DD/MM/YYYY" v-model="data" @input="() => $refs.qDateProxy.hide()" :locale="myLocale"/>
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
      <div class="row flex flex-center q-mt-lg">
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
      console.log(this.data)

      // if (this.id) {
      //   this.updateProfessor({
      //     id: this.id,
      //     nome: this.nome
      //   })
      // } else {
      //   this.addProfessor({
      //     nome: this.nome
      //   })
      // }
      // this.$q.notify({
      //   color: 'green-5',
      //   textColor: 'white',
      //   icon: 'done',
      //   message: 'Registro salvo com sucesso!'
      // })
      // this.$router.push('/aulas')
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
    ...mapActions('professores', ['addProfessor', 'updateProfessor', 'setProfessores'])
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
