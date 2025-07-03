export const getToken = () => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    return auth.token || null;
  } catch {
    return null;
  }
};

export const getUser = () => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");
    return auth.user || null;
  } catch {
    return null;
  }
};
