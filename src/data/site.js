// ==========================================================
// ALL YOUR CONTENT LIVES HERE. Edit this file to add real data.
// ==========================================================

// ---- Services (4 cards) ----
export const services = [
  { number: "01", title: "Desktop Apps", text: "Programs that install on the shop computer and just work: stock, billing, daily records." },
  { number: "02", title: "Web Apps", text: "Websites people actually use: booking, dashboards and management systems you can open from any phone." },
  { number: "03", title: "Database & Backend", text: "The behind-the-scenes part: databases and servers that keep your numbers straight." },
  { number: "04", title: "UI Design", text: "Screens simple enough for a busy shopkeeper to use without a manual." },
];

// ---- Projects ----
// category: "Desktop" or "Web"  (used by the filter buttons)
// status:   "Live" or "In progress"
// link:     website URL, or "" if none
// image:    screenshot path like "/projects/aurora.png" (put the file in the public folder), or null
export const projects = [
  { title: "Aurora", category: "Web", status: "Live", text: "Free digital library for books, research and poetry.", tags: ["Library", "Reader", "Mobile"], link: "https://aurorapak.com", image: null },
  { title: "Next Laptop", category: "Desktop", status: "Ready", text: "Laptop shop app with inventory, billing, barcode and Excel import/export.", tags: ["Electron", "Inventory", "Billing"], link: "", image: null },
  { title: "iCare Clinic", category: "Desktop", status: "Ready", text: "Aesthetic clinic app for products, billing and services.", tags: ["Desktop", "Inventory", "Billing"], link: "", image: null },
  { title: "Campus MIS", category: "Web", status: "In progress", text: "Campus management system with activities, programs and courses.", tags: ["Node.js", "Express", "MySQL"], link: "", image: null },
  { title: "Nova Chat", category: "Desktop", status: "In progress", text: "Laptop chat app with email login, group chats and file sharing.", tags: ["Electron", "Chat", "Files"], link: "", image: null },
  { title: "Rescue Dispatch", category: "Web", status: "In progress", text: "Emergency dispatch system: citizen reports, nearest station and live unit tracking.", tags: ["Maps", "Live tracking", "Prototype"], link: "", image: null },
  { title: "Motorcycle Workshop", category: "Desktop", status: "In progress", text: "Workshop app for services, repair jobs and spare parts stock.", tags: ["Desktop", "Repairs", "Inventory"], link: "", image: null },
  { title: "Medicine Store", category: "Desktop", status: "Ready", text: "Medicine store management app.", tags: ["Desktop", "Inventory"], link: "", image: null },
  { title: "Carwash Booking", category: "Web", status: "In progress", text: "Mobile carwash site with booking, map location, billing and inventory.", tags: ["Booking", "Maps", "Billing"], link: "", image: null },
  { title: "School Management", category: "Web", status: "In progress", text: "School system for salaries, homework, billing and students.", tags: ["Students", "Billing", "Salaries"], link: "", image: null },
  { title: "Menzora Store", category: "Web", status: "In progress", text: "E-commerce store with an Apple-level interactive design.", tags: ["E-commerce", "Animation"], link: "", image: null },
];
// ---- About text (edit with your real story) ----
export const about = {
  text: "Hi, I'm Aurang. I build software for everyday businesses and I learn by doing. Every app on this page started as a real need, like keeping track of stock or sending a bill, and I kept at it until it worked.",
};

// ---- "Right now" cards: what you are doing at the moment ----
export const now = [
  { label: "Building", text: "More apps for shops and clinics, plus this portfolio you are looking at." },
  { label: "Learning", text: "Data structures in C++ and databases, a little every day." },
  { label: "Next", text: "Finishing the apps still in progress and getting them in front of real users." },
];

// ---- Contact links (REPLACE with your real ones; leave "" to hide a button) ----
export const contact = {
  email: "aurangzebkhn2007@gmail.com",
  github: "https://github.com/aurangzeb-code",
  whatsapp: "",
};

// ---- Avatar: images shown in order, one expression each ----
// Put the files in the folder: public\avatar  (names must match exactly)
export const avatar = {
  initials: "AZ", // shown in the circle until your images are added
  images: [
    "/avatar/neutral.jpg",
    "/avatar/smile.jpg",
    "/avatar/wink.jpg",
    "/avatar/surprised.jpg",
  ],
};

// ---- Hero text (edit freely) ----
export const hero = {
  tagline: "I build the everyday software that shops, clinics and workshops run on: stock, billing, bookings, all of it.",
  note: "hey, that's me!",
};
