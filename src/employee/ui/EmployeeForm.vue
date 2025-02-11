<template>
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" style="width: 700px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h6">
            {{ isEdit ? 'Edit Employee' : 'Add Employee' }}
          </div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-form ref="employeeForm" @submit.prevent="save">
            <q-input
              v-model="form.name"
              label="Name"
              :rules="[val => !!val || 'Name is required']"
            />
            <q-input
              v-model="form.department"
              label="Department"
              :rules="[val => !!val || 'Department is required']"
            />
            <q-input
              v-model.number="form.age"
              label="Age"
              type="number"
              :rules="[val => (val != null && val > 0) || 'Age must be a positive number']"
            />
            <q-input
              v-model.number="form.salary"
              label="Salary"
              type="number"
              :rules="[val => (val != null && val > 0) || 'Salary must be a positive number']"
            />
            <q-input
              v-model="form.location"
              label="Location"
              :rules="[val => !!val || 'Location is required']"
            />
            <q-select
              v-model="form.gender"
              :options="['Male', 'Female', 'Other']"
              label="Gender"
              clearable
              :rules="[val => !!val || 'Gender is required']"
            />
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="secondary" @click="close" />
          <q-btn flat label="Save" color="primary" @click="save" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
import { ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { defineProps, defineEmits } from "vue";
import {
	QDialog,
	QCard,
	QCardSection,
	QCardActions,
	QInput,
	QSelect,
	QBtn,
	QForm,
} from "quasar";

const props = defineProps({
	employee: {
		type: Object,
		default: null,
	},
});
const emits = defineEmits(["close"]);

const store = useStore();

const dialog = ref(true);
const employeeForm = ref(null);

const form = ref({
	name: "",
	department: "",
	age: null,
	salary: null,
	location: "",
	gender: "",
});

const isEdit = computed(() => !!props.employee);

watch(
	() => props.employee,
	(newVal) => {
		if (newVal) {
			form.value = { ...newVal };
		} else {
			form.value = {
				name: "",
				department: "",
				age: null,
				salary: null,
				location: "",
				gender: "",
			};
		}
	},
	{ immediate: true },
);

const close = () => {
	dialog.value = false;
	emits("close");
};

const save = () => {
	employeeForm.value.validate().then((isValid) => {
		if (!isValid) {
			return;
		}
		if (isEdit.value) {
			store.dispatch("updateEmployee", form.value);
		} else {
			store.dispatch("addEmployee", form.value);
		}
		close();
	});
};
</script>
  