// Edit your wedding details here.
export const wedding = {
  groom: "Hossam",
  bride: "Rana",
  initials: "H&R",
  // ISO datetime of the ceremony (local time of the venue).
  date: new Date("2026-06-26T19:00:00"),
  dateLabel: "Friday, June 26, 2026",
  timeLabel: "7:00 PM",
  venueName: "Le Passage Cairo Hotel & Casino",
  venueAddress: "Cairo Int'l Airport Rd, Sheraton Al Matar, El Nozha, Cairo",
  venueMapUrl: "https://maps.app.goo.gl/fvSgFWZPaTywBBaP6?g_st=iw",
  // Hint shown under the closed envelope.
  hint: "Tap to open",
  // Auto-open the envelope after this many ms (set to 0 to disable).
  autoOpenMs: 4000,
};

export type WeddingConfig = typeof wedding;
