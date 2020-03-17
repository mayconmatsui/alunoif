<template>
  <q-page padding>
    <q-input standout dense clearable v-model="busca" @input="localizarDisciplinas(busca)" debounce="500" placeholder="Buscar" class="input-busca text-weight-medium q-mb-sm">
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
          </q-item-section>

          <q-item-section side top v-if="iten.tipo == 'Smartphone'">
            <q-item-label caption>{{iten.modelocomercial}}</q-item-label>
            <q-item-label caption>{{iten.modelo}}</q-item-label>
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
    <q-btn round color="black" size="lg" icon="add" to='/itens/cadastro' class="fixed-bottom-right q-mb-lg q-mr-md animate-pulse-dark" />
  </q-page>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      busca: ''
    }
  },
  computed: {
    ...mapState('disciplinas', ['disciplinas']),
    ...mapGetters({ professores: 'professores/getProfessores' }),
    ...mapGetters('disciplinas', ['getDisciplinasFiltradas'])
    // ...mapGetters('disciplinas', ['disciplinas'])
  },
  methods: {
    ...mapActions('disciplinas', ['setDisciplinas', 'localizarDisciplinas']),
    ...mapActions('professores', ['setProfessores'])
  },
  async mounted () {
    await this.setProfessores()
    await this.setDisciplinas()
    await this.localizarDisciplinas(this.busca)
  }
}
</script>
<style lang="stylus" scoped>
.btn-fixed-width
  width 95%
</style>
