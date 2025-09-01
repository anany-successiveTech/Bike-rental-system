    const checkAuth = () => {
      try {
        const storedUserData = localStorage.getItem("user");
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
          setIsAuthenticated(true);
        } else {
          setUserData(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUserData(null);
        setIsAuthenticated(false);
      }
      setIsHydrated(true);
    };

    export default checkAuth;