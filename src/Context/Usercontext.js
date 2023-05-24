import { createContext, useState } from "react";

export const Usercontextinfo= createContext()


function Usercontext({ children }) {

    const [userinfo, setuserinfo] = useState({})
    return (
        <Usercontextinfo.Provider value={{ userinfo,setuserinfo}}>
            {children}
        </Usercontextinfo.Provider>
    )
}

export default Usercontext




 














