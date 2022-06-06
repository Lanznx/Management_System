import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    WeekView,
    Toolbar,
    DateNavigator,
    Appointments,
    TodayButton,
    DragDropProvider,
    EditRecurrenceMenu,
    AppointmentForm,
    ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';

const appointments = [
    {
      title: "邱德晏",
      startDate: new Date(2022, 5, 7, 9, 15),
      endDate: new Date(2022, 5, 7, 11, 30),
      id: 100,
      rRule: "FREQ=DAILY;COUNT=3",
    },
    {
      title: "邱德晏",
      startDate: new Date(2022, 5, 8, 9, 45),
      endDate: new Date(2022, 5, 8, 11, 15),
      id: 6,
      location: "Room 1",
    },
  ];

const BoolEditor = (props) => {
    return null;
};
const LabelComponent = (props) => {
    if (props.text === 'Details') {
        return <AppointmentForm.Label
        { ...props} 
        text="Precio Modulo"
        />  
    } else if (props.text === 'More Information') {
        return null
    } else if (props.text === '-') {
        return <AppointmentForm.Label
        { ...props}
        />  
    }
};
const InputComponent = (props) => {
    console.log("InputComponent props: ", props);
    if (props.type === 'titleTextEditor') {
        return <AppointmentForm.TextEditor
        { ...props}
        type='numberEditor'
        placeholder='Precio'
        />
    }
};

// cambio el layout
const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
return (
    <AppointmentForm.BasicLayout
    appointmentData={appointmentData}
    onFieldChange={onFieldChange}
    {...restProps}   
    >
    </AppointmentForm.BasicLayout>
);
};

export default function Calendar2() {
    const [data, setData] = React.useState(appointments);
    const [currentDate, setCurrentDate] = React.useState(new Date(2022, 5, 8));

    React.useEffect(() => {
        console.log(data);
    }, [data]);

    const onCommitChanges = ({ added, changed, deleted }) => {
        console.log("added: ", added);
        console.log("changed: ", changed);
        console.log("deleted: ", deleted);
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            setData([...data, { id: startingAddedId, ...added }])
        }
        if (changed) {
            setData(data.map(appointment => (
            changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment)));
        }
        if (deleted !== undefined) {
            setData(data.filter(appointment => appointment.id !== deleted));
        }
      }

    return (
        <Paper>
        <Scheduler
          data={data}
          height={660}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            // currentDate={currentDate}
            // onCurrentDateChange={setCurrentDate}
          />
          <EditingState
            onCommitChanges={onCommitChanges}
          />
          <EditRecurrenceMenu />
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments/>
          <ConfirmationDialog
            ignoreCancel
          />
          <AppointmentForm
            basicLayoutComponent={BasicLayout}
            booleanEditorComponent={BoolEditor}
            labelComponent={LabelComponent}
            textEditorComponent={InputComponent}
          />
          <DragDropProvider
            allowDrag={(e)=>{return e.rRule === undefined}}
          />
        </Scheduler>
      </Paper>
    );
}
