import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Button, Eventcalendar, formatDate, Popup, setOptions, Toast, localeEs } from '@mobiscroll/react';
import { useCallback, useMemo, useRef, useState } from 'react';

setOptions({
  locale: localeEs,
  theme: 'ios',
  themeVariant: 'light'
});

const doctors = [
  { id: 1, name: 'Dr. Breanne Lorinda', color: '#b33d3d' },
  { id: 2, name: 'Dr. Ryan Melicent', color: '#309346' },
  { id: 3, name: 'Dr. Meredith Chantelle', color: '#c77c0a' },
];

const defaultAppointments = [
  {
    title: 'Jude Chester',
    age: 69,
    start: '2025-04-13T08:00',
    end: '2025-04-13T08:45',
    confirmed: false,
    reason: 'Headaches morning & afternoon',
    location: 'Topmed, Building A, Room 203',
    resource: 1,
  },
  {
    title: 'Leon Porter',
    age: 44,
    start: '2025-04-13T09:00',
    end: '2025-04-13T09:45',
    confirmed: false,
    reason: 'Left abdominal pain',
    location: 'Topmed, Building D, Room 360',
    resource: 1,
  },
  {
    title: 'Merv Kenny',
    age: 56,
    start: '2025-04-13T10:00',
    end: '2025-04-13T10:45',
    confirmed: true,
    reason: 'Itchy, red rashes',
    location: 'Topmed, Building D, Room 360',
    resource: 1,
  },
  {
    title: 'Derek Austyn',
    age: 72,
    start: '2025-04-13T13:00',
    end: '2025-04-13T13:45',
    confirmed: false,
    reason: 'Nausea & weakness',
    location: 'Rose Medical Center, Room 18',
    resource: 1,
  },
  {
    title: 'Jenifer Kalyn',
    age: 65,
    start: '2025-04-13T14:00',
    end: '2025-04-13T14:45',
    confirmed: true,
    reason: 'Cough & fever',
    location: 'Rose Medical Center, Room 18',
    resource: 1,
  },
  {
    title: 'Lily Racquel',
    age: 54,
    start: '2025-04-13T10:00',
    end: '2025-04-13T10:45',
    confirmed: true,
    reason: 'Dry, persistent cough & headache',
    location: 'Procare, Building C, Room 12',
    resource: 2,
  },
  {
    title: 'Mia Sawyer',
    age: 59,
    start: '2025-04-13T11:00',
    end: '2025-04-13T11:45',
    confirmed: true,
    reason: 'Difficulty sleeping & loss of appetite',
    location: 'Procare, Building C, Room 12',
    resource: 2,
  },
  {
    title: 'Fred Valdez',
    age: 62,
    start: '2025-04-13T15:00',
    end: '2025-04-13T15:45',
    confirmed: false,
    reason: 'High blood pressure',
    location: 'Procare, Building C, Room 40',
    resource: 2,
  },
  {
    title: 'Sylvia Cale',
    age: 41,
    start: '2025-04-13T08:00',
    end: '2025-04-13T08:45',
    confirmed: false,
    reason: 'Fever & sore throat',
    location: 'MedStar, Building A, Room 1',
    resource: 3,
  },
  {
    title: 'Isadora Lyric',
    age: 30,
    start: '2025-04-13T09:00',
    end: '2025-04-13T09:45',
    confirmed: false,
    reason: 'Constant tiredness & weakness',
    location: 'MedStar, Building A, Room 1',
    resource: 3,
  },
  {
    title: 'Jon Candace',
    age: 63,
    start: '2025-04-13T12:00',
    end: '2025-04-13T12:45',
    confirmed: true,
    reason: 'Nausea & weakness',
    location: 'MedStar, Building A, Room 1',
    resource: 3,
  },
  {
    title: 'Layton Drake',
    age: 57,
    start: '2025-04-13T13:00',
    end: '2025-04-13T13:45',
    confirmed: true,
    reason: 'Headaches & loss of appetite',
    location: 'Vitalife, Room 160',
    resource: 3,
  },
  {
    title: 'Florence Amy',
    age: 73,
    start: '2025-04-13T14:00',
    end: '2025-04-13T14:45',
    confirmed: false,
    reason: 'Dry, persistent cough & headache',
    location: 'Vitalife, Room 160',
    resource: 3,
  },
  {
    title: 'Willis Kane',
    age: 44,
    start: '2025-04-14T08:00',
    end: '2025-04-14T08:45',
    confirmed: true,
    reason: 'Back pain',
    location: 'Care Cente, Room 320r',
    resource: 1,
  },
  {
    title: 'Theo Calanthia',
    age: 60,
    start: '2025-04-14T09:00',
    end: '2025-04-14T09:45',
    confirmed: true,
    reason: 'Anxiousness & sleeping disorder',
    location: 'Care Center, Room 320',
    resource: 1,
  },
  {
    title: 'Ford Kaiden',
    age: 53,
    start: '2025-04-14T14:00',
    end: '2025-04-14T14:45',
    confirmed: true,
    reason: 'Nausea & vomiting',
    location: 'Care Center, Room 206',
    resource: 1,
  },
  {
    title: 'Jewell Ryder',
    age: 75,
    start: '2025-04-14T15:00',
    end: '2025-04-14T15:45',
    confirmed: false,
    reason: 'High blood pressure',
    location: 'Care Center, Room 206',
    resource: 1,
  },
  {
    title: 'Antonia Cindra',
    age: 48,
    start: '2025-04-14T12:00',
    end: '2025-04-14T12:45',
    confirmed: true,
    reason: 'Dry, persistent cough',
    location: 'Medica Zone, Building C, Room 2',
    resource: 3,
  },
  {
    title: 'Gerry Irma',
    age: 50,
    start: '2025-04-14T13:00',
    end: '2025-04-14T13:45',
    confirmed: false,
    reason: 'Fever & sore throat',
    location: 'Medica Zone, Building C, Room 2',
    resource: 3,
  },
  {
    title: 'Carlyn Dorothy',
    age: 36,
    start: '2025-04-14T14:00',
    end: '2025-04-14T14:45',
    confirmed: true,
    reason: 'Tiredness & muscle pain',
    location: 'Medica Zone, Building C, Room 2',
    resource: 3,
  },
  {
    title: 'Alma Potter',
    age: 74,
    start: '2025-04-12T10:00',
    end: '2025-04-12T10:45',
    confirmed: true,
    reason: 'High blood pressure',
    location: 'Vitacure, Building D, Room 2',
    resource: 1,
  },
  {
    title: 'Debra Aguilar',
    age: 47,
    start: '2025-04-12T11:00',
    end: '2025-04-12T11:45',
    confirmed: false,
    reason: 'Fever & sore throat',
    location: 'Vitacure, Building D, Room 2',
    resource: 1,
  },
  {
    title: 'Tommie Love',
    age: 42,
    start: '2025-04-12T12:00',
    end: '2025-04-12T12:45',
    confirmed: false,
    reason: 'Dry, persistent cough & headache',
    location: 'Vitacure, Building D, Room 2',
    resource: 1,
  },
  {
    title: 'Marjorie White',
    age: 55,
    start: '2025-04-12T13:00',
    end: '2025-04-12T13:45',
    confirmed: true,
    reason: 'Back pain',
    location: 'Vitacure, Building D, Room 2',
    resource: 1,
  },
  {
    title: 'Brandon Perkins',
    age: 68,
    start: '2025-04-12T14:00',
    end: '2025-04-12T14:45',
    confirmed: true,
    reason: 'Swollen ankles',
    location: 'Vitacure, Building D, Room 2',
    resource: 1,
  },
  {
    title: 'Lora Wilson',
    age: 66,
    start: '2025-04-12T15:00',
    end: '2025-04-12T15:45',
    confirmed: false,
    reason: 'Fever & headache',
    location: 'Vitacure, Building D, Room 2',
    resource: 1,
  },
  {
    title: 'Ismael Bates',
    age: 58,
    start: '2025-04-12T08:00',
    end: '2025-04-12T08:45',
    confirmed: false,
    reason: 'Tiredness & muscle pain',
    location: 'Care Center, Room 300',
    resource: 2,
  },
  {
    title: 'Archie Wilkins',
    age: 69,
    start: '2025-04-12T09:00',
    end: '2025-04-12T09:45',
    confirmed: true,
    reason: 'Fever & headache',
    location: 'Care Center, Room 300',
    resource: 2,
  },
  {
    title: 'Christie Baker',
    age: 71,
    start: '2025-04-12T10:00',
    end: '2025-04-12T10:45',
    confirmed: true,
    reason: 'Headaches morning & afternoon',
    location: 'Care Center, Room 300',
    resource: 2,
  },
  {
    title: 'Laura Shelton',
    age: 45,
    start: '2025-04-12T12:00',
    end: '2025-04-12T12:45',
    confirmed: false,
    reason: 'Dry, persistent cough',
    location: 'Care Center, Room 300',
    resource: 2,
  },
  {
    title: 'Mary Hudson',
    age: 77,
    start: '2025-04-12T09:00',
    end: '2025-04-12T09:45',
    confirmed: true,
    reason: 'Fever & sore throat',
    location: 'Medica Zone, Room 45',
    resource: 3,
  },
  {
    title: 'Ralph Rice',
    age: 64,
    start: '2025-04-12T10:00',
    end: '2025-04-12T10:45',
    confirmed: true,
    reason: 'Left abdominal pain',
    location: 'Medica Zone, Room 45',
    resource: 3,
  },
  {
    title: 'Marc Hoffman',
    age: 53,
    start: '2025-04-12T12:00',
    end: '2025-04-12T12:45',
    confirmed: true,
    reason: 'Dry, persistent cough & headache',
    location: 'Medica Zone, Room 45',
    resource: 3,
  },
  {
    title: 'Arlene Lyons',
    age: 41,
    start: '2025-04-12T14:00',
    end: '2025-04-12T14:45',
    confirmed: true,
    reason: 'Nausea & weakness',
    location: 'Care Center, Room 202',
    resource: 3,
  },
  {
    title: 'Thelma Shaw',
    age: 26,
    start: '2025-04-12T15:00',
    end: '2025-04-12T15:45',
    confirmed: true,
    reason: 'Anxiousness & sleeping disorder',
    location: 'Care Center, Room 202',
    resource: 3,
  },
  {
    title: 'Dory Edie',
    age: 45,
    start: '2025-04-11T09:00',
    end: '2025-04-11T09:45',
    confirmed: true,
    reason: 'Right abdominal pain',
    location: 'Vitacure, Building A, Room 203',
    resource: 2,
  },
  {
    title: 'Kaylin Toni',
    age: 68,
    start: '2025-04-11T10:00',
    end: '2025-04-11T10:45',
    confirmed: true,
    reason: 'Itchy, red rashes',
    location: 'Vitacure, Building A, Room 203',
    resource: 2,
  },
  {
    title: 'Gray Kestrel',
    age: 60,
    start: '2025-04-11T12:00',
    end: '2025-04-11T12:45',
    confirmed: true,
    reason: 'Cough & fever',
    location: 'Vitacure, Building A, Room 203',
    resource: 2,
  },
  {
    title: 'Reg Izabelle',
    age: 41,
    start: '2025-04-11T14:00',
    end: '2025-04-11T14:45',
    confirmed: true,
    reason: 'Fever & headache',
    location: 'Medica Zone, Room 13',
    resource: 2,
  },
  {
    title: 'Lou Andie',
    age: 76,
    start: '2025-04-11T15:00',
    end: '2025-04-11T15:45',
    confirmed: true,
    reason: 'High blood pressure',
    location: 'Medica Zone, Room 13',
    resource: 2,
  },
  {
    title: 'Yancy Dustin',
    age: 52,
    start: '2025-04-11T10:00',
    end: '2025-04-11T10:45',
    confirmed: true,
    reason: 'Fever & headache',
    location: 'Vitacure, Building E, Room 50',
    resource: 3,
  },
  {
    title: 'Terry Clark',
    age: 78,
    start: '2025-04-11T11:00',
    end: '2025-04-11T11:45',
    confirmed: true,
    reason: 'Swollen ankles',
    location: 'Vitacure, Building E, Room 50',
    resource: 3,
  },
];

