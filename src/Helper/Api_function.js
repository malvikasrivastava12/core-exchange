import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
export const URLApi = "https://core-exchange.com/api";

export async function getUserInfo(address) {
  try {
    const response = await axios.get(`${URLApi}/user-info`, {
      params: {
        userAddress: address,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getUserInfo Admin:", error);
  }
}
