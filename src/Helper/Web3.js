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
    success: " User register Successfully",
    error: "request failed.",
  });
  return data;
}

export async function Depositfn(payAmount, amount) {
  const result = await writeContract(config, {
    abi: CONTRACT_ADDRESS_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "stake",
    args: [
      (Number(amount) * 1e18).toLocaleString("fullwide", {
        useGrouping: false,
      }),
    ],
    value: [payAmount],
  });

  const res = waitForTransactionReceipt(config, { hash: result });
  const data = await toast.promise(res, {
    loading: "Stake is pending...",
    success: " Stake Successfully",
    error: "request failed.",
  });
  return data;
}
