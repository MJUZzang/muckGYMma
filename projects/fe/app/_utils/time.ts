export const getTimeAgo = (uploadedAt: Date): string => {
    const now = new Date();
    const timeDifference = now.getTime() - uploadedAt.getTime();

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = day * 365;

    if (timeDifference < minute) {
        let seconds = Math.floor(timeDifference / 1000);
        seconds = seconds < 0 ? 0 : seconds;
        return `${seconds}초 전`;
    } else if (timeDifference < hour) {
        let minutes = Math.floor(timeDifference / minute);
        minutes = minutes < 0 ? 0 : minutes;
        return `${minutes}분 전`;
    } else if (timeDifference < day) {
        let hours = Math.floor(timeDifference / hour);
        hours = hours < 0 ? 0 : hours;
        return `${hours}시간 전`;
    } else if (timeDifference < month) {
        let days = Math.floor(timeDifference / day);
        days = days < 0 ? 0 : days;
        return `${days}일 전`;
    } else if (timeDifference < year) {
        let months = Math.floor(timeDifference / month);
        months = months < 0 ? 0 : months;
        return `${months}개월 전`;
    } else {
        let years = Math.floor(timeDifference / year);
        years = years < 0 ? 0 : years;
        return `${years}년 전`;
    }
};
