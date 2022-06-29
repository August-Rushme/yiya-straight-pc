<script lang="ts" setup>
import { onMounted, ref, watch } from "vue"
import auForm from "@/base-ui/form"
import "@fullcalendar/core/vdom" // solve problem with Vite
import message from "@/utils/message"
import FullCalendar, { CalendarOptions, EventApi, DateSelectArg, EventClickArg } from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import dayjs from "dayjs"
import { modalConfig } from "./config/form.config"
import { Action, ElMessageBox } from "element-plus"
import { EventInput } from "@fullcalendar/vue3"
import LocalCache from "@/utils/cache"
import { useCalendarStoreHook } from "@/store/modules/calendar"
const store = useCalendarStoreHook()
const titleDate = ref(dayjs().format("YYYY-MM-DD"))
let eventId = 0
const INITIAL_EVENTS: EventInput[] = []
const dialogVisible = ref(false)
const selectInfoRef = ref<any>()
const clickInfoRef = ref<any>()
const formData = ref<any>({})
const currentEvents = ref<EventApi[]>([])
const pageFormRef = ref<InstanceType<typeof auForm>>()
let calendarEventApi: any
const title = ref("新建事件")
// 监听datepicker的选择
watch(titleDate, (val) => {
  calendarEventApi.gotoDate(val)
})
// 新建事件
const handleDateSelect = (selectInfo: DateSelectArg) => {
  title.value = "新建事件"
  selectInfoRef.value = selectInfo
  formData.value.appiontmentTime = [
    dayjs(selectInfoRef.value?.startStr).format("YYYY-MM-DD HH:mm:ss"),
    dayjs(selectInfoRef.value?.endStr).format("YYYY-MM-DD HH:mm:ss")
  ]
  dialogVisible.value = true
}
// 编辑事件
const handleEventClick = (clickInfo: EventClickArg) => {
  title.value = "编辑事件"
  clickInfoRef.value = clickInfo
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
    callback: async (action: Action) => {
      if (action === "confirm") {
        calendarEventApi.getEventById(index).remove()
        store.deleteCalendarEventAction(index)
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
        if (title.value === "新建事件") {
          calendarEventApi?.addEvent({
            id: String(eventId++),
            start: formData.value.appiontmentTime[0],
            end: formData.value.appiontmentTime[1],
            allDay: selectInfoRef.value?.allDay,
            formData: { ...formData.value }
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
          dialogVisible.value = false
          message.success("添加事件成功")
        } else {
          const eventInfo = clickInfoRef.value?.event
          calendarEventApi?.getEventById(eventInfo.id)?.setExtendedProp("formData", { ...formData.value })
          await store.editCalendarEventAction({
            id: parseInt(eventInfo.id),
            startTime: dayjs(eventInfo.extendedProps.formData.appiontmentTime[0]).format("YYYY-MM-DD HH:mm:ss"),
            endTime: dayjs(eventInfo.extendedProps.formData.appiontmentTime[1]).format("YYYY-MM-DD HH:mm:ss"),
            isFullday: selectInfoRef.value?.allDay,
            ...formData.value,
            appointmentStartDate: dayjs(eventInfo.extendedProps.formData.appiontmentTime[0]).format(
              "YYYY-MM-DD HH:mm:ss"
            ),
            appointmentEndDate: dayjs(eventInfo.extendedProps.formData.appiontmentTime[1]).format("YYYY-MM-DD HH:mm:ss")
          })
          dialogVisible.value = false
          message.success("编辑事件成功")
        }
      }
    })
  }
}
// 事件拖拽
const handleDropEvents = async (e: any) => {
  await store.editCalendarEventAction({
    id: parseInt(e.event.id),
    startTime: dayjs(e.event.start).format("YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs(e.event.end).format("YYYY-MM-DD HH:mm:ss"),
    isFullday: e.event.allDay,
    appointmentStartDate: dayjs(e.event.start).format("YYYY-MM-DD HH:mm:ss"),
    appointmentEndDate: dayjs(e.event.end).format("YYYY-MM-DD HH:mm:ss")
  })
  message.success("更新事件成功")
}
// 弹窗关闭
const handleDialogClose = () => {
  pageFormRef.value?.formRef?.resetFields()
}
// 弹窗取消
const handleDialogCancel = () => {
  pageFormRef.value?.formRef?.resetFields()
  dialogVisible.value = false
}
//事件日期改变
const handleResizeEvents = async (e: any) => {
  await store.editCalendarEventAction({
    id: parseInt(e.event.id),
    startTime: dayjs(e.event.start).format("YYYY-MM-DD HH:mm:ss"),
    endTime: dayjs(e.event.end).format("YYYY-MM-DD HH:mm:ss"),
    isFullday: e.event.allDay,
    appointmentStartDate: dayjs(e.event.start).format("YYYY-MM-DD HH:mm:ss"),
    appointmentEndDate: dayjs(e.event.end).format("YYYY-MM-DD HH:mm:ss")
  })
  message.success("更新事件成功")
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
    right: "timeGridDay,timeGridWeek"
  },
  buttonText: {
    today: "今天",
    week: "周视图",
    day: "日视图"
  },
  initialView: "timeGridDay",
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
// 创建日历事件api
const calendar = ref()
onMounted(() => {
  calendarEventApi = calendar.value.calendar
  store.getCalendarEventsAction().then((list) => {
    eventId = list[list.length - 1].id
    calendarEventApi.setOption("events", list)
  })
})
</script>

<template>
  <div class="demo-app">
    <div class="demo-app-main">
      <div class="time-picker">
        <el-date-picker v-model="titleDate" type="date" placeholder="筛选日期" />
      </div>
      <FullCalendar class="demo-app-calendar" ref="calendar" :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <el-popover ref="popover" placement="right" title="详细信息" :width="200" :hide-after="0" trigger="hover">
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
              {{
                arg.event.extendedProps.formData?.appiontmentTime[0]
                  ? dayjs(arg.event.extendedProps.formData?.appiontmentTime[0]).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              }}
              到
              {{
                arg.event.extendedProps.formData?.appiontmentTime[1]
                  ? dayjs(arg.event.extendedProps.formData?.appiontmentTime[1]).format("YYYY-MM-DD HH:mm:ss")
                  : ""
              }}
            </div>
            <div>患者性别: {{ arg.event.extendedProps.formData?.patientGender }}</div>
            <div>患者手机号: {{ arg.event.extendedProps.formData?.patientPhone }}</div>
            <div>备注: {{ arg.event.extendedProps.formData?.remark }}</div>
          </el-popover>
        </template>
      </FullCalendar>
    </div>

    <el-dialog v-model="dialogVisible" :title="title" center @close="handleDialogClose">
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

<style lang="scss" scoped>
.fc .fc-popover {
  z-index: 999;
}
.fc .fc-timegrid-slot {
  height: 4em;
}
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
  position: relative;
  flex-grow: 1;
  padding: 3em;
  .time-picker {
    position: absolute;
    top: 44px;
    left: 22%;
  }
}
.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}
</style>
