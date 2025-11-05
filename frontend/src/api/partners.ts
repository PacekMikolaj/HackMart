import { BASE_URL } from "../../config";
import { Partner } from "../types/partner";

export const fetchPartners = async (): Promise<Partner[]> => {
  const res = await fetch(`${BASE_URL}/partners`, {
    method: "GET",
  });
  if (!res.ok) throw new Error("Error fetching partners");
  return res.json();
};
