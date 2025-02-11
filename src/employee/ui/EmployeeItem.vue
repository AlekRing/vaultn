<template>
    <div>
      <q-btn flat icon="edit" color="primary" @click="edit" />
      <q-btn flat icon="delete" color="negative" @click="remove" />
    </div>
  </template>
  
  <script setup>
import { defineProps, defineEmits } from "vue";
import { QBtn } from "quasar";

const props = defineProps({
	employee: Object,
});

const emits = defineEmits(["edit", "delete"]);

const edit = () => {
	emits("edit", props.employee);
};

const remove = () => {
	emits("delete", props.employee.id);
};
</script>
  