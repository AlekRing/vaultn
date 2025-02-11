<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Employee Management
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md">
        <EmployeeList />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { EmployeeList } from "./employee";
import {
	QLayout,
	QHeader,
	QToolbar,
	QToolbarTitle,
	QPageContainer,
	QPage,
} from "quasar";
</script>
