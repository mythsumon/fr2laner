"use client";

import { RoleSelector, type RoleMode } from "./RoleSelector";

export type LoginMode = RoleMode;

type LoginModeSelectorProps = {
  onSelect: (mode: LoginMode) => void;
};

export const LoginModeSelector = ({ onSelect }: LoginModeSelectorProps) => {
  return <RoleSelector onSelect={onSelect} />;
};

