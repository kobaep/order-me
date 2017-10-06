<template>
  <div class="box is-fullheight">
    <div class="column" v-for="(value, key) in items" :key="key">
      <img src="../assets/milke_shake.jpeg" alt="" @click="addOrder(value)">
      <figure>{{value.name}}: {{ value.price }}</figure>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
  name: 'item-list',
  data () {
    return {
      msg: 'Item List'
    }
  },
  methods: {
    addOrder (item) {
      this.$emit('orders', item)
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>

