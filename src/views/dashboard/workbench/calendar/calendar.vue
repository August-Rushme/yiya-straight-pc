<script lang="ts" setup>
import { ref } from "vue"
import auForm from "@/base-ui/form"
import "@fullcalendar/core/vdom" // solve problem with Vite
import message from "@/utils/message"
import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import dayjs from "dayjs"
import { INITIAL_EVENTS, createEventId, store } from "./event-utils"
import { modalConfig } from "./config/form.config"
import { Action, ElMessageBox } from "element-plus"
import LocalCache from "@/utils/cache"
console.log(INITIAL_EVENTS)
const dialogVisible = ref(false)
const selectInfoRef = ref<DateSelectArg>()
const formData = ref<any>({})
const currentEvents = ref<EventApi[]>([])
const pageFormRef = ref<InstanceType<typeof auForm>>()

let calendarEventApi: any
const title = ref("新建事件")
// 编辑事件ID
const editId = ref()
// 新建事件
const handleDateSelect = (selectInfo: DateSelectArg) => {
  title.value = "新建事件"
  selectInfoRef.value = selectInfo
  dialogVisible.value = true
}
// 编辑事件
const handleEventClick = (clickInfo: EventClickArg) => {
  title.value = "编辑事件"
  editId.value = parseInt(clickInfo.event.id)
  for (let key in clickInfo.event.extendedProps.formData) {
    formData.value[key] = clickInfo.event.extendedProps.formData[key]
  }
  dialogVisible.value = true
}
// 删除事件
const removeEvents = (e: any, id: string) => {
  e.stopPropagation()
  const index = parseInt(id)
  ElMessageBox.alert("是否删除该日历事件", "提示", {
    confirmButtonText: "是",
    showCancelButton: true,
    callback: (action: Action) => {
      if (action === "confirm") {
        calendarEventApi.getEventById(index).remove()
        message.success("删除成功")
      } else {
        message.info("删除被取消")
      }
    }
  })
}
// 事件更新
const handleEvents = (events: EventApi[]) => {
  currentEvents.value = events
}
// 提交事件
const handleDialogConfirm = () => {
  if (pageFormRef.value) {
    pageFormRef.value.formRef?.validate(async (validate) => {
      if (!validate) {
        return message.error("请正确填写表单")
      } else {
        const calendarApi = selectInfoRef.value?.view.calendar
        calendarApi?.unselect()

        if (!calendarEventApi) {
          calendarEventApi = calendarApi
        }
        if (title.value === "新建事件") {
          console.log(typeof selectInfoRef.value?.startStr)
          calendarApi?.addEvent({
            id: createEventId(),
            start: selectInfoRef.value?.startStr,
            end: selectInfoRef.value?.endStr,
            allDay: selectInfoRef.value?.allDay,
            formData: formData.value
          })
          await store.createCalendarEventAction({
            startTime: dayjs(selectInfoRef.value?.startStr).format("YYYY-MM-DD HH:mm:ss"),
            endTime: dayjs(selectInfoRef.value?.endStr).format("YYYY-MM-DD HH:mm:ss"),
            clinicId: LocalCache.getCache("userInfo").clinicId,
            isFullday: selectInfoRef.value?.allDay,
            ...formData.value,
            appointmentStartDate: dayjs(formData.value.appiontmentTime[0]).format("YYYY-MM-DD HH:mm:ss"),
            appointmentEndDate: dayjs(formData.value.appiontmentTime[1]).format("YYYY-MM-DD HH:mm:ss")
          })
          formData.value = ref()
          pageFormRef.value?.rerestFormDate()
          dialogVisible.value = false
          message.success("添加事件成功")
        } else {
          calendarApi?.getEventById(editId.value)?.setExtendedProp("formData", formData.value)
          formData.value = ref()
          pageFormRef.value?.rerestFormDate()
          dialogVisible.value = false
          message.success("编辑事件成功")
        }
      }
    })
  }
}

// 事件拖拽
const handleDropEvents = (e: any) => {
  console.log(e)
}

// 弹窗取消
const handleDialogCancel = () => {
  formData.value = ref()
  pageFormRef.value?.rerestFormDate()
  dialogVisible.value = false
}
//事件日期改变
const handleResizeEvents = (e: any) => {
  console.log(e)
}
// 日历配置
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
  eventResize: handleResizeEvents,
  eventsSet: handleEvents,
  eventDrop: handleDropEvents
})
</script>

<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <FullCalendar class="demo-app-calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <el-popover ref="popover" placement="right" title="详细信息" :width="200" trigger="hover">
            <template #reference>
              <div flex-y-center relative style="min-height: 4em; height: 100%">
                <span class="circle" :style="{ 'background-color': !!arg.timeText ? '#21b3a9' : '#ffd55f' }" />
                <b>{{ arg.timeText }}</b> <i>{{ arg.event.extendedProps.formData?.patientName }}</i>
                <span pl-3>
                  {{ arg.event.extendedProps.formData?.patientGender }}
                </span>
                <span class="eventClose" @click="removeEvents($event, arg.event.id)">
                  <el-icon :size="15"><CircleClose /></el-icon
                ></span>
              </div>
            </template>
            <div>患者姓名: {{ arg.event.extendedProps.formData?.patientName }}</div>
            <div>医生姓名: {{ arg.event.extendedProps.formData?.doctorName }}</div>
            <div>
              预约时间:
              {{ dayjs(arg.event.extendedProps.formData?.appiontmentTime[0]).format("YYYY-MM-DD HH:mm:ss") }} 到
              {{ dayjs(arg.event.extendedProps.formData?.appiontmentTime[1]).format("YYYY-MM-DD HH:mm:ss") }}
            </div>
            <div>患者性别: {{ arg.event.extendedProps.formData?.patientGender }}</div>
            <div>患者手机号: {{ arg.event.extendedProps.formData?.patientPhone }}</div>
            <div>备注: {{ arg.event.extendedProps.formData?.remark }}</div>
          </el-popover>
        </template>
      </FullCalendar>
    </div>

    <el-dialog v-model="dialogVisible" :title="title" center @close="handleDialogCancel">
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
.fc .fc-popover {
  z-index: 999;
}
.fc .fc-timegrid-slot {
  height: 4em;
}
/* :root {
  --fc-today-bg-color: var(--el-color-info-light-3);
} */
.fc .fc-daygrid-event > span {
  display: block !important;
  width: 100%;
}
.circle {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 3px;
}
.eventClose {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0px;
}
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
  min-height: 100vh;
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
