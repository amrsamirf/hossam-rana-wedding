export type Lang = "en" | "ar";

export const translations = {
  en: {
    saveTheDate: "save the date",
    forTheWeddingOf: "FOR THE WEDDING OF",
    countingDown: "COUNTING DOWN",
    addToCalendar: "ADD TO CALENDAR",
    kidsNote: "Kiss your kids goodnight and join us",
    todayIsTheDay: "Today's the day!",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    withLove: "with love",
    months: [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
    ],
    dayLabels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  ar: {
    saveTheDate: "احتفظوا بالموعد",
    forTheWeddingOf: "حفل زفاف",
    countingDown: "العد التنازلي",
    addToCalendar: "أضف إلى التقويم",
    kidsNote: "قبّلوا أطفالكم ليلاً وانضموا إلينا",
    todayIsTheDay: "!حان اليوم",
    days: "أيام",
    hours: "ساعات",
    minutes: "دقائق",
    seconds: "ثوانٍ",
    withLove: "بكل المحبة",
    months: [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
    ],
    dayLabels: ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"],
  },
} as const;

export type Translations = typeof translations.en;
