// import React, { Component } from 'react';
// import Login from './login/login'
// import Home from './Home'
// import {Redirect} from 'react-router'
// import { BrowserRouter as Router, Route } from "react-router-dom";

// const fakeAuth = {
//     isAuthenticated: false,
//     authenticate(cb) {
//         this.isAuthenticated = true
//         setTimeout(cb, 100);
//     },
//     signout(cb) {
//         this.isAuthenticated = false
//         setTimeout(cb, 100)
//     }
// }

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//         fakeAuth.isAuthenticated === true
//             ? <Component {...props} />
//             : <Redirect to={{
//                 pathname: '/',
//                 state: { from: props.location},
//                 fakeAuth={fakeAuth}
//             }}/>
//     )} />
// )

// export default function AuthExample() {
//     return (
//         <Router>
//             <div>
//                 <Route path="/" component={Login} />
//                 <PrivateRoute path='/dashboard' component={Home} />
//             </div>
//         </Router>
//     )
// }