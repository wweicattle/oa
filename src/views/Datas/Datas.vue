<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <a href="/">首页</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>资料</el-breadcrumb-item>
      <el-breadcrumb-item>分类详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-container>
        <el-aside width="160px">
          <el-tree :data="categorys" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-aside>
        <el-main>
          <div class="btnOperate">
            <!-- <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>-->
            <el-button type="success" round plain @click="dataDialogFormVisible = true">发布资料</el-button>
            <el-button type="success" round plain>管理资料</el-button>
            <el-button type="success" round plain>管理类别</el-button>
          </div>
          <el-divider content-position="left">资料列表</el-divider>
          <!-- 资料显示 -->
          <el-table :data="articles" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="所属店铺">
                    <span>{{ props.row.shop }}</span>
                  </el-form-item>
                  <el-form-item label="商品 ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="店铺 ID">
                    <span>{{ props.row.shopId }}</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{{ props.row.category }}</span>
                  </el-form-item>
                  <el-form-item label="店铺地址">
                    <span>{{ props.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="作者" prop="creator"></el-table-column>
            <el-table-column label="发布时间" prop="createTime"></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
          </el-table>
          <!-- 分页功能 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryParams.pageNum"
            :page-sizes="[1, 3, 5, 7]"
            :page-size="queryParams.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            background
          ></el-pagination>
        </el-main>
      </el-container>
    </el-card>

    <!-- 发布资料对话框 -->
    <el-dialog title="发布资料" :visible.sync="dataDialogFormVisible">
      <el-form :model="dataBind" :rules="datarules" ref="dataref" label-width="100px">
        <el-form-item label="类别" prop="selectKey">
          <el-cascader :options="categorys" :props="cascaderProps" clearable v-model="dataBind.selectKey" ></el-cascader>
        </el-form-item>
        <el-form-item label="标题" prop="date_title">
          <el-input v-model="dataBind.date_title" ></el-input>
        </el-form-item>
        <el-form-item>
          <quill-editor ref="myQuillEditor" v-model="dataBind.superText"   />
        </el-form-item>
        <el-form-item>
          <div v-html="dataBind.superText"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dataDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dataDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import lineToTree from "./../../common/lineToTree";
export default {
  name: "Data",
  data() {
    return {
      queryParams: {
        query: "",
        pageSize: 5,
        pageNum: 1
      },
      total: 1,
      // 树形的数据以什么属性传递
      defaultProps: {
        children: "children",
        label: "displayText"
      },
      // 树形数据绑定
      categorys: [],
      articles: [],
      dataDialogFormVisible: false,
      dataBind: {
        date_title: "",
         selectKey: "",
         superText:"",
         num:""
         
      },
      dataShow: [],
      cascaderProps: {
        checkStrictly: true,
        // 鼠标移入进行选择
        expandTrigger: "hover",
        // 点击该分类，给它cat_id作为值进行区别
        value: "code",
        // 树形分类的显示为cat_name
        label: "displayText",
        //树形的迭代以children属性
        children: "children"
      },
     
      datarules: {
        date_title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        selectKey:[{ required: true, message: "请输入标题", trigger: "change" }]
      }
    };
  },
  methods: {
    // 点击分类详情（公告/技术）
    async handleNodeClick(data) {
      // 需要重新把请求文章的数据进行重置
      // 不然当你在浏览全部文章时，你的页码与页数会发生错误（当数据不够显示空白）
      this.queryParams.pageNum = 1;
      this.queryParams.pageSize = 5;
      // 保存点击分类时的数据对象
      var res = data;
      let arr = [];
      if (res.code) arr.push(res.code);
      // 将分类包含所有的code值进行递归保存
      function saveArr(res) {
        res.forEach(val => {
          arr.push(val.code);
          if (val.children) saveArr(val.children);
        });
      }
      if (res.children) saveArr(res.children);
      // 将请求的分类详情数据存储在本地上，以便对返回数据的区别
      window.localStorage.setItem("params", arr);

      // 点击分类（公告，技术）进行请求数据
      this.axios
        .post("/api/article/find", {
          query: this.queryParams,
          params: arr
        })
        .then(res => {
          // 不同分类数据返回的总条数也不同
          this.total = res.data.total;
          this.articles = res.data.data;
        });
    },

    // 获取目录数据与文章总数据
    async getList() {
      let { data } = await this.axios.get("/api/getCategory/get");
      var f = data.model.categorys;
      // 将线性数据保存为树形结构
      let categorys = lineToTree(f);
      //   将目录数据进行保存
      this.categorys = categorys;
      var g = data.model.articles;
      // 将文章中时间戳数据进行修改
      g.forEach((element, index) => {
        let aa = new Date(parseInt(element.createTime)).toLocaleDateString();
        g[index].createTime = aa;
      });
      // 返回五条数据
      g = g.slice(0, 5);
      //将文章数据进行保存
      this.articles = g;
    },

    // 获取文章数据（分页功能）
    async getArticles() {
      var params = window.localStorage.getItem("params");
      if (params) {
        let { data } = await this.axios.post("/api/article/find", {
          query: this.queryParams,
          params: params.split(",")
        });
        this.total = data.total;
        this.articles = data.data;
      } else {
        let { data } = await this.axios.post("/api/article/find", {
          query: this.queryParams,
          params: []
        });
        this.articles = data.data;
        this.total = data.total;
      }
    },
    // 点击新页总数
    handleSizeChange(newSize) {
      this.queryParams.pageSize = newSize;
      this.getArticles();
    },
    // 点击新页码
    handleCurrentChange(newNum) {
      this.queryParams.pageNum = newNum;
      this.getArticles();
    }
  },
  created() {
    // 一开始先初始化获取一次数据
    this.getList();
    this.getArticles();
  }
};
</script>
<style  scoped>
.el-breadcrumb {
  margin-bottom: 23px;
}
.el-main {
  border: 1px solid #eee;
}
.el-main .btnOperate {
  display: flex;
  justify-content: flex-end;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-cascader {
  width: 100%;
}
</style>
