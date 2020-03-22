<template>
  <q-page padding>
    <q-input standout dense clearable v-model="busca" @input="buscar()" debounce="500" placeholder="Buscar" class="input-busca text-weight-medium q-mb-sm">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-list v-if="professoresFiltrados.length > 0">
      <div v-for="iten in professoresFiltrados" :key="iten.id">
        <q-item>
          <q-item-section>
            <q-item-label>{{iten.nome}}</q-item-label>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      busca: ''
    }
  },
  computed: {
    ...mapGetters('professores', { professoresFiltrados: 'getProfessoresFiltrados' })
  },
  methods: {
    buscar () {
      this.localizarProfessores(this.busca)
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
    ...mapActions('professores', ['setProfessores', 'deleteProfessor', 'localizarProfessores'])
  },
  async mounted () {
    await this.setProfessores()
    await this.buscar()
  }
}
</script>
<style lang="stylus" scoped>
.btn-fixed-width
  width 95%
</style>
