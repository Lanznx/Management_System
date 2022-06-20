import axio from "axios";

async function getAllEmployee() {
    const result = await axio.post("https://nccu-dbms-team11.herokuapp.com/schedule/getAllEmployee", {
        userId: localStorage.getItem("id_token")
    });
    return result.data.result;
}

async function updateEmployee(employeeId, employeeName, employeeUnitSalary) {
    const result = await axio.post("https://nccu-dbms-team11.herokuapp.com/schedule/updateEmployee", {
        userId: localStorage.getItem("id_token"),
        employeeId: employeeId,
        employeeName: employeeName,
        employeeUnitSalary: employeeUnitSalary
    });
    return result.data.message;
}

async function addNewEmployee(employeeName, employeeUnitSalary) {
    const result = await axio.post("https://nccu-dbms-team11.herokuapp.com/schedule/addNewEmployee", {
        userId: localStorage.getItem("id_token"),
        employeeName: employeeName,
        employeeUnitSalary: employeeUnitSalary
    });
    return result.data.message;
}

async function deleteEmployee(employeeId) {
    const result = await axio.post("https://nccu-dbms-team11.herokuapp.com/schedule/deleteEmployee", {
        userId: localStorage.getItem("id_token"),
        employeeId: employeeId
    });
    return result.data.message;
}

export { 
    getAllEmployee,
    addNewEmployee,
    updateEmployee,
    deleteEmployee,
 };