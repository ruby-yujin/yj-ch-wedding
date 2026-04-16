import {
  createElement,
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren
} from "react";

type SoundContextValue = {
  isMusicOn: boolean;
  turnOnMusic: () => void;
  turnOffMusic: () => void;
  toggleMusic: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: PropsWithChildren) {
  const [isMusicOn, setIsMusicOn] = useState(true);

  const value = useMemo<SoundContextValue>(
    () => ({
      isMusicOn,
      turnOnMusic: () => setIsMusicOn(true),
      turnOffMusic: () => setIsMusicOn(false),
      toggleMusic: () => setIsMusicOn((prev) => !prev)
    }),
    [isMusicOn]
  );

  return createElement(SoundContext.Provider, { value }, children);
}

export function useSound() {
  const context = useContext(SoundContext);

  if (!context) {
    throw new Error("useSound must be used within SoundProvider");
  }

  return context;
}
