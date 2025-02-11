import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const api = axios.create({
	baseURL: "http://localhost:3000/api",
});

const mock = new MockAdapter(api, { delayResponse: 1000 });

const testDeleteUserId = 1739300622052;
let employees = [
	{
		id: testDeleteUserId,
		name: "TRY DELETE ME",
		department: "DELETE ME",
		age: 30,
		salary: 60000,
		location: "DELETE ME",
		gender: "DELETE ME",
	},
	{
		id: 1739300622051,
		name: "Jane Smith",
		department: "Marketing",
		age: 28,
		salary: 50000,
		location: "San Francisco",
		gender: "Female",
	},
];

mock.onGet("/employees").reply(200, employees);

mock.onPost("/employees").reply((config) => {
	const employee = JSON.parse(config.data);
	employee.id = Date.now();
	employees.push(employee);
	return [200, employee];
});

mock.onPut(/\/employees\/\d+/).reply((config) => {
	const updatedEmployee = JSON.parse(config.data);
	employees = employees.map((emp) =>
		emp.id === updatedEmployee.id ? updatedEmployee : emp,
	);
	return [200, updatedEmployee];
});

mock.onDelete(/\/employees\/\d+/).reply((config) => {
	const id = Number.parseInt(config.url.split("/").pop(), 10);
	const employee = employees.find((emp) => emp.id === id);
	if (employee?.id === testDeleteUserId) {
		return [500, { message: "Deletion error: Cannot delete John Doe" }];
	}
	employees = employees.filter((emp) => emp.id !== id);
	return [200, {}];
});

export default {
	fetchEmployees() {
		return api.get("/employees");
	},
	createEmployee(employee) {
		return api.post("/employees", employee);
	},
	updateEmployee(employee) {
		return api.put(`/employees/${employee.id}`, employee);
	},
	deleteEmployee(employeeId) {
		return api.delete(`/employees/${employeeId}`);
	},
};
