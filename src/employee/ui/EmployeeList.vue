<template>
    <div>
      <EmployeeFilter @filter="applyFilter" />
  
      <q-table
        title="Employees"
        :rows="filteredEmployees"
        row-key="id"
        :columns="columns"
        flat
        bordered
        class="q-mt-md"
      >
        <template v-slot:body="props">
          <tr>
            <td>{{ props.row.id }}</td>
            <td>{{ props.row.name }}</td>
            <td>{{ props.row.department }}</td>
            <td>{{ props.row.age }}</td>
            <td>{{ props.row.salary }}</td>
            <td>{{ props.row.location }}</td>
            <td>{{ props.row.gender }}</td>
            <td>
              <EmployeeItem
                :employee="props.row"
                @edit="editEmployee"
                @delete="deleteEmployee"
              />
            </td>
          </tr>
        </template>
      </q-table>
  
      <q-btn
        label="Add Employee"
        color="primary"
        @click="openForm"
        class="q-mt-md"
        :loading="loading"
        :disable="loading"
        />
  
      <EmployeeForm
        v-if="showForm"
        :employee="selectedEmployee"
        @close="closeForm"
      />
  
      <q-banner v-if="error" class="bg-red text-white q-mt-md">
        {{ error }}
      </q-banner>
    </div>
  </template>
  
  <script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

import EmployeeItem from "./EmployeeItem.vue";
import EmployeeForm from "./EmployeeForm.vue";
import EmployeeFilter from "./EmployeeFilter.vue";

import { QTable, QBtn, QSpinner, QBanner } from "quasar";

const store = useStore();

const showForm = ref(false);
const selectedEmployee = ref(null);
const filterCriteria = ref({
	name: "",
	department: "",
	salary: null,
	gender: "",
});

onMounted(() => {
	store.dispatch("fetchEmployees");
});

const employees = computed(() => store.getters.allEmployees);
const loading = computed(() => store.state.loading);
const error = computed(() => store.state.error);

watch(error, (newVal) => {
	if (newVal) {
		setTimeout(() => {
			store.commit("SET_ERROR", null);
		}, 5000);
	}
});

const filteredEmployees = computed(() => {
	let list = employees.value;
	if (filterCriteria.value.name) {
		list = list.filter((emp) =>
			emp.name.toLowerCase().includes(filterCriteria.value.name.toLowerCase()),
		);
	}
	if (filterCriteria.value.department) {
		list = list.filter((emp) =>
			emp.department
				.toLowerCase()
				.includes(filterCriteria.value.department.toLowerCase()),
		);
	}
	if (filterCriteria.value.salary) {
		list = list.filter((emp) => emp.salary >= filterCriteria.value.salary);
	}
	if (filterCriteria.value.gender) {
		list = list.filter(
			(emp) =>
				emp.gender.toLowerCase() === filterCriteria.value.gender.toLowerCase(),
		);
	}
	return list;
});

const columns = [
	{ name: "id", label: "ID", field: "id", align: "left" },
	{ name: "name", label: "Name", field: "name", align: "left" },
	{
		name: "department",
		label: "Department",
		field: "department",
		align: "left",
	},
	{ name: "age", label: "Age", field: "age", align: "left" },
	{ name: "salary", label: "Salary", field: "salary", align: "left" },
	{ name: "location", label: "Location", field: "location", align: "left" },
	{ name: "gender", label: "Gender", field: "gender", align: "left" },
	{ name: "actions", label: "Actions", field: "actions", align: "center" },
];

const openForm = () => {
	selectedEmployee.value = null;
	showForm.value = true;
};

const closeForm = () => {
	showForm.value = false;
};

const editEmployee = (employee) => {
	selectedEmployee.value = employee;
	showForm.value = true;
};

const deleteEmployee = (employeeId) => {
	store.dispatch("deleteEmployee", employeeId);
};

const applyFilter = (criteria) => {
	filterCriteria.value = criteria;
};
</script>
  