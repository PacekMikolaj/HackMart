import { BASE_URL } from "../../config";

export const fetchProgress = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/progress`, {
    method: "GET",
    headers: {
      Authorization: token || "",
    },
  });
  if (!res.ok) {
    throw new Error("error fetching progress");
  }
  return res.json() as Promise<Record<string, boolean>>;
};
