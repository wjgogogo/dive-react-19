import { useDark } from "rspress/runtime";

export function useTheme(theme?: "light" | "dark") {
  const isDark = useDark();
  return theme ? theme : isDark ? "dark" : "light";
}
