import React, { FC, PropsWithChildren, createContext, useState } from "react";

import Appwrite from "./service"

type AppContextType = {
    appwrite: Appwrite;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const AppwriteContext = createContext<AppContextType>({
    appwrite: new Appwrite(),
    isLoggedIn: false,
    setIsLoggedIn: () => { }
});

// we declaring this FC (Functional Component) as data type saying that it an functional component;
/******************** As we are assigning FC then we are saying what kind of props we are accepting, this will be sandwiching component thats why we are assigning props with children  **********************/

export const AppwriteProvider: FC<PropsWithChildren> = ({ children }) => {
    // we need state because we need to toggle isLoggedIn and it will be done by setIsLoggedIn
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // default value come exact as same our type
    const defaultValue = {
        appwrite: new Appwrite(),
        isLoggedIn,
        setIsLoggedIn,
    }
    return (
        <AppwriteContext.Provider value={defaultValue}>
            {children}
        </AppwriteContext.Provider>
    );
};

export default AppwriteContext;

