<template>
    <div class="courseItem">
        <img :src="course.coverImage" alt="">
        <div class="right">
        <router-link :to="{path:'/courseDetail',query:{id:course.courseId}}">
            <span class="title"> {{course.title}} </span>
            <span class="subtitle"> {{course.subtitle}} </span>
            <span class="author"> {{course.author}} | {{course.intro}} </span>
            <span class="total"> 共{{course.totalPublishNo}}节 </span>
        </router-link>
        </div>
    </div>
</template>
<script>
export default {
    props:["course"],
};
</script>

<style lang="less" scoped>
.courseItem {
    width: 100%;
    padding: .1rem 0;
    display: flex;
    img {
        border-radius: 5px;
        width: 20%;
    }
    .right {
        width: 80%;
        display: flex;
        flex-direction: column;
        padding-left: .3rem;
        span {
            display:block;
            word-break:keep-all; 
            white-space:nowrap; 
            overflow:hidden; /* 内容超出宽度时隐藏超出部分的内容 */
            text-overflow:ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
            color: #ccc;
        }
        .title {
            color: black;
            font-size: 20px;
        }
    }
}
</style>