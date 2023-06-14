<template>
  <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
            <h1 class="text-grey-800 font-bold text-xl">Creative Coder Monthly Expenses</h1>
            <p class="text-grey-800 my-3 text-md">Total left expense amount for {{currentMonth}} - {{totalLeftAmount}}</p>
            <div class="flex mt-4">
                <input ref="expenseInput" v-model="title" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Expense Name">
                <input v-model="amount" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Amount">
                <button @click="addExpense" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  text-grey border-grey hover:bg-gray-500 hover:text-white">Add</button>
            </div>
        </div>
        <div>
            <template v-for="expense in expenses" :key="expense.id">
              <div class="flex mb-4 items-center"  v-if="expense.paid">
                  <p class="w-full line-through text-green-500">{{expense.title}} - {{expense.amount}}</p>
                  <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  text-grey border-grey hover:bg-gray-500 hover:text-white" @click="togglePaid(expense)">Unpaid</button>
                  <button  @click="remove(expense)" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</button>
              </div>
              <div class="flex mb-4 items-center" v-else>
                  <p class="w-full text-grey-800">{{expense.title}} - {{expense.amount}}</p>
                  <button  @click="togglePaid(expense)" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">Paid</button>
                  <button  @click="remove(expense)" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</button>
              </div>
            </template>
        </div>
    </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      expenses : [
        {id : 1,title : 'hello', amount : 50000 , paid : true},
        {id : 2,title : 'hello', amount : 50000 , paid : false}
      ],
      title : "",
      amount : "",
    }
  },
  methods :{
    addExpense() {
      this.expenses.push({id : Date.now().toString() ,title:this.title, paid : false, amount :this.amount});
      this.title = ""
      this.amount = ""

      setTimeout(() => {
          this.$refs.expenseInput.focus()
      }, 100);
    },
    togglePaid(expense){
      let updateExpense = this.expenses.find(e => e.id === expense.id);
      updateExpense.paid = !updateExpense.paid
    },
    remove(expense){
      this.expenses = this.expenses.filter(e => e.id !== expense.id);
    },
  },
  computed : {
    currentMonth() {
      const currentDate = new Date();
      const monthName = currentDate.toLocaleString('default', { month: 'long' });
      return monthName;
    },
    totalLeftAmount() {
        return this.expenses.reduce((total, expense) => {
          if (!expense.paid) {
            return total + expense.amount;
          }
          return total;
        }, 0);
    },
  }
}
</script>

<style>

</style>