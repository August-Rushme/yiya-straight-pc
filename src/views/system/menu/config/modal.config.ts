import { IForm } from "@/base-ui/form"
export const modalConfig: IForm = {
  formItems: [
    {
      field: "name",
      type: "input",
      label: "菜单名称",
      placeholder: "请输入菜单名称",
      otherOptions: {
        clearable: true
      },
      rules: [{ type: "string", required: true, message: "请输入菜单名称", trigger: "blur" }]
    },
    {
      field: "menuType",
      type: "select",
      label: "菜单类型",
      placeholder: "请输选择菜单类型",
      isHidden: false,
      rules: [{ required: true, message: "请选择菜单类型", trigger: "blur" }],
      options: [
        {
          label: "一级菜单",
          value: "0"
        },
        {
          label: "二级菜单",
          value: "1"
        },
        {
          label: "三级菜单",
          value: "2"
        }
      ]
    },
    {
      field: "parentId",
      type: "treeSelect",
      label: "父级菜单",
      placeholder: "请选择父级菜单",
      options: []
    },
    {
      field: "url",
      type: "input",
      label: "访问路径",
      placeholder: "请输入访问路径",
      otherOptions: {
        clearable: true
      },
      rules: [{ required: true, message: "请输入访问路径", trigger: "blur" }]
    },
    {
      field: "component",
      type: "input",
      label: "前端组件",
      placeholder: "请输入前端组件",
      otherOptions: {
        clearable: true
      },
      rules: [{ required: true, message: "请输入前端组件", trigger: "blur" }]
    },
    {
      field: "icon",
      type: "menuIcon",
      label: "菜单图标",
      placeholder: "请选菜单图标",
      otherOptions: {
        clearable: true
      }
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
