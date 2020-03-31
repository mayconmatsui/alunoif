<template>
  <div class="bg-positive" style="height: 130px">
    <q-avatar class="absolute" size="60px" style="top: 15px; left: 15px">
      <img src="https://cdn.quasar.dev/img/avatar.png">
    </q-avatar>
    <div class="absolute text-weight-bold text-white" style="top: 85px; left: 15px">{{ user.nome }}</div>
    <div class="absolute text-white" style="top: 100px; left: 15px">{{ user.email }}</div>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>
