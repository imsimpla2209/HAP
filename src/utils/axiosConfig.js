export const base_url = "http://localhost:5000/api/"

const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

// export const getConfig = () => {
//   const token = localStorage.getItem("customer");
//   const authToken = token ? JSON.parse(token).token : "";
  
//   return {
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//       Accept: "application/json",
//     },
//   };
// };