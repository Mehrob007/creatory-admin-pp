import { create } from "zustand";

interface FormState {
  data: { [key: string]: string | number };
  errors: { [key: string]: string };
  setData: (field: string, value: string | number) => void;
  validate: (rules: ValidationRules) => boolean;
  setDataClear: () => void;
  resetErrors: () => void;
  checked: (rules: ValidationRules) => boolean;
}

type ValidationRules = {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: RegExp;
    message?: string;
  };
};

export const useFormStore = create<FormState>((set, get) => ({
  data: {},
  errors: {},

  setData: (field, value) =>
    set((state) => ({
      data: { ...state.data, [field]: value },
    })),
  setDataClear: () =>
    set(() => ({
      data: {},
    })),

  resetErrors: () => set({ errors: {} }),

  validate: (rules: ValidationRules) => {
    const { data } = get();
    const errors: { [key: string]: string } = {};

    Object.keys(rules).forEach((field) => {
      const rule = rules[field];
      const value = data[field];

      if (
        rule.required &&
        (value === "" || value === undefined || value === null)
      ) {
        errors[field] = rule.message || " Это обязательное поле  ";
        return;
      }

      if (typeof value === "string") {
        if (rule.minLength && value.length < rule.minLength) {
          errors[field] =
            rule.message ||
            `Не должно быть меньше ${rule.minLength} символов  `;
          return;
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          errors[field] =
            rule.message || `Не должно превышать ${rule.maxLength} символов  `;
          return;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = rule.message || "Неверный формат  ";
          return;
        }
      }

      if (typeof value === "number") {
        if (rule.min !== undefined && value < rule.min) {
          errors[field] = rule.message || `Минимальное значение: ${rule.min}  `;
          return;
        }
        if (rule.max !== undefined && value > rule.max) {
          errors[field] = rule.message || `Максимальное значение: ${rule.max}`;
          return;
        }
      }
    });
    set({ errors });
    return Object.keys(errors).length === 0;
  },
  checked: (rules: ValidationRules) => {
    const { data } = get();
    const errors: { [key: string]: string } = {};

    Object.keys(rules).forEach((field) => {
      const rule = rules[field];
      const value = data[field];

      if (
        rule.required &&
        (value === "" || value === undefined || value === null)
      ) {
        errors[field] = rule.message || " Это обязательное поле  ";
        return;
      }

      if (typeof value === "string") {
        if (rule.minLength && value.length < rule.minLength) {
          errors[field] =
            rule.message ||
            `Не должно быть меньше ${rule.minLength} символов  `;
          return;
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          errors[field] =
            rule.message || `Не должно превышать ${rule.maxLength} символов  `;
          return;
        }
        if (rule.pattern && !rule.pattern.test(value)) {
          errors[field] = rule.message || "Неверный формат  ";
          return;
        }
      }

      if (typeof value === "number") {
        if (rule.min !== undefined && value < rule.min) {
          errors[field] = rule.message || `Минимальное значение: ${rule.min}  `;
          return;
        }
        if (rule.max !== undefined && value > rule.max) {
          errors[field] = rule.message || `Максимальное значение: ${rule.max}`;
          return;
        }
      }
    });
    return Object.keys(errors).length === 0;
  },
}));
