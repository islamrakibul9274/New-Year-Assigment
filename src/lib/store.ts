import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "db.json");

interface DBStore {
  users: any[];
  rsvps: any[];
  resolutions: any[];
  newsletters: any[];
}

function loadData(): DBStore {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const initial: DBStore = { users: [], rsvps: [], resolutions: [], newsletters: [] };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return { users: [], rsvps: [], resolutions: [], newsletters: [] };
  }
}

function saveData(data: DBStore) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Failed to save local db", err);
  }
}

export const localDB = {
  findUserByEmail: (email: string) => {
    const data = loadData();
    return data.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  findUserById: (id: string) => {
    const data = loadData();
    return data.users.find((u) => u._id === id);
  },
  createUser: (user: any) => {
    const data = loadData();
    const newUser = {
      _id: Date.now().toString(),
      ...user,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    data.users.push(newUser);
    saveData(data);
    return newUser;
  },
  updateUser: (id: string, updates: any) => {
    const data = loadData();
    const idx = data.users.findIndex((u) => u._id === id);
    if (idx !== -1) {
      data.users[idx] = { ...data.users[idx], ...updates, updatedAt: new Date().toISOString() };
      saveData(data);
      return data.users[idx];
    }
    return null;
  },
  createRSVP: (rsvp: any) => {
    const data = loadData();
    const newRsvp = {
      _id: Date.now().toString(),
      ...rsvp,
      createdAt: new Date().toISOString(),
    };
    data.rsvps.push(newRsvp);
    saveData(data);
    return newRsvp;
  },
  getRSVPs: () => {
    return loadData().rsvps;
  },
  createResolution: (res: any) => {
    const data = loadData();
    const newRes = {
      _id: Date.now().toString(),
      ...res,
      createdAt: new Date().toISOString(),
    };
    data.resolutions.push(newRes);
    saveData(data);
    return newRes;
  },
  getResolutions: () => {
    return loadData().resolutions;
  },
  createNewsletter: (email: string) => {
    const data = loadData();
    if (!data.newsletters.includes(email.toLowerCase())) {
      data.newsletters.push(email.toLowerCase());
      saveData(data);
    }
  },
};
