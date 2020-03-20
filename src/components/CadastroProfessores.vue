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
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      nome: ''
    }
  },
  methods: {
    salvarRegistro () {
      const dados = {
        nome: this.nome
      }
      this.addProfessor(dados)
    },
    ...mapActions('professores', ['addProfessor'])
  }
}
</script>

<style>
.btn-fixed-width {
  width: 98vw;
}
</style>
