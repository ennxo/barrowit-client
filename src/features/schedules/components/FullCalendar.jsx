import Calendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

export const FullCalendar  = ({events}) => {
    return (
      <div className="mt-10">
        <Calendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        defaultRangeSeparator=" - "
        initialView="dayGridMonth"
        height="100vh"
        displayEventTime={true}
        displayEventEnd={true}
        aspectRatio={1.5}
        expandRows={true}
        slotEventOverlap={false}
        slotMinWidth={100}
        eventMaxStack={true}
        dayMaxEventRows={5}
        events={events}
        eventOverlap={false}
        eventMinWidth={100}
        eventMinHeight={100}
        eventTimeFormat={{
          hour: 'numeric',
          minute: '2-digit',
          meridiem: 'short'
        }}
        handleWindowResize={true}
        headerToolbar={{
          start: "prev,next,today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
      </div>
     )
}