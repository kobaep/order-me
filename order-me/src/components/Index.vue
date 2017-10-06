<template>
	<div class="container">
    <div class="columns">
      <div class="column is-4">
        <order-list :orders="orders" :price="price" @increment="increment" @decrement="decrement" @sendOrder="sendOrder" ></order-list>
      </div>
      <div class="column">
        <item-list @orders="addOrder" :items="items"></item-list>
      </div>
    </div>
	</div>
</template>

<script>
import ItemList from './ItemList'
import OrderList from './OrderList'
import db from '../firebase.conf'

export default {
  firebase: {
    nomkafe: db.ref('nomkafe')
  },
  components: {
    'item-list': ItemList,
    'order-list': OrderList
  },
  name: 'Index',
  data () {
    return {
      msg: 'Index',
      orders: {},
      price: 0,
      items: {}
    }
  },
  methods: {
    addOrder ({name, price}) {
      if (this.orders[name]) {
        this.orders[name].amount += 1
        this.$set(this.orders, name, this.orders[name])
      } else {
        this.$set(this.orders, name, {name, price, amount: 1})
      }
      this.price += price
    },
    increment ({ name, price, amount }) {
      this.orders[name].amount += 1
      this.$set(this.orders, name, this.orders[name])
      this.price = this.price + price
    },
    decrement ({ name, price, amount }) {
      if (this.orders[name].amount > 1) {
        this.orders[name].amount -= 1
        this.$set(this.orders, name, this.orders[name])
        this.price = this.price - price
      } else if (this.orders[name].amount === 1) {
        this.$delete(this.orders, name)
        this.price = this.price - price
      }
    },
    sendOrder (desk) {
      const newOrder = {
        desk: desk,
        order: this.orders,
        price: this.price,
        time: new Date().toString(),
        status: 'NEW'
      }

      this.$firebaseRefs.nomkafe.child('order').push(newOrder)
      this.orders = {}
      this.price = 0
    }
  },
  mounted () {
    this.$firebaseRefs.nomkafe.child('items').on('value', snapshot => {
      this.items = snapshot.val()
    })
  }
}
</script>

<style></style>
