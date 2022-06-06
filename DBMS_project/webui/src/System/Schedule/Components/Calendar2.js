import * as React from 'react';
import { Paper, Box, Backdrop, CircularProgress } from '@mui/material';

import { ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    DragDropProvider,
    // EditRecurrenceMenu,
    AppointmentForm,
    ConfirmationDialog,
} from '@devexpress/dx-react-scheduler-material-ui';

import { getAllTimeblock, updateTimeblock } from '../APIs'

export default function Calendar2() {
    const [data, setData] = React.useState([]);
    const [op_count, setOp_count] = React.useState(0);

    const [isBackdropOpen, setIsBackdropOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            setIsBackdropOpen(true);

            const result = await getAllTimeblock();
            await setData(result.map((timeblock)=>{
                return {
                    ...timeblock,
                    id: timeblock.timeblockId,
                    title: timeblock.employeeName,
                    employeeId: timeblock.employeeId,
                    startDate: new Date(timeblock.startTime),
                    endDate: new Date(timeblock.endTime)
                }
            }));
            console.log("fetch result: ", result);
            setIsBackdropOpen(false);
        };

        fetchData();
    }, [op_count]);

    const onCommitChanges = ({ added, changed, deleted }) => {
        const updateData = async(timeblock) => {
            setIsBackdropOpen(true);
            console.log("updateData: ", timeblock);
            const resp = await updateTimeblock(timeblock.timeblockId, timeblock.employeeId, timeblock.employeeName, timeblock.startDate.toISOString(), timeblock.endDate.toISOString());
            setOp_count(op_count + 1);
        };

        console.log("[onCommitChanges] added: ", added);
        console.log("[onCommitChanges] changed: ", changed);
        console.log("[onCommitChanges] deleted: ", deleted);
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            setData([...data, { id: startingAddedId, ...added }])
        }
        if (changed) {
            // setData(data.map(appointment => {
            //     console.log("change: ", { ...appointment, ...changed[appointment.id] })
            //     console.log(changed[appointment.id].startDate.toISOString());
            //     return changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
            // }))

            let newData = data.map(appointment => { return changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment })
            updateData(newData[0]);
        }
        if (deleted !== undefined) {
            setData(data.filter(appointment => appointment.id !== deleted));
        }
    }

    return (
        <Box>

            <Backdrop open={isBackdropOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Paper>
                <Scheduler
                data={data}
                height={660}
                >
                <ViewState/>
                <EditingState
                    onCommitChanges={onCommitChanges}
                />
                <WeekView
                    startDayHour={9}
                    endDayHour={22}
                />
                <Toolbar />
                <DateNavigator />
                <TodayButton />

                <Appointments/>
                <IntegratedEditing />
                <DragDropProvider
                    allowDrag={(e)=>{return e.rRule === undefined}}
                />
                </Scheduler>
        </Paper>
      </Box>
    );
}
