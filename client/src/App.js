import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Posts from "./pages/posts";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Goals from "./pages/goals";
import Hash from "./pages/hash";
import Home from "./pages/home";
import Yt from "./pages/yt";
import Login from "./sections/login";
import NotFound from "./sections/not-found";
import Top from "./sections/top";
import Navbar from "react-bootstrap/Navbar";

const checkAuth = () => {
  const access_token = localStorage.getItem("access_token"); // Get "access_token".`
  const refresh_token = localStorage.getItem("refresh_token"); // Get expiration date.

  if (!access_token || access_token.length < 200 || !refresh_token) {
    // If there's not access_token, refresh_token & if the length of the access_token is less than 212, return false.
    localStorage.clear();
    return false;
  }

  try {
    if (refresh_token < new Date().getTime() / 1000) {
      // If refresh_token < current date, return false.
      localStorage.clear();
      return false;
    }
  } catch (e) {
    localStorage.clear();
    return false; // If any error whatsoever, return false.
  }

  return true;
};

function handleSubmit() {
  localStorage.clear();
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      checkAuth() ? ( // If authenticated, then show the navigation menu and everything else.
        <div className="container">
          <Top/>
          <Container>
            <div className="fixed-top">
              <Navbar>
                <Navbar.Collapse>
                  <Nav className="mr-auto">
                    <Nav.Link eventKey="2" href="/" title="home" className="menu">home</Nav.Link>
                    <Nav.Link eventKey="3" href="/posts" title="posts" className="menu">posts</Nav.Link>
                    <Nav.Link eventKey="4" href="/goals" title="goals" className="menu">goals</Nav.Link>
                    <Nav.Link eventKey="4" href="/hash" title="hash" className="menu">hash</Nav.Link>
                    <Nav.Link eventKey="4" href="/yt" title="yt" className="menu">yt</Nav.Link>
                  </Nav>
                  <Nav className="justify-content-end">
                    {/* <Nav.Link eventKey="4" href="/" title="out" className="menu" onClick={handleSubmit}>share</Nav.Link> */}
                    <Nav.Link eventKey="4" href="/" title="out" className="menu" onClick={handleSubmit}>out</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
            <Component {...props} />
          </Container>
        </div>
      ) : (
        // If not authenticated, return to "/login" page.
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

// "AuthRoute" is for the authenticated user. If you're not logged in, you won't have access to those pages.

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <AuthRoute exact path="/posts" component={Posts} />
      <AuthRoute exact path="/goals" component={Goals} />
      <AuthRoute exact path="/hash" component={Hash} />
      <AuthRoute exact path="/home" component={Home} />
      <AuthRoute exact path="/yt" component={Yt} />
      <AuthRoute exact path="/" component={Home} />
      <AuthRoute exact path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);
