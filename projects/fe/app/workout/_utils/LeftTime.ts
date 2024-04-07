export const CaclLeftTime = (dueDate: Date) => {
    const now = new Date().getTime();
    const distance = dueDate.getTime() - now;

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
