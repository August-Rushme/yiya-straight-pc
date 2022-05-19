import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

/** 格式化时间 */
export const formatDateTime = (time: any) => {
  if (time == null || time === "") {
    return "N/A"
  }
  const date = new Date(time)
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"
export function formatUtcTime(utcTime: string, format: string = DATE_TIME_FORMAT) {
  return dayjs.utc(utcTime).utcOffset(8).format(format)
}
