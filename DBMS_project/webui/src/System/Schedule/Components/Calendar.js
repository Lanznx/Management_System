import * as React from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  Appointments,
  DragDropProvider,
  EditRecurrenceMenu,
  AllDayPanel,
  Toolbar,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";

const recurrenceAppointments = [
  {
    title: "邱德晏",
    startDate: new Date(2022, 4, 25, 9, 15),
    endDate: new Date(2022, 4, 25, 11, 30),
    id: 100,
    rRule: "FREQ=DAILY;COUNT=3",
  },
  {
    title: "張簡",
    startDate: new Date(2022, 4, 25, 12, 11),
    endDate: new Date(2022, 4, 25, 13, 0),
    id: 101,
    rRule: "FREQ=DAILY;COUNT=4",
  },
  {
    title: "呂安",
    startDate: new Date(2022, 4, 25, 13, 30),
    endDate: new Date(2022, 4, 25, 14, 35),
    id: 102,
  },
  {
    title: "鄭宇傑",
    startDate: new Date(2022, 4, 26, 10, 0),
    endDate: new Date(2022, 4, 26, 11, 0),
    id: 3,
  },
  {
    title: "邱品硯",
    startDate: new Date(2022, 4, 27, 11, 45),
    endDate: new Date(2022, 4, 27, 13, 20),
    id: 4,
  },
  {
    title: "邱德晏",
    startDate: new Date(2022, 4, 26, 14, 40),
    endDate: new Date(2022, 4, 26, 15, 45),
    id: 5,
    location: "Room 2",
  },
  {
    title: "邱德晏",
    startDate: new Date(2022, 4, 28, 9, 45),
    endDate: new Date(2022, 4, 28, 11, 15),
    id: 6,
    location: "Room 1",
  },
  {
    title: "邱德晏",
    startDate: new Date(2022, 4, 29, 11, 45),
    endDate: new Date(2022, 4, 29, 13, 4),
    id: 7,
  },
  {
    title: "邱德晏",
    startDate: new Date(2022, 4, 29, 10, 0),
    endDate: new Date(2022, 4, 29, 11, 30),
    id: 12,
  },
];

const dragDisableIds = new Set([3, 8, 10, 12]);

const allowDrag = ({ id }) => !dragDisableIds.has(id);
const appointmentComponent = (props) => {
  if (allowDrag(props.data)) {
    return <Appointments.Appointment {...props} />;
  }
  return (
    <Appointments.Appointment
      {...props}
      style={{ ...props.style, cursor: "not-allowed" }}
    />
  );
};

export default class Calendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: recurrenceAppointments,
      currentDate: new Date(),
    };

    this.onCommitChanges = this.commitChanges.bind(this);
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const {
      data,
      currentDate,
      shadePreviousCells,
      updateInterval,
      shadePreviousAppointments,
    } = this.state;

    const day = new Date(2022, 4, 26, 10, 0)
    console.log(day)

    return (
      <Paper
        sx={{
          maxWidth: "1200px",
        }}
      >
        <Scheduler data={data} height={720}>
          <ViewState defaultCurrentDate={currentDate} />
          <EditingState onCommitChanges={this.onCommitChanges} />
          <EditRecurrenceMenu />
          <WeekView startDayHour={8.5} endDayHour={21.5} />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <DayView />
          <Appointments appointmentComponent={appointmentComponent} />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
          <AppointmentForm />

          <AllDayPanel />
          <DragDropProvider allowDrag={allowDrag} />
          <CurrentTimeIndicator
            shadePreviousCells={shadePreviousCells}
            shadePreviousAppointments={shadePreviousAppointments}
            updateInterval={updateInterval}
          />
        </Scheduler>
      </Paper>
    );
  }
}
