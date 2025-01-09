import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
// export const URLApi = "https://core-exchange.com/api";
export const URLApi = "http://192.168.1.104:1414/api";
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

export async function getDirectTeam(address) {
  try {
    const response = await axios.get(`${URLApi}/directTeam`, {
      params: {
        user: address,
        page: 1,
        limit: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getUserInfo Admin:", error);
  }
}

export async function getFetchTeams(address) {
  try {
    const response = await axios.get(`${URLApi}/fetch-teams`, {
      params: {
        user: address,
        page: 1,
        limit: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getUserInfo Admin:", error);
  }
}
export async function getUserDepositList(address) {
  try {
    const response = await axios.get(`${URLApi}/user-deposit-list`, {
      params: {
        userAddress: address,
        page: 1,
        limit: 10,
      },
    });
    console.log(response.data, "user-deposit-list");
    return response.data;
  } catch (error) {
    console.log("Error getUserInfo Admin:", error);
  }
}

export async function setUserSecurityPin(address) {
  try {
    const response = await axios.post(`${URLApi}/securityPin`, {
      pin: newPasskey,
      user: walletAddress,
    });
    console.log(response, "response");
    if (response?.data?.status == 200) {
      toast.success(response?.data?.message);
      setIsFetch(!isFetch);
    } else {
      toast.error(response?.data?.message);
    }
    setNewPasskey("");
    setConfirmPasskey("");
  } catch (error) {
    console.log(error);
  }
}
export async function getMagicBoosterHistoryfn(address) {
  try {
    const response = await axios.get(`${URLApi}/getMagicBoosterHistory`, {
      params: {
        user: address,
        page: 1,
        limit: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getUserInfo Admin:", error);
  }
}

export async function getMagicIncomeHistoryfn(address) {
  try {
    const response = await axios.get(`${URLApi}/getMagicIncomeHistory`, {
      params: {
        user: address,
        page: 1,
        limit: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getUserInfo Admin:", error);
  }
}

export async function getStarIncomeHistoryfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/getStarIncomeHistory`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getUserInfo Admin:", error);
  }
}
