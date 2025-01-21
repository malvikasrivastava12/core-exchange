import {
  writeContract,
  readContract,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { toast } from "react-hot-toast";
import { CONTRACT_ADDRESS_ABI, CONTRACT_ADDRESS } from "../Helper/config";
import { config } from "../main";

export async function isUserExist(address) {
  const result = await readContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "isUserExist",
    args: [address],
  });

  return result;
}

export async function registerfn(refAddress) {
  const result = await writeContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "register",
    args: [refAddress],
    value: [(0.1 * 1e18).toLocaleString("fullwide", { useGrouping: false })],
  });
  const res = waitForTransactionReceipt(config, { hash: result });
  const data = await toast.promise(res, {
    loading: "User registration is pending...",
    success: "User register Successfully",
    error: "Registration failed",
  });
  return data;
}

export async function Depositfn(payAmount, amount, address) {
  console.log(payAmount, "amount in depsoit func", address, amount);
  const result = await writeContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "deposit",
    args: [
      (Number(amount) * 1e18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
      address,
    ],
    value: [
      (payAmount * 1e18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
    ],
  });

  const res = waitForTransactionReceipt(config, { hash: result });
  const data = await toast.promise(res, {
    loading: "Deposit is pending...",
    success: " Deposit Successfully",
    error: "request failed.",
  });
  console.log(data, "Depositfn");
  return data;
}

export async function UserDetailsfn(address) {
  const result = await readContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "UserDetail",
    args: [address],
  });

  return result;
}

export async function userClaimedRegistrationTokenfn(address) {
  const userExit = await isUserExist(address);
  if (!userExit) {
    toast.error("Wallet not Connected!!");
    return;
  }
  const result = await writeContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "userClaimedRegistredToken",
  });

  const res = waitForTransactionReceipt(config, { hash: result });
  const data = await toast.promise(res, {
    loading: "Registration token claimed pending...",
    success: " Registration token claimed Successfully",
    error: "Registration token claimed failed.",
  });
  return data;
}

export async function getReturnVirtualTokenAmountCanBeUsed(
  address,
  amount,
  rank
) {
  console.log(address, amount, rank, ":::::123456 in getRetturn");
  const result = await readContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "returnVirtualTokenAmountCanBeUsed",
    args: [
      address,
      (amount * 1e18).toLocaleString("fullwide", { useGrouping: false }),
      rank,
    ],
  });
  console.log(result, "getReturnVirtualTokenAmountCanBeUsed");
  return result;
}

export async function ReturnUserQualificationLengthfn(address) {
  const result = await readContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "returnUserQualificationLength",
    args: [address],
  });

  return result;
}

export async function TotalClaimableIncomefn(address) {
  const result = await readContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "totalClaimableIncome",
    args: [address],
  });

  return Number(result);
}

export async function isRegistrationVirtualTokenClaimed(address) {
  const result = await readContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "isRegistrationVirtualTokenClaimed",
    args: [address],
  });

  return result;
}

export async function TotalIncomefn(address) {
  const result = await readContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "totalIncome",
    args: [address],
  });

  return Number(result);
}

export async function withdrawBalancefn() {
  const result = await writeContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "withdrawBalance",
    args: [],
  });
  const res = waitForTransactionReceipt(config, { hash: result });
  const data = await toast.promise(res, {
    loading: " Withdraw is pending...",
    success: " Withdraw Successfully",
    error: "Withdraw failed",
  });
  return data;
}

export async function returnAvailableSplitWalletFundfn(address) {
  const result = await readContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "returnAvailableSplitWalletFund",
    args: [address],
  });

  return Number(result);
}

export async function setReturnWithdrawBalancefn(address) {
  const result = await readContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "ReturnWithdrawBalance",
    args: [address],
  });

  return result;
}
