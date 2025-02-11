import { createStore } from "vuex";
import employeeAPI from "./api";

export default createStore({
	state: {
		employees: [],
		loading: false,
		error: null,
	},
	mutations: {
		SET_EMPLOYEES(state, employees) {
			state.employees = employees;
		},
		ADD_EMPLOYEE(state, employee) {
			state.employees.push(employee);
		},
		UPDATE_EMPLOYEE(state, updatedEmployee) {
			const index = state.employees.findIndex(
				(emp) => emp.id === updatedEmployee.id,
			);
			if (index !== -1) {
				state.employees.splice(index, 1, updatedEmployee);
			}
		},
		DELETE_EMPLOYEE(state, employeeId) {
			state.employees = state.employees.filter((emp) => emp.id !== employeeId);
		},
		SET_LOADING(state, loading) {
			state.loading = loading;
		},
		SET_ERROR(state, error) {
			state.error = error;
		},
	},
	actions: {
		async fetchEmployees({ commit }) {
			commit("SET_LOADING", true);
			try {
				const response = await employeeAPI.fetchEmployees();
				commit("SET_EMPLOYEES", response.data);
			} catch (error) {
				commit("SET_ERROR", error.message);
			} finally {
				commit("SET_LOADING", false);
			}
		},
		async addEmployee({ commit }, employee) {
			commit("SET_LOADING", true);
			try {
				const response = await employeeAPI.createEmployee(employee);
				commit("ADD_EMPLOYEE", response.data);
			} catch (error) {
				commit("SET_ERROR", error.message);
			} finally {
				commit("SET_LOADING", false);
			}
		},
		async updateEmployee({ commit }, employee) {
			commit("SET_LOADING", true);
			try {
				const response = await employeeAPI.updateEmployee(employee);
				commit("UPDATE_EMPLOYEE", response.data);
			} catch (error) {
				commit("SET_ERROR", error.message);
			} finally {
				commit("SET_LOADING", false);
			}
		},
		async deleteEmployee({ commit }, employeeId) {
			commit("SET_LOADING", true);
			try {
				await employeeAPI.deleteEmployee(employeeId);
				commit("DELETE_EMPLOYEE", employeeId);
			} catch (error) {
				commit("SET_ERROR", error.message);
			} finally {
				commit("SET_LOADING", false);
			}
		},
	},
	getters: {
		allEmployees: (state) => state.employees,
		getEmployeeById: (state) => (id) =>
			state.employees.find((emp) => emp.id === id),
	},
});
