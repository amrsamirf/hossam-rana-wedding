// Edit your wedding details here.
export const wedding = {
  groom: "Hossam",
  bride: "Rana",
  groomAr: "حسام",
  brideAr: "رنا",
  initials: "H&R",
  // ISO datetime of the ceremony (local time of the venue).
  date: new Date("2026-06-26T19:00:00"),
  dateLabel: "Friday, June 26, 2026",
  dateLabelAr: "الجمعة، ٢٦ يونيو ٢٠٢٦",
  timeLabel: "7:00 PM",
  timeLabelAr: "٧:٠٠ مساءً",
  venueName: "Le Passage Cairo Hotel & Casino",
  venueNameAr: "فندق لو باساج القاهرة",
  venueAddress: "Cairo Int'l Airport Rd, Sheraton Al Matar, El Nozha, Cairo",
  venueAddressAr: "طريق مطار القاهرة الدولي، شيراتون المطار، النزهة، القاهرة",
  venueMapUrl: "https://maps.app.goo.gl/fvSgFWZPaTywBBaP6?g_st=iw",
  // Hint shown under the closed envelope.
  hint: "Tap to open",
  hintAr: "اضغط للفتح",
  // Auto-open the envelope after this many ms (set to 0 to disable).
  autoOpenMs: 4000,
};

export type WeddingConfig = typeof wedding;
