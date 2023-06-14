<template>
  <div class="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div class="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div class="mb-4">
            <h1 class="text-grey-800 font-bold text-xl">Creative Coder Monthly Expenses</h1>
            <p class="text-grey-800 my-3 text-md">Total left expense amount for {{currentMonth}} - {{totalLeftAmount}} MMK</p>
            <div class="flex mt-4">
                <input ref="expenseInput" v-model="title" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Expense Name">
                <input v-model="amount" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Amount">
                <button @click="addExpense" class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  text-grey border-grey hover:bg-gray-500 hover:text-white">Add</button>
            </div>
        </div>
        <div>
            <template v-for="expense in expenses" :key="expense.id">
              <div class="flex mb-4 items-center"  >
                  <div v-if="expense.isEdit" class="flex mt-4">
                    <input ref="expenseInput" v-model="expense.title" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Expense Name">
                    <input v-model="expense.amount" type="number" class="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Amount">
                     <button  @click="updateExpense(expense)" class="flex-no-shrink p-2 ml-2 border-2 rounded text-blue-500 border-blue-500 hover:text-white hover:bg-blue-500">Update</button>
                  </div>
                  <template  v-else>
                    <p class="w-full " :class="[expense.paid ? 'text-green-500 line-through' : 'text-grey-800']"  @dblclick="editExpense(expense)">{{expense.title}} - <span :class="[expense.paid ? 'text-green-500' : 'text-red-500']">{{expense.amount}} MMK</span></p>
                    <button class="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  text-grey border-grey  hover:text-white" @click="togglePaid(expense)" :class="[expense.paid ? 'text-grey border-grey hover:bg-gray-500' : 'text-green-500 border-green-500 hover:bg-green-500']">{{expense.paid ? 'Unpaid' : 'Paid'}}</button>
                     <button  @click="remove(expense)" class="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</button>
                  </template>
              </div>
            </template>
        </div>
    </div>
</div>
</template>

<script>
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import {db} from './firebase';

export default {
  data(){
    return{
      expenses : [
       
      ],
      title : "",
      amount : "",
    }
  },
  methods :{
    editExpense(expense) {
      let updateExpense = this.expenses.find(e => e.id === expense.id);
      updateExpense.isEdit = true;
    },
    addExpense() {
      let data = {title:this.title, paid : false, amount :this.amount, date : serverTimestamp()};
      let ref = collection(db,'expenses');
      addDoc(ref,data)
      this.title = ""
      this.amount = ""

      setTimeout(() => {
          this.$refs.expenseInput.focus()
      }, 100);
    },
    async togglePaid(expense){
      let updateExpense = this.expenses.find(e => e.id === expense.id);
      updateExpense.paid = !updateExpense.paid
      this.updateExpense(updateExpense);
    },
    async updateExpense(expense) {
      let ref = doc(db, 'expenses', expense.id);
      await updateDoc(ref, expense);
    },
    async remove(expense){
      let ref = doc(db, 'expenses', expense.id);
      await deleteDoc(ref, expense);
    },
    async getExpenses() {
      let ref = collection(db,'expenses');
      let q = query(ref,orderBy('date','desc'))
      onSnapshot(q, (snapshot) => {
        this.expenses = [];
        snapshot.docs.forEach(doc => {
          this.expenses.push({id : doc.id ,...doc.data(), isEdit : false})
      })
    });
      
    }
  },
  computed : {
    currentMonth() {
      const currentDate = new Date();
      const monthName = currentDate.toLocaleString('default', { month: 'long' });
      return monthName;
    },
    totalLeftAmount() {
        return this.expenses.reduce((total, expense) => {
          if (!expense.paid && !expense.isEdit) {
            return Number(total) + Number(expense.amount);
          }
          return total;
        }, 0);
    },
  },
  mounted() {
    this.getExpenses()
  }
}
</script>

<style>

</style>