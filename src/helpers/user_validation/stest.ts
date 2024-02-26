"use server";
import { cookies } from "next/headers";

export const testAction = async () => {
  const cookie = cookies();
  cookie.set("rtest", "ogomiliki");
  return "working";
};