export default function MisGrupos() {
    const [appointments, setAppointments] = useState(defaultAppointments);
    const [appointment, setAppointment] = useState();
    const [appointmentInfo, setAppointmentInfo] = useState('');
    const [appointmentLocation, setAppointmentLocation] = useState('');
    const [appointmentReason, setAppointmentReason] = useState('');
    const [appointmentStatus, setAppointmentStatus] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [buttonType, setButtonType] = useState('');
    const [isTooltipOpen, setTooltipOpen] = useState(false);
    const [isToastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [tooltipAnchor, setTooltipAnchor] = useState(null);
    const [tooltipColor, setTooltipColor] = useState('');
  
    const timer = useRef(null);
  
    const myView = useMemo(
      () => ({
        schedule: {
          type: 'week',
          startDay: 1,
          endDay: 5,
          startTime: '08:00',
          endTime: '16:00',
          allDay: false,
        },
      }),
      [],
    );
  
    const openTooltip = useCallback((args) => {
      const event = args.event;
      const doctor = args.resourceObj;
      const time = formatDate('hh:mm A', new Date(event.start)) + ' - ' + formatDate('hh:mm A', new Date(event.end));
  
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
  
      if (event.confirmed) {
        setAppointmentStatus('Confirmed');
        setButtonText('Cancel appointment');
        setButtonType('warning');
      } else {
        setAppointmentStatus('Canceled');
        setButtonText('Confirm appointment');
        setButtonType('success');
      }
  
      setAppointment(event);
      setAppointmentInfo(event.title + ', Age: ' + event.age);
      setAppointmentLocation(event.location);
      setAppointmentTime(time);
      setAppointmentReason(event.reason);
      setTooltipColor(doctor.color);
      setTooltipAnchor(args.domEvent.target.closest('.mbsc-schedule-event'));
      setTooltipOpen(true);
    }, []);
  
    const handleEventClick = useCallback(
      (args) => {
        openTooltip(args);
      },
      [openTooltip],
    );
  
    const handleEventDragStart = useCallback(() => {
      setTooltipOpen(false);
    }, []);
  
    const handleEventHoverIn = useCallback(
      (args) => {
        openTooltip(args);
      },
      [openTooltip],
    );
  
    const handleEventHoverOut = useCallback(() => {
      if (!timer.current) {
        timer.current = setTimeout(() => {
          setTooltipOpen(false);
        }, 200);
      }
    }, []);
  
    const handleMouseEnter = useCallback(() => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }, []);
  
    const handleMouseLeave = useCallback(() => {
      timer.current = setTimeout(() => {
        setTooltipOpen(false);
      }, 200);
    }, []);
  
    const handleTooltipClose = useCallback(() => {
      setTooltipOpen(false);
    }, []);
  
    const handleToastClose = useCallback(() => {
      setToastOpen(false);
    }, []);
  
    const updateAppointmentStatus = useCallback(() => {
      appointment.confirmed = !appointment.confirmed;
      setTooltipOpen(false);
      setToastMessage('Appointment ' + (appointment.confirmed ? 'confirmed' : 'canceled'));
      setToastOpen(true);
    }, [appointment]);
  
    const viewAppointmentFile = useCallback(() => {
      setTooltipOpen(false);
      setToastMessage('View file');
      setToastOpen(true);
    }, []);
  
    const deleteAppointment = useCallback(() => {
      setAppointments(appointments.filter((item) => item.id !== appointment.id));
      setTooltipOpen(false);
      setToastMessage('Appointment deleted');
      setToastOpen(true);
    }, [appointments, appointment]);
  
    return (
      <>
        <Eventcalendar
          clickToCreate={false}
          dragToCreate={false}
          dragToMove={true}
          dragToResize={false}
          data={appointments}
          resources={doctors}
          showEventTooltip={false}
          view={myView}
          onEventClick={handleEventClick}
          onEventDragStart={handleEventDragStart}
          onEventHoverIn={handleEventHoverIn}
          onEventHoverOut={handleEventHoverOut}
        />
        <Popup
          anchor={tooltipAnchor}
          contentPadding={false}
          display="anchored"
          isOpen={isTooltipOpen}
          scrollLock={false}
          showOverlay={false}
          touchUi={false}
          width={350}
          onClose={handleTooltipClose}
        >
          <div className="mds-tooltip" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="mds-tooltip-header" style={{ backgroundColor: tooltipColor }}>
              <span>{appointmentInfo}</span>
              <span className="mbsc-pull-right">{appointmentTime}</span>
            </div>
            <div className="mbsc-padding">
              <div className="mds-tooltip-label mbsc-margin">
                Status: <span className="mbsc-light">{appointmentStatus}</span>
                <Button color={buttonType} variant="outline" className="mds-tooltip-button mbsc-pull-right" onClick={updateAppointmentStatus}>
                  {buttonText}
                </Button>
              </div>
              <div className="mds-tooltip-label mbsc-margin">
                Reason for visit: <span className="mbsc-light">{appointmentReason}</span>
              </div>
              <div className="mds-tooltip-label mbsc-margin">
                Location: <span className="mbsc-light">{appointmentLocation}</span>
              </div>
              <Button color="secondary" className="mds-tooltip-button" onClick={viewAppointmentFile}>
                View patient file
              </Button>
              <Button color="danger" variant="outline" className="mds-tooltip-button mbsc-pull-right" onClick={deleteAppointment}>
                Delete appointment
              </Button>
            </div>
          </div>
        </Popup>
        <Toast isOpen={isToastOpen} message={toastMessage} onClose={handleToastClose} />
      </>
    );
}
