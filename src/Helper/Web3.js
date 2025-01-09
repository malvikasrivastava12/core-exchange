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
  });
  const res = waitForTransactionReceipt(config, { hash: result });
  const data = await toast.promise(res, {
    loading: "User registration is pending...",
    success: "User register Successfully",
    error: "Registration failed",
  });
  return data;
}

export async function Depositfn(payAmount, amount) {
  const result = await writeContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "deposit",
    args: [
      (Number(amount) * 1e18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
    ],
    value: payAmount,
  });

  const res = waitForTransactionReceipt(config, { hash: result });
  const data = await toast.promise(res, {
    loading: "Deposit is pending...",
    success: " Deposit Successfully",
    error: "request failed.",
  });

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

export async function userClaimedRegistrationTokenfn() {
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
