import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './components/Landing';
import SignUpPage from './components/SignUp';
import SignInPage from './components/SignIn';
import PasswordForgetPage from './components/PasswordForget';
import HomePage from './components/Home';
import AccountPage from './components/Account';
import AdminPage from './components/Admin';
import RecommendPage from './components/Recommend';

import * as ROUTES from './constants/routes';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<div>
						<Navigation />
						<Route exact path={ROUTES.LANDING} component={LandingPage} />
						<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
						<Route path={ROUTES.SIGN_IN} component={SignInPage} />
						<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
						<Route path={ROUTES.HOME} component={HomePage} />
						<Route path={ROUTES.ACCOUNT} component={AccountPage} />
						<Route path={ROUTES.ADMIN} component={AdminPage} />
						<Route path={ROUTES.RECOMMEND} component={RecommendPage} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;