import { redis } from "./redis";

const key = (id: string) => `ADMIN_USER_${id}`;

export const getIsAdmin = async (id: string) => {
  const res = await redis.get(key(id));
  if (!res) return false;
  return true;
};

export const setIsAdmin = async (id: string) => {
  return await redis.set(key(id), true);
};

export const removeAdmin = async (id: string) => {
  return await redis.del(key(id));
};
