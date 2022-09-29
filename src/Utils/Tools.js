// 播放量格式化
export function formatNumber(num) {
    if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
    } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
    }
}

export const formaterDuration = (value) => {
    let sec = value % 60;
    sec = Math.trunc(sec).toString().padStart(2, "0");
    let min = value / 60;
    if (min < 0) {
      min = "00";
    } else {
      min = Math.trunc(min).toString().padStart(2, "0");
    }
    let formater_uration = min + ":" + sec;
    return formater_uration;
  };