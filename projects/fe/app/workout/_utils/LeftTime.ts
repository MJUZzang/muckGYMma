export const CaclLeftTime = (dueDate: Date) => {
    const currentDate = new Date(); // 현재 로컬 시간
    const utcCurrent = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));

    const distance = dueDate.getTime() - utcCurrent.getTime();

    const leftDays = Math.floor(distance / (1000 * 60 * 60 * 24));

    const leftHours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const leftMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const leftSeconds = Math.floor((distance % (1000 * 60)) / 1000);

    return leftDays > 0
        ? leftDays + "day(s)"
        : leftHours > 0
        ? leftHours + "hr(s)"
        : leftMinutes > 0
        ? leftMinutes + "min(s)"
        : leftSeconds > 0
        ? leftSeconds + "sec(s)"
        : "0sec";
};