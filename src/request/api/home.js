import service from "..";

// 课程首页接口
export function getData() {
    return service({
        method: "post",
        url: "/smart-orch/course/v100/mainList",
        data:{"appId":"2002","token":"20220713zV2mkdMjFNfW9vkb3fJ"}
    })
}

// 课程详情信息接口
export function getCourseDetailInfo(courseId) {
    return service({
        method: "post",
        url: "/smart-orch/course/v100/info",
        // data:{"appId":"2002","courseId":"400000481"}
        data:{"appId":"2002","courseId":courseId}
    })
}

// 课程详情信息接口
export function getCourseProgramList(courseId, pageNo) {
    return service({
        method: "post",
        url: "/smart-orch/program/v100/list",
        data:{"appId":"2002","courseId":courseId,"page":{"pageNo":pageNo,"pageSize":"20"}}
    })
}


// 课程详情信息接口
export function getCourseProgramInfo(albumId,programId,fragmentId) {
    return service({
        method: "post",
        url: "/smart-orch/program/v100/info",
        data:{
            "appId":"2002",
            "albumId":albumId, 
            "programId":programId,
            "fragmentId":fragmentId
        }
    })
}

// 根据类型获取课程列表
export function getCourseListByType(courseType, pageNo) {
    return service({
        method: "post",
        url: "/resource-orchestration-system/knowledge/v100/getMarketInfoByType",
        data:{
            "courseType":courseType, 
            "sortType":"1",
            "pageSize":"10",
            "pageNo":pageNo,
            "appId":"2002"
        }
    })
}

// 搜索课程
export function searchCourseBykeyWord(keyWord, pageNo) {
    return service({
        method: "post",
        url: "/search-orchestration-system/search/v103/search",
        data:{
            "keyWord":keyWord, 
            "resourceType":"3",
            "scrollId":"",
            "pageSize":"10",
            "pageNo":pageNo,
            "appId":"2002"
        }
    })
}
