<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-10 offset-1">
          <h1 class="text-center mt-5 mb-5">LAB Week #11 - IronContacts</h1>
          <div class="text-center d-flex justify-content-center gap-4 mt-4 mb-5">
            <button type="button" @click="addRandomContact" class="btn btn-warning">Add random contact</button>
            <button type="button" @click="sortByPopularity" class="btn btn-warning">Sort by Popularity</button>
            <button type="button" @click="sortByName" class="btn btn-warning">Sort by Name</button>
          </div>
          <table class="table table-bordered border-black w-100">
            <thead style="background-color: #41B883;">
              <th class="fs-4 text-center border border-black">Picture</th>
              <th class="fs-4 text-center border border-black">Name</th>
              <th class="fs-4 text-center border border-black">Popularity</th>
              <th class="fs-4 text-center border border-black">wonOscar</th>
              <th class="fs-4 text-center border border-black">wonEmmy</th>
              <th class="fs-4 text-center border border-black">Actions</th>
            </thead>
            <tbody>
              <tr v-if="isLoading" colspan="6">
                <td colspan="6" class="text-center fs-3">Loading contacts...</td>
              </tr>
              <tr v-else-if="renderedContacts.length > 0" v-for="contact in renderedContacts" :key="contact.id">
                <td class="text-center w-50">
                  <img :src="contact.pictureUrl" :alt="contact.name" class="w-25">
                </td>
                <td class="w-25 text-center fs-4 align-middle" v-text="contact.name"></td>
                <td class="w-25 text-center fs-4 align-middle" v-text="contact.popularity.toFixed(2)"></td>
                <td class="w-25 text-center fs-4 align-middle">
                  <i v-if="contact.wonOscar" class="fa-solid fa-trophy align-middle"></i>
                </td>
                <td class="w-25 text-center fs-3 align-middle">
                  <i v-if="contact.wonEmmy" class="fa-solid fa-award"></i>
                </td>
                <td class="w-25 text-center fs-3 align-middle">
                  <i @click="deleteRow(contact)" class="fa-solid fa-trash-arrow-up text-danger"></i>
                </td>
              </tr>
              <tr v-else>
                <td colspan="6" class="text-center">No more contacts available to add</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';

let allContacts = ref([]);
let renderedContacts = ref([]);
let isLoading = ref(true);
let contactsLeft = computed(() => allContacts.value.filter(contact => !renderedContacts.value.includes(contact)));

const fetchData = async () => {
  try {
    const response = await fetch('/api/contacts');
    const data = await response.json();
    allContacts.value = data.contacts;
    renderedContacts.value = allContacts.value.slice(0, 5);
    isLoading.value = false;
  } catch (error) {
    console.log("Request Error: ", error);
  }
};

onMounted(fetchData);

const addRandomContact = () => {
  if (contactsLeft.value.length > 0) {
    const randomNumber = Math.floor(Math.random() * contactsLeft.value.length);
    const newContact = contactsLeft.value[randomNumber];
    renderedContacts.value.push(newContact);
  } else {
    alert('There are no more contacts to add.')
  }
}

const sortByPopularity = () => {
  renderedContacts.value.sort((a, b) => b.popularity - a.popularity);
}

const sortByName = () => {
  renderedContacts.value.sort((a, b) => a.name.localeCompare(b.name));
}

const deleteRow = (contact) => {
  const index = renderedContacts.value.indexOf(contact);
  if (index !== -1) {
    renderedContacts.value.splice(index, 1);
  }
};
</script>

<style scoped>
td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>