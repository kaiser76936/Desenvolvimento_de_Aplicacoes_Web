export const validator = {
    isEmail: (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    isPositiveNumber: (num: number): boolean => {
      return num > 0;
    }
};