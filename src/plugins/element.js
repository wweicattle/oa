import Vue from 'vue'
import {
    Button, Form, FormItem, Input,
    Message, Container, Aside, Header, Main, Badge, Cascader, Upload, Popover
} from 'element-ui'
import {
    Menu, MenuItem, MenuItemGroup,
    Submenu, Breadcrumb, BreadcrumbItem,
    Card, TableColumn, Table, Switch, Tooltip,
    Pagination,
    Dialog, MessageBox,
    Tag, Tree, Select, Option
    , Alert, Tabs, TabPane, Steps
    , Checkbox, CheckboxGroup, Timeline, TimelineItem,
    Avatar,Dropdown,DropdownItem,DropdownMenu,
    Divider,Link

} from "element-ui"
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Container);
Vue.use(Aside)
Vue.use(Header);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Main);
Vue.use(Avatar);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Badge);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
Vue.use(Tree)
Vue.use(Divider)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Cascader)
Vue.use(Upload)
Vue.use(Tag)
Vue.use(Popover)
Vue.use(Link)






















Vue.prototype.$message = Message;
// 弹框组件
Vue.prototype.$confirm = MessageBox.confirm;
