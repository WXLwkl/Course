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
export function getCourseProgramInfo(courseId) {
    return service({
        method: "post",
        url: "/smart-orch/program/v100/list",
        data:{"appId":"2002","courseId":courseId,"page":{"pageNo":"1","pageSize":"20"}}
    })
}