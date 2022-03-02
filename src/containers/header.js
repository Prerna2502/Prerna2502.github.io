import React from "react";
import {Header} from '../compoments';
import * as ROUTES from '../constants/routes'
import logo from '../logo.png'

export function HeaderContainer({children, ...restProps}) {
    return(
        <Header>
            <Header.Frame>
                <Header.Logo to={ROUTES.HOME} alt = "Indian Movies" src={logo}/>
                <Header.ButtonLink to={ROUTES.SIGN_IN} >Sign In</Header.ButtonLink>
            </Header.Frame>
            {children}
        </Header>
    );
}