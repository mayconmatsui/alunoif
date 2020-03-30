<template>
  <div class="flex flex-center">
    <div class="q-mb-md" style="max-width:400px;min-width:300px">
      <img alt="BrasilChecar Logo" src="~assets/ifms.png" width="300" class="flex flex-center q-my-md">
      <q-form  @submit.prevent.stop="efetuarLogin()" class="q-gutter-sm" v-if="telaLogin">
        <q-input
          v-model="email"
          color="black"
          clearable
          label="Email"
          :rules="[val => !!val || 'Email deve ser informado.']"
        />
        <q-input
          v-model="senha"
          color="black"
          label="Senha"
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            val => !!val || 'Senha deve ser informada.',
            val => val.length >= 6 || 'Mínimo 6 caracteres',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="row">
          <div class="col">
            <q-btn color="black" type="submit" class="btn-fixed-width text-weight-bold" label="entrar" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-btn flat class="btn-fixed-width" label="criar conta" @click.prevent="abrirCadastro()"/>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <q-btn flat class="btn-fixed-width" label="Esqueceu sua senha?" @click.prevent="abrirRecuperacao"/>
          </div>
        </div>
      </q-form>
      <!-- formulario de cadastro -->
      <q-form @submit.prevent.stop="onSubmit" class="q-gutter-sm" v-if="telaCadastro">
        <q-input
          v-model="nome"
          color="black"
          clearable
          label="Nome completo"
          :rules="[val => !!val || 'Nome deve ser informado.']"
        />
        <q-input
          v-model="email"
          color="black"
          clearable
          label="Email"
          type="email"
          :rules="[val => !!val || 'Email deve ser informado.']"
        />
        <q-input
          v-model="senha"
          color="black"
          label="Senha"
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            val => !!val || 'Senha deve ser informada.',
            val => val.length >= 6 || 'Mínimo 6 caracteres',
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-input
          v-model="resenha"
          color="black"
          label="Repita a senha"
          :type="isPwd ? 'password' : 'text'"
          :error="!isValid"
          error-message="Senhas diferentes."
        >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-list class="q-pa-none q-ma-none">
          <q-item class="q-pa-none q-ma-none">
            <q-item-section top>
              <q-item-label lines="1">
                <q-checkbox color="black" v-model="termos"/>
                <span class="text-grey-8"> Eu li e aceito os </span>
                <span class="text-weight-medium cursor-pointer" @click="abrirTermos()">Termos de Serviço</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="row">
          <div class="col">
            <q-btn flat class="btn-fixed-width" label="Voltar" @click.prevent="abrirLogin()"/>
          </div>
          <div class="col">
            <q-btn color="black" type="submit" class="btn-fixed-width" label="Cadastrar" />
          </div>
        </div>
      </q-form>
     <!-- Formulario de reset de senha -->
      <q-form @submit.prevent.stop="recuperarSenha()" class="q-gutter-sm" v-if="telaRecuperar">
        <q-input
        v-model="email"
        color="black"
        clearable
        label="Email"
        :rules="[val => !!val || 'Email deve ser informado.']"
        />

        <div class="row">
          <div class="col">
            <q-btn flat class="btn-fixed-width" label="Voltar" @click.prevent="abrirLogin()"/>
          </div>
          <div class="col">
            <q-btn color="black" type="submit" class="btn-fixed-width" label="Recuperar" />
          </div>
        </div>
      </q-form>
    </div>
    <q-dialog v-model="modalTermos">
      <q-card >
        <q-card-section>
          <div class="text-h6 text-center">Termos e condições de uso do software</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 60vh" class="scroll">

          <q-separator inset />

        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="black" v-close-popup />
          <q-btn flat label="Aceitar" color="black" @click="termos = true" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { openURL } from 'quasar'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MyAuth',
  data () {
    return {
      isPwd: true,
      nome: '',
      email: '',
      senha: '',
      resenha: '',
      telaLogin: true,
      telaCadastro: false,
      telaRecuperar: false,
      termos: false,
      modalTermos: false
    }
  },
  methods: {
    abrirTermos () {
      this.modalTermos = true
    },
    abrirLogin () {
      this.telaLogin = true
      this.telaCadastro = false
      this.telaRecuperar = false
    },
    abrirCadastro () {
      this.telaLogin = false
      this.telaCadastro = true
      this.telaRecuperar = false
    },
    abrirRecuperacao () {
      this.telaLogin = false
      this.telaCadastro = false
      this.telaRecuperar = true
    },
    async efetuarLogin () {
      // const self = this
      const { email, senha } = this
      if (email !== '' && senha !== '') {
        await this.login({ email, senha })

        await console.log(this.error)
      //   this.$auth.signInWithEmailAndPassword(
      //     email, senha
      //   ).catch(function (error) {
      //     if (error.code === 'auth/invalid-email') {
      //       self.$q.notify({
      //         color: 'red-5',
      //         textColor: 'white',
      //         icon: 'fas fa-check-circle',
      //         message: 'Email inválido.'
      //       })
      //     } else {
      //       self.$q.notify({
      //         color: 'red-5',
      //         textColor: 'white',
      //         icon: 'fas fa-check-circle',
      //         message: 'Usuário ou senha inválidos.'
      //       })
      //     }
      //   })
      // } else {
      //   self.$q.notify({
      //     color: 'red-5',
      //     textColor: 'white',
      //     icon: 'fas fa-check-circle',
      //     message: 'Preencha todos os campos corretamente.'
      //   })
      }
    },
    onSubmit () {
      if (this.termos !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-exclamation-triangle',
          message: 'Você precisa aceitar os termos de serviço para continuar.'
        })
      } else {
        this.cadastrar()
      }
    },
    cadastrar () {
      if (this.senha === this.resenha) {
        this.cadastrarUser()
      } else {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Senhas diferentes.'
        })
      }
    },
    cadastrarUser () {
      const self = this
      const { nome, email, senha, termos } = this
      if (nome !== '' && email !== '' && senha !== '' && termos !== '') {
        this.$auth.createUserWithEmailAndPassword(email, senha)
          .then((user) => {
            if (user) {
              user.user.updateProfile({
                displayName: nome
              })
              const obj = {
                uid: user.user.uid,
                nome: nome,
                email: email,
                termos: termos
              }
              this.$dbfs.doc(`users/${user.user.uid}`).set(obj)
            }
          })
          .catch(function (error) {
            if (error.code === 'auth/email-already-in-use') {
              self.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'Email já Cadastrado.'
              })
            } else if (error.code === 'auth/invalid-email') {
              self.$q.notify({
                color: 'red-5',
                textColor: 'white',
                icon: 'fas fa-check-circle',
                message: 'Email inválido.'
              })
            }
          })
      } else {
        self.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Error ao cadastrar verificar dados.'
        })
      }
    },
    recuperarSenha () {
      const self = this
      this.$auth.sendPasswordResetEmail(this.email).then(function () {
        self.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'fas fa-check-circle',
          message: 'Email de recuperação enviado com sucesso.'
        })
      }).catch(function (error) {
        if (error.code === 'auth/user-not-found') {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Email não encontrado.'
          })
          return false
        }

        if (error.code === 'auth/invalid-email') {
          self.$q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Email inválido.'
          })
          return false
        }
      })
    },
    openURL,
    ...mapActions('auth', ['login', 'logout', 'setUser'])
  },
  computed: {
    isValid () {
      return this.senha === this.resenha
    },
    ...mapGetters('auth', {
      error: 'getError',
      isLoggedIn: 'getLoginState'
    })
  },
  mounted () {
    this.$auth.onAuthStateChanged(user => {
      if (user) {
        this.$router.push({ path: '/' }).catch(err => { console.log(err) })
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.btn-fixed-width
  width 95%
</style>
