import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";

export default function ThemeHook() {
  return useContext(ThemeContext);
}
