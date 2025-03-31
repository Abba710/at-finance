import React, { createContext, useContext, useReducer, ReactNode } from "react";

// the structure of the user Balance
interface UserBalance {
  name: string;
  value: number;
}

// the structure of the user Balance
interface UserBalanceContext {
  userBalance: UserBalance;
}
