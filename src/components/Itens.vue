<template>
  <q-page padding>
    <q-input standout dense clearable v-model="busca" @input="localizar()" debounce="500" placeholder="Buscar" class="input-busca text-weight-medium q-mb-sm">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
    <q-list v-if="itensFiltrados.length > 0">
      <div v-for="iten in itensFiltrados" :key="iten.id">
        <q-item :to="`/itens/${iten.id}`" >
          <q-item-section>
            <q-item-label>{{iten.tipo}}</q-item-label>
            <q-item-label caption>{{iten.marca}}</q-item-label>
            <q-item-label caption>{{iten.categoria}}</q-item-label>
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
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      itens: {},
      itensFiltrados: {},
      busca: ''
    }
  },
  methods: {
    localizar () {
      if (this.busca === '') {
        this.itensFiltrados = this.itens
      } else {
        const needle = (this.busca ? this.busca.toLowerCase() : '')
        const lista = Object.values(this.itens)
        const items = []
        lista.map((a) => {
          const b = Object.values(a)
          const filtra = b.filter(
            v => v.toString().toLowerCase().indexOf(needle) > -1
          )
          if (filtra.length > 0) {
            items.push(a)
          }
        })
        this.itensFiltrados = items
      }
    },
    ...mapActions('disciplinas', ['getDisciplinas'])
  },
  beforeCreate () {
    this.getDisciplinas()
    // this.$auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.$dbfs.collection(`users/${this.$auth.currentUser.uid}/cadastros`)
    //       .onSnapshot({ includeMetadataChanges: true }, (snap) => {
    //         if (snap.empty) {
    //           this.itens = null
    //         } else {
    //           this.itens = snap.docs.map(doc => {
    //             const data = doc.data()
    //             const id = doc.id
    //             return { id, ...data }
    //           })
    //           this.itensFiltrados = this.itens
    //         }
    //       })
    //   }
    // })
  }
}
</script>
<style lang="stylus" scoped>
.btn-fixed-width
  width 95%
</style>
