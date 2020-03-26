<template>
  <q-page padding>
    <q-input standout dense clearable v-model="busca" @input="buscar()" debounce="500" placeholder="Buscar" class="input-busca text-weight-medium q-mb-sm">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-list v-if="aulasFiltradas.length > 0">
      <div v-for="iten in aulasFiltradas" :key="iten.id">
        <q-item>
          <q-item-section>
            <q-item-label>{{iten.disciplina.nome}}</q-item-label>
            <q-item-label caption>{{iten.data}}</q-item-label>
            <q-item-label caption v-for="(hora, index) in mostrarHorarios(iten.horarios)" :key="index">{{hora}}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-btn flat round color="black" icon="more_vert">
              <q-menu
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list>
                  <q-item clickable v-close-popup :to="`/professores/${iten.id}/editar`" >
                    <q-item-section>Editar</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click.native="deletarRegistro(iten.id)">
                    <q-item-section>Exluir</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
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
    <q-btn round color="black" size="lg" icon="add" to='/aulas/cadastrar' class="fixed-bottom-right q-mb-lg q-mr-md animate-pulse-dark" />
  </q-page>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      busca: '',
      aulasFiltradas: ''
    }
  },
  computed: {
    // ...mapGetters('aulas', { aulas: 'getAulas' })
    ...mapState('aulas', ['aulas'])
  },
  methods: {
    buscar () {
      if (this.busca === '') {
        this.aulasFiltradas = this.aulas
      } else {
        const needle = this.busca ? this.busca.toLowerCase() : ''
        const lista = Object.values(this.aulas)
        const items = []
        lista.map(a => {
          const b = Object.values(a)
          const filtra = b.filter(
            v =>
              v
                .toString()
                .toLowerCase()
                .indexOf(needle) > -1
          )
          if (filtra.length > 0) {
            items.push(a)
          }
        })
        this.aulasFiltradas = items
      }
    },
    mostrarHorarios (iten) {
      const horarios = iten.map((a) => {
        return `${a.horaInicial} - ${a.horaFinal}. ${a.local}`
      })
      return horarios
    },
    deletarRegistro (id) {
      this.$q.dialog({
        title: 'Confirmar',
        message: 'Deseja deletar o registro.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$q.notify({
          color: 'green-5',
          textColor: 'white',
          icon: 'done',
          message: 'Registro deletado com sucesso!.'
        })
        this.deleteProfessor(id)
      })
    },
    ...mapActions('aulas', ['setAulas'])
  },
  async mounted () {
    await this.setAulas()
    await this.buscar()
  }
}
</script>
<style lang="stylus" scoped>
.btn-fixed-width
  width 95%
</style>
