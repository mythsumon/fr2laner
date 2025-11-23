"use client";

import { RoleSelector, type RoleMode } from "./RoleSelector";

export type SignupMode = RoleMode;

type SignupModeSelectorProps = {
  onSelect: (mode: SignupMode) => void;
};

export const SignupModeSelector = ({ onSelect }: SignupModeSelectorProps) => {
  return <RoleSelector onSelect={onSelect} />;
};

