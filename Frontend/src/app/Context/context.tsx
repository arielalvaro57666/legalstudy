import { createContext, Dispatch, SetStateAction } from "react";
import React from "react";
type displayLaboralContextType ={
    displayLaboral: boolean;
    setDisplayLaboral: React.Dispatch<SetStateAction<boolean>>;
}
export const displayLaboralContext = createContext<displayLaboralContextType | null>(null);
export const displayCivilContext = createContext<object>({});
export const displayFamiliarContext = createContext<object>({});