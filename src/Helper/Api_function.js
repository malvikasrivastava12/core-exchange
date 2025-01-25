import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
export const URLApi = "https://core-exchange.com/api";
// export const URLApi = "http://192.168.1.121:1414/api";
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

export async function getDirectTeam(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/directTeam`, {
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

export async function getFetchTeams(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/fetch-teams`, {
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
export async function getUserDepositList(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/user-deposit-list`, {
      params: {
        userAddress: address,
        page: page,
        limit: limit,
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

export async function getMagicIncomeHistoryfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/getMagicIncomeHistory`, {
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

export async function getRoiOfUserfn(address, depositLenght) {
  try {
    const response = await axios.get(`${URLApi}/getRoiOfUser`, {
      params: {
        user: address,
        depositLenght: depositLenght,
      },
    });
    // console.log("getRoiOfUserfn", response.data);
    return response.data;
  } catch (error) {
    console.log("Error getUserInfo Admin:", error);
  }
}

export async function getWithdrawHistoryfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/withdrawHistory`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}

export async function getInvestmentHistoryfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/getInvestmentHistory`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}

export async function gettotalEarnedHistoryfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/totalEarnedHistory`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}

export async function getOfferIncomeHistoryfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/offerIncomeHistory`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}

export async function getOfferHistoryfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/offerHistory`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}
export async function getMagicIncomeHistory(address) {
  try {
    const response = await axios.get(`${URLApi}/magicIncomeHistory`, {
      params: {
        user: address,
        page: 1,
        limit: 10,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}

export async function getLeftCoreWalletfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/leftCoreWallet`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}

export async function getLeftSplitWalletfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/leftSplitWallet`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}

export async function getC50FlushedHistoryfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/m50FlushedHistory`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}

export async function getMagicTeamfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/magicTeam`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}

export async function updateDownlinefn(address, downlineUser) {
  try {
    const response = await axios.get(`${URLApi}/updateDownline`, {
      params: {
        user: address,
        downlineUser: downlineUser,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}

export async function getC50IncomeHistoryfn(address, page, limit) {
  try {
    const response = await axios.get(`${URLApi}/c50IncomeHistory`, {
      params: {
        user: address,
        page: page,
        limit: limit,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error getWithdrawHistoryfn Admin:", error);
  }
}
