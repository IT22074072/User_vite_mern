const whiteList = [
    "https://www.yoursite.com",
    "http://localhost:5173",
  ];
  
  const corsOption = {
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed By CORS"));
      }
    },
    optionalSuccessStatus: 200,
    credentials: true, // Allow credentials (cookies) to be included
  };
  
  export default corsOption;