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
        ? leftDays + "일"
        : leftHours > 0
        ? leftHours + "시간"
        : leftMinutes > 0
        ? leftMinutes + "분"
        : leftSeconds > 0
        ? leftSeconds + "초"
        : "0초";
};

export function timeUntilSevenDaysLater(createdAt: string): string {
    // Parse the createdAt string to a Date object
    const createdDate = new Date(createdAt);

    // Calculate the date 7 days after the created date
    const sevenDaysLater = new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Get the current date and time
    const now = new Date();

    // Calculate the difference in milliseconds
    const diff = sevenDaysLater.getTime() - now.getTime();

    // Calculate the difference in days, hours, minutes, and seconds
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((diff % (60 * 1000)) / 1000);

    // Return the appropriate string based on the remaining time
    if (days > 0) {
        return `${days}일`;
    } else if (hours > 0) {
        return `${hours}시간`;
    } else if (minutes > 0) {
        return `${minutes}분`;
    } else {
        return `${seconds}초`;
    }
}
