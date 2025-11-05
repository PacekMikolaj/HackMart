import { BASE_URL } from "../../config";
import { UpdateUserRequest } from "../types/user";

export const fetchUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("NO_TOKEN");

  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  if (res.status === 401) {
    throw new Error("UNAUTHORIZED");
  }
  if (!res.ok) throw new Error(`HTTP_${res.status}`);
  return res.json();
};

export const updateUser = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateUserRequest;
}) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/user/${id}`, {
    method: "PUT",
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Profile update failed");
  }

  return res.json();
};
