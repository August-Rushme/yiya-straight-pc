import { IForm } from "@/base-ui/form"
export const detailsConfig: IForm = {
  formItems: [
    {
      field: "clinic",
      type: "text",
      label: "诊所名称:"
    },
    {
      field: "userName",
      type: "text",
      label: "姓名:"
    },
    {
      field: "gender",
      type: "text",
      label: "性别:"
    },
    {
      field: "phone",
      type: "text",
      label: "联系电话:"
    },
    {
      field: "skills",
      type: "text",
      label: "擅长技能:"
    },
    {
      field: "practiceDuration",
      type: "text",
      label: "执业时时长:"
    },
    {
      field: "certificate",
      type: "image",
      label: "医师职格证:",
      otherOptions: {
        style: {
          width: "140px",
          height: "100px"
        }
      }
    },
    {
      field: "idCardFront",
      type: "image",
      label: "身份证正面:",
      otherOptions: {
        style: {
          width: "140px",
          height: "100px"
        }
      }
    },
    {
      field: "idCardBack",
      type: "image",
      label: "身份证反面:",
      otherOptions: {
        style: {
          width: "140px",
          height: "100px"
        }
      }
    }
  ],
  colLayout: { span: 12 },
  itemStyle: {},
  labelPosition: "right",
  labelWidth: "auto"
}
