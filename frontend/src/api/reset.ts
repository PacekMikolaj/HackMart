import { BASE_URL } from "../../config";

export const fetchReset = async () => {
  const res = await fetch(`${BASE_URL}/reset`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error resetting progress");
  return res.text();
};
