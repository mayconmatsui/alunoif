<template>
  <q-page padding>
    <q-input standout dense clearable v-model="busca" @input="buscar()" debounce="500" placeholder="Buscar" class="input-busca text-weight-medium q-mb-sm">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-list v-if="getDisciplinasFiltradas.length > 0">
      <div v-for="iten in getDisciplinasFiltradas" :key="iten.id">
        <q-item :to="`/itens/${iten.id}`" >
          <q-item-section>
            <q-item-label>{{iten.nome}}</q-item-label>
            <q-item-label caption>{{iten.local}}</q-item-label>
            <q-item-label caption>{{professores[iten.professor]}}</q-item-label>
            <q-item-label v-for="horario in mostrarHorarios(iten.horarios)" :key="horario.id" caption>{{horario}}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />
      </div>
    </q-list>
    <q-list bordered v-else>
      <q-item>
        <q-item-section class="text-weight-medium text-grey-9 text-center">Nenhum cadastrado</q-item-section>
      </q-item>
    </q-list>
    <q-btn round color="black" size="lg" icon="add" to='/disciplinas/cadastro' class="fixed-bottom-right q-mb-lg q-mr-md animate-pulse-dark" />
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      busca: '',
      diasSemana: {
        0: 'Domingo',
        1: 'Segunda',
        2: 'Terça',
        3: 'Quarta',
        4: 'Quinta',
        5: 'Sexta',
        6: 'Sábado'
      }
    }
  },
  computed: {
    ...mapState('disciplinas', ['disciplinas']),
    ...mapGetters({ professores: 'professores/getProfessores' }),
    ...mapGetters('disciplinas', ['getDisciplinasFiltradas'])
    // ...mapGetters('disciplinas', ['disciplinas'])
  },
  methods: {
    mostrarHorarios (iten) {
      const horario = Object.entries(iten).map((a) => {
        return `${this.diasSemana[a[0]]} ${a[1].join(' ')}`
      })
      return horario
    },
    buscar () {
      this.localizarDisciplinas(this.busca)
    },
    ...mapActions('disciplinas', ['setDisciplinas', 'localizarDisciplinas']),
    ...mapActions('professores', ['setProfessores'])
  },
  async mounted () {
    await this.setProfessores()
    await this.setDisciplinas()
    await this.buscar()
  }
}
</script>
<style lang="stylus" scoped>
.btn-fixed-width
  width 95%
</style>
