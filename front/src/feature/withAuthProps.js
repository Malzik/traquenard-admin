import React          from 'react'
import { AuthContext } from "./login/AuthContext";

const withAuthProps = (Component) => {
    return (props) => (
        <AuthContext.Consumer>
            {({ loggedIn, setLoggedIn }) => (
                <Component
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    {...props}
                />
            )}
        </AuthContext.Consumer>
    )
}

export default withAuthProps