import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "pkrfFormData";

const initialFormData: any = {
  clientType: "member",
  kpp: "FTCC Health Clinic",
  person: {
    philHealthIdNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    birthDate: "",
    age: undefined,
    mobileNumber: "",
    gender: "",
  },
  address: [
    {
      houseNo: "",
      street: "",
      barangay: "",
      barangayCode: "",
      city: "",
      cityCode: "",
      province: "",
      provinceCode: "",
      zipCode: "",
      country: "Philippines",
      type: "current",
    },
  ],
  account: {
    email: "",
    mobileNumber: "",
    mpin: "",
  },
  validation: {
    isMobileNumberValid: false,
    isEmailValid: false,
    isCertifyTheData: false,
  },
};

const getInitialFormData = (): any => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (e) {
        console.error("Failed to parse saved PKRF form data:", e);
      }
    }
  }
  return initialFormData;
};

export const usePKRFForm = () => {
  const [formData, setFormData] = useState<any>(getInitialFormData);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  return { formData, setFormData };
};
