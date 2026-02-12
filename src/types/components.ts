import { ReactNode } from "react";

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export type Size = "sm" | "md" | "lg";
export type ColorVariant = "primary" | "secondary" | "success" | "info" | "warning" | "danger";
export type Alignment = "left" | "center" | "right";
export type BadgeVariant = "default" | "success" | "info" | "warning";
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = Size;

export interface IconProps {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export interface LoadingProps {
  loading?: boolean;
  loadingText?: string;
}

export interface DisableableProps {
  disabled?: boolean;
}
