<template>
  <q-page>
    <div class="text-subtitle2 q-ma-sm text-grey-9">Cadastro de Professor</div>
    <q-form class="q-mx-sm" @submit.prevent="salvarRegistro()">
      <q-input
        v-model="nome"
        color="black"
        clearable
        label="Nome"
        :rules="[val => !!val || 'Nome deve ser informado']"
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
      nome: ''
    }
  },
  methods: {
    salvarRegistro () {
      if (this.id) {
        this.updateProfessor({
          id: this.id,
          nome: this.nome
        })
      } else {
        this.addProfessor({
          nome: this.nome
        })
      }
      this.$q.notify({
        color: 'green-5',
        textColor: 'white',
        icon: 'done',
        message: 'Registro salvo com sucesso!'
      })
      this.$router.push('/professores')
    },
    ...mapActions('professores', ['addProfessor', 'updateProfessor', 'setProfessores'])
  },
  computed: {
    ...mapGetters('professores', ['getProfessorById'])
  },
  async mounted () {
    if (this.id) {
      this.nome = await this.getProfessorById(this.id)[0].nome
    }
  }
}
</script>

<style>
.btn-fixed-width {
  width: 98vw;
}
</style>
