<template>
    <div class="q-pa-md row items-center q-col-gutter-sm">
      <q-input
        v-model="filters.name"
        label="Filter by Name"
        dense
        class="col"
      />
      <q-input
        v-model="filters.department"
        label="Filter by Department"
        dense
        class="col"
      />
      <q-input
        v-model.number="filters.salary"
        label="Minimum Salary"
        type="number"
        dense
        class="col"
      />
      <q-select
        v-model="filters.gender"
        :options="genderOptions"
        label="Filter by Gender"
        dense
        clearable
        class="col"
      />
    </div>
  </template>
  
  <script setup>
import { ref, watch } from "vue";
import { defineEmits } from "vue";
import { QInput, QSelect } from "quasar";

const emits = defineEmits(["filter"]);

const filters = ref({
	name: "",
	department: "",
	salary: null,
	gender: "",
});

const genderOptions = ["Male", "Female", "Other"];
watch(
	filters,
	(newFilters) => {
		emits("filter", { ...newFilters });
	},
	{ deep: true },
);
</script>
  