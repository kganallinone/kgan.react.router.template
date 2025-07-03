import { authService } from "@/services/auth.service";
import { formatPhoneNumber } from "@/utils/format.utils";
import { uselocalStorage } from "@/utils/localstorage.utils";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useAuth() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState(Array(6).fill(""));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("phone");

  const [pinError, setPinError] = useState(false);
  const pinInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const notify = () => toast.error("Coming Soon.");

  useEffect(() => {
    pinInputRefs.current = pinInputRefs.current.slice(0, 6);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handlePinInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setPinError(false);
    if (value && index < 5) {
      pinInputRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!pin[index] && index > 0) {
        const newPin = [...pin];
        newPin[index - 1] = "";
        setPin(newPin);
        pinInputRefs.current[index - 1]?.focus();
      } else {
        const newPin = [...pin];
        newPin[index] = "";
        setPin(newPin);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      pinInputRefs.current[index + 1]?.focus();
    }
  };

  const handlePinPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pastedData) {
      const newPin = [...pin];
      for (let i = 0; i < pastedData.length; i++) {
        if (i < 6) newPin[i] = pastedData[i];
      }
      setPin(newPin);
      if (pastedData.length < 6) {
        pinInputRefs.current[pastedData.length]?.focus();
      } else {
        pinInputRefs.current[5]?.focus();
      }
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);

      // Remove "+" and all spaces
      const sanitizedPhone = phoneNumber.replace(/\+|\s/g, "");

      const res = await authService.login({
        identifier: sanitizedPhone,
        password: pin.join(""),
      });

      uselocalStorage.set("auth", {
        token: res.token,
        user: res.user,
      });

      if (res) {
        toast.success("Login successful!");
        navigate("/0/home");
      }
    } catch (err) {
      toast.error("Login failed!");
      setIsLoading(false);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isPinComplete = pin.every((digit) => digit !== "");
  const isPhoneComplete = phoneNumber.length >= 14;

  return {
    showPassword,
    setShowPassword,
    showPin,
    setShowPin,
    phoneNumber,
    setPhoneNumber,
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    activeTab,
    setActiveTab,
    pinError,
    pin,
    pinInputRefs,
    handlePhoneChange,
    handlePinInputChange,
    handlePinKeyDown,
    handlePinPaste,
    handleLogin,
    isPinComplete,
    isPhoneComplete,
    notify,
    navigate,
  };
}
