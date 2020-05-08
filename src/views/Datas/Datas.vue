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
            <el-button type="success" round plain @click="manageDialogFormVisible=true">管理资料</el-button>
            <el-button type="success" round plain @click="sortDialogFormVisible=true">管理类别</el-button>
          </div>
          <el-divider content-position="left">资料列表</el-divider>
          <!-- 资料显示 -->
          <el-table :data="articles" style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="标题:">
                    <span>{{ props.row.title }}</span>
                  </el-form-item>
                  <el-form-item label="所在目录:">
                    <span>{{ props.row.category_code }}</span>
                  </el-form-item>
                  <el-form-item label="发布时间:">
                    <span>{{ props.row.createTime }}</span>
                  </el-form-item>
                  <el-form-item label="文件查看:">
                    <i class="el-icon-folder-checked" style="color:#ffe791;font-size:20px"></i>
                  </el-form-item>
                  <el-form-item label="内容:">
                    <div v-html="props.row.desc" placeholder="请输入内容"></div>
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
      <el-form
        :model="dataBind"
        :rules="datarules"
        ref="uploadDataRef"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="类别" prop="selectKey">
          <el-cascader
            :options="categorys"
            :props="cascaderProps"
            clearable
            v-model="dataBind.selectKey"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="标题" prop="date_title">
          <el-input v-model="dataBind.date_title"></el-input>
        </el-form-item>
        <el-form-item>
          <quill-editor ref="myQuillEditor" v-model="dataBind.superText" />
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            action="http://oa.wuwei.kooboo.site/api/article/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dataDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upLoadBtn">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 管理资料对话框 -->
    <el-dialog title="管理资料" :visible.sync="manageDialogFormVisible" width="60%">
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="创建人" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.creator}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>根目录: {{ scope.row.rootCategory }}</p>
              <p>所在目录: {{ scope.row.category_code }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.title }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="manageEditBtn(scope.row)"
            >修改</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="manageDeleteBtn(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="managehandleCurrentChanges"
        :page-size="queryParams.pageSize"
        layout="total, prev, pager, next"
        :total="total"
      ></el-pagination>
    </el-dialog>

    <!--  管理类别对话框-->
    <el-dialog :visible.sync="sortDialogFormVisible" width="40%">
      <div class="title">
        <span>类别 |</span>
        <el-link type="success" @click="createSortDialogVisible=true">创建类别</el-link>
      </div>
      <el-table :data="oldcategorys" style="width: 100%">
        <el-table-column label="父级类别" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.parentCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.displayText }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="sortDeleteBtn(scope.row.code)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="sorthandleCurrentChanges"
        :page-size="queryParams.pageSize"
        layout="total, prev, pager, next"
        :total="oldcategorysTwo.length"
      ></el-pagination>
    </el-dialog>

    <!-- 创建类别对话框 -->
    <el-dialog title="创建类别" :visible.sync="createSortDialogVisible">
      <el-form
        :model="createSortData"
        :rules="createdatarules"
        ref="createSortRef"
        label-position="top"
      >
        <el-form-item label="类别" prop="selectKey">
          <el-cascader
            :options="categorys"
            :props="cascaderProps"
            clearable
            v-model="createSortData.selectKey"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="请输入类别名称" prop="sortname">
          <el-input v-model="createSortData.sortname"></el-input>
        </el-form-item>
        <el-form-item label="请输入类别code" prop="sortcode">
          <el-input v-model="createSortData.sortcode"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createSortDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSortBtn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { lineToTree, timeToDate } from "./../../common/lineToTree";
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
      // 原目录数据
      oldcategorys: [],
      oldcategorysTwo: [],
      // 修改目录数据成树形结构
      categorys: [],
      articles: [],
      dataDialogFormVisible: false,
      dataBind: {
        date_title: "",
        selectKey: [],
        superText: "",
        rootStr: "",
        categoryStr: ""
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
        date_title: [
          { required: true, message: "请输入标题", trigger: "blur" }
        ],
        selectKey: [
          { required: true, message: "请选择类别", trigger: "change" }
        ]
      },
      manageDialogFormVisible: false,
      sortDialogFormVisible: false,
      createSortDialogVisible: false,
      form: {
        name: "ssf"
      },
      createSortData: {
        sortname: "",
        sortcode: "",
        selectKey: [],
        selectKeyName: ""
      },
      createdatarules: {
        sortname: [
          { required: true, message: "请输入类别名称", trigger: "blur" }
        ],
        selectKey: [
          { required: true, message: "请选择父级类别", trigger: "change" }
        ],
        sortcode: [
          {
            required: true,
            message: "请输入类别code",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 添加类别
    addSortBtn() {
      let chooseSort = this.createSortData.selectKey;
      this.createSortData.selectKeyName = chooseSort[chooseSort.length - 1];
      this.$refs.createSortRef.validate(valid => {
        if (valid) {
          this.axios
            .post("/api/article_category/add", this.createSortData)
            .then(res => {
              console.log(res);
              if (res.data.message) {
                this.$message.success("添加分类成功!");
                this.createSortDialogVisible = false;
                this.getList();
                this.$refs.createSortRef.resetFields();
              } else {
                this.$message.info("服务器添加失败！");
              }
            });
        } else {
          this.$message.error("添加信息有误");
        }
      });
    },
    // 添加资料
    upLoadBtn() {
      this.$refs.uploadDataRef.validate(async valid => {
        if (valid) {
          this.dataBind.username =
            window.localStorage.getItem("username") || "";
          this.dataBind.rootStr = this.dataBind.selectKey[0];
          this.dataBind.categoryStr = this.dataBind.selectKey[
            this.dataBind.selectKey.length - 1
          ];
          let { data } = await this.axios.post(
            "/api/article/add",
            this.dataBind
          );
          if (data.message) {
            this.$message.success("添加资料成功");
            // 发布资料对话框关闭
            this.dataDialogFormVisible = false;
            // 格式化表单
            this.$refs.uploadDataRef.resetFields();
            // 富文本重置
            this.dataBind.superText = "";
            //刷新列表
            this.getArticles();
          }
        } else {
          this.$message.error("添加信息有误");
        }
      });
    },

    manageEditBtn(s) {
      console.log(s);
    },
    manageDeleteBtn(res) {
      console.log(res);
    },
    async sortDeleteBtn(res) {
      var code = res;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async res => {
          let { data } = await this.axios.post("/api/articleCategory/delete", {
            code: code
          });
          if (data.message) {
            this.$message.success("删除成功!");
            // 刷新目录
            this.getList();
          } else {
            this.$message.error("删除失败！请先删除该类的子类别");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 管理资料分页点击
    managehandleCurrentChanges(newNum) {
      this.queryParams.pageNum = newNum;
      this.getArticles();
    },
    // 管理类别分页点击
    async sorthandleCurrentChanges(newNum) {
      this.queryParams.pageNum = newNum;
      let { data } = await this.axios.post("/api/getCategory/find", {
        query: this.queryParams
      });
      this.oldcategorys = data.data;
    },

    handlePreview(res) {
      console.log(res);
    },
    handleRemove(res) {
      console.log(res);
    },
    beforeRemove(res) {
      console.log(res);
    },
    handleSuccess(res) {
      console.log(res);
      // console.log(res.f.files[0].Bytes);
    },

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
          // 将文章中时间戳数据进行修改
        });
    },

    // 获取目录数据与文章总数据
    async getList() {
      let { data } = await this.axios.get("/api/getCategory/get");
      var f = data.model.categorys;
      // 存储原始目录数据,默认显示5条
      this.oldcategorys = f.slice(0, this.queryParams.pageSize);
      this.oldcategorysTwo = f;
      // 将线性数据保存为树形结构
      let categorys = lineToTree(f);
      //   将目录数据进行保存
      this.categorys = categorys;
      // var g = data.model.articles;
      // // 将文章中时间戳数据进行修改
      // // g.forEach((element, index) => {
      // //   let time = new Date(parseInt(element.createTime)).toLocaleDateString();
      // //   console.log(time);
      // //   g[index].createTime = time;
      // // });  
      // // 返回五条数据
      // g = g.slice(0, 5);
      // //将文章数据进行保存
      // this.articles = g;
    },
    // 获取资料数据
    async getArticle(){
        let {
          data
        }=await this.axios.get("/api/article/get"
        )
        var list=data.list.slice(0,5);
        this.articles=list;

    },

    // 获取文章数据（分页功能）
    async getArticles() {
      var params = window.localStorage.getItem("params");
      // 判断本地存储是否有目录的信息。
      params=params?params.split(","):[];
        let { data } = await this.axios.post("/api/article/find", {
          query: this.queryParams,
          params
        });
        this.total = data.total;
        this.articles = data.data;
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
    this.getArticle();
  },
  updated() {
    // 后台返回数据中时间戳进行转化
    // timeToDate(this.articles, "createTime");
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
  width: 50%;
}
.el-dialog .title {
  position: absolute;
  top: 22px;
  left: 30px;
  font-size: 18px;
}
/* .el-form {
  margin-left: -47px;
} */
.el-table__expanded-cell[class*="cell"] {
  padding: 20px 102px !important;
}
</style>
