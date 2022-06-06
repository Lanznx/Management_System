import axios from "axios";

async function getAllTimeblock() {
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/schedule/getAllTimeblock", {
        userId: localStorage.getItem("id_token")
    });
    return result.data.result;
}

async function updateTimeblock(timeblockId, employeeId, employeeName, startTime, endTime) {
    const result = await axios.post("https://nccu-dbms-team11.herokuapp.com/schedule/updateTimeblock", {
        userId: localStorage.getItem("id_token"),
        timeblockId: timeblockId,
        employeeId: employeeId,
        employeeName: employeeName,
        startTime: startTime,
        endTime: endTime
    });
    return result.data.message;
}

export { getAllTimeblock, updateTimeblock };