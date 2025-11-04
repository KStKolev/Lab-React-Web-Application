import { renderHook, act } from "@testing-library/react";
import { useSignInValidation, useSignUpValidation, useChangePasswordValidation } from "../useAuthValidation";

describe("useAuthValidation Hooks", () => {
  describe("useSignInValidation", () => {
    it("should return no errors for valid inputs", () => {
      const { result } = renderHook(() => useSignInValidation());

      act(() => {
        const isValid = result.current.validateInputs("testuser", "password123");
        expect(isValid).toBe(true);
      });

      expect(result.current.errors).toEqual({});
    });

    it("should return error for empty username", () => {
      const { result } = renderHook(() => useSignInValidation());

      act(() => {
        const isValid = result.current.validateInputs("", "password123");
        expect(isValid).toBe(false);
      });

      expect(result.current.errors.username).toBe("Username is required.");
    });

    it("should return error for empty password", () => {
      const { result } = renderHook(() => useSignInValidation());

      act(() => {
        const isValid = result.current.validateInputs("testuser", "");
        expect(isValid).toBe(false);
      });

      expect(result.current.errors.password).toBe("Password is required.");
    });
  });

  describe("useSignUpValidation", () => {
    it("should return no errors for valid inputs", () => {
      const { result } = renderHook(() => useSignUpValidation());

      act(() => {
        const isValid = result.current.validateInputs("testuser", "Password123!", "Password123!");
        expect(isValid).toBe(true);
      });

      expect(result.current.errors).toEqual({});
    });

    it("should return error for weak password", () => {
      const { result } = renderHook(() => useSignUpValidation());

      act(() => {
        const isValid = result.current.validateInputs("testuser", "weak", "weak");
        expect(isValid).toBe(false);
      });

      expect(result.current.errors.password).toContain("Password must be at least 8 characters");
    });

    it("should return error for password mismatch", () => {
      const { result } = renderHook(() => useSignUpValidation());

      act(() => {
        const isValid = result.current.validateInputs("testuser", "Password123!", "Password456!");
        expect(isValid).toBe(false);
      });

      expect(result.current.errors.confirmPassword).toBe("Passwords do not match.");
    });
  });

  describe("useChangePasswordValidation", () => {
    it("should return no errors for valid inputs", () => {
      const { result } = renderHook(() => useChangePasswordValidation());

      act(() => {
        const isValid = result.current.validateInputs("OldPass123!", "NewPass123!", "OldPass123!");
        expect(isValid).toBe(true);
      });

      expect(result.current.errors).toEqual({});
    });

    it("should return error for empty old password", () => {
      const { result } = renderHook(() => useChangePasswordValidation());

      act(() => {
        const isValid = result.current.validateInputs("", "NewPass123!", "OldPass123!");
        expect(isValid).toBe(false);
      });

      expect(result.current.errors.oldPassword).toBe("Old password is required");
    });

    it("should return error for incorrect old password", () => {
      const { result } = renderHook(() => useChangePasswordValidation());

      act(() => {
        const isValid = result.current.validateInputs("WrongPass123!", "NewPass123!", "OldPass123!");
        expect(isValid).toBe(false);
      });

      expect(result.current.errors.oldPassword).toBe("Old password is incorrect");
    });
  });
});
