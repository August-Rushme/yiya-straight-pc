<script lang="ts" setup>
import { ref } from "vue"
import auForm from "@/base-ui/form"
import "@fullcalendar/core/vdom" // solve problem with Vite
import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { INITIAL_EVENTS, createEventId } from "./event-utils"
import { modalConfig } from "./config/form.config"
import { IFormItem } from "@/base-ui/form"
const dialogVisible = ref(false)
const selectInfoRef = ref<DateSelectArg>()
const formData = ref<IFormItem[]>({})
const currentEvents = ref<EventApi[]>([])
const pageFormRef = ref<InstanceType<typeof auForm>>()
// const handleWeekendsToggle = () => {
//   calendarOptions.value.weekends = !calendarOptions.value.weekends // update a property
// }
const handleDateSelect = (selectInfo: DateSelectArg) => {
  console.log(createEventId)
  selectInfoRef.value = selectInfo
  dialogVisible.value = true
  // let title = prompt("Please enter a new title for your event")
  // let calendarApi = selectInfo.view.calendar
  // calendarApi.unselect() // clear date selection
  // if (title) {
  //   calendarApi.addEvent({
  //     id: createEventId(),
  //     title,
  //     start: selectInfo.startStr,
  //     end: selectInfo.endStr,
  //     allDay: selectInfo.allDay
  //   })
  // }
}

const handleEventClick = (clickInfo: EventClickArg) => {
  if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    clickInfo.event.remove()
  }
}
const handleEvents = (events: EventApi[]) => {
  currentEvents.value = events
}
const handleDialogConfirm = () => {
  console.log(pageFormRef.value)
}
const handleDialogCancel = () => {
  dialogVisible.value = false
}
const calendarOptions = ref<CalendarOptions>({
  plugins: [
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin // needed for dateClick
  ],
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay"
  },
  buttonText: {
    today: "今天",
    month: "月视图",
    week: "周视图",
    day: "日视图"
  },
  initialView: "dayGridMonth",
  initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
  editable: true,
  selectable: true,
  selectMirror: true,
  locale: "zh-cn",
  dayMaxEvents: true,
  weekends: true,
  select: handleDateSelect,
  eventClick: handleEventClick,
  eventsSet: handleEvents
  /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
})
</script>

<template>
  <div class="demo-app">
    <!-- <div class="demo-app-sidebar">
      <div class="demo-app-sidebar-section">
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class="demo-app-sidebar-section">
        <label>
          <input type="checkbox" :checked="calendarOptions.weekends" @change="handleWeekendsToggle" />
          toggle weekends
        </label>
      </div>
      <div class="demo-app-sidebar-section">
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for="event in currentEvents" :key="event.id">
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div> -->
    <div class="demo-app-main">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
    <el-dialog v-model="dialogVisible" center>
      <auForm v-bind="modalConfig" v-model="formData" ref="pageFormRef" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDialogCancel">取消</el-button>
          <el-button type="primary" @click="handleDialogConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="css">
/* :root {
  --fc-today-bg-color: var(--el-color-info-light-3);
} */
h2 {
  margin: 0;
  font-size: 16px;
}
ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}
li {
  margin: 1.5em 0;
  padding: 0;
}
b {
  /* used for event dates/times */
  margin-right: 3px;
}
.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}
.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
