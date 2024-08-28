"use server";

export const fetchReels = async () => {
  try {
    const res = await fetch("https://data-server-aptos.onrender.com/reels");
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
