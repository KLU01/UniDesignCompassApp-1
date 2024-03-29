import { Link, navigate } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logOutUser } from '../state/actions';

const signedIn=(props)=>{
  if(props.isAuthenticated){
    return(<NavItem><Link style={styles.link} activeStyle={styles.linkActive}  rel="profile" to="/Profile">Profile</Link></NavItem>)
  }
}

const Header = (props) => {
  return (
    <Navbar collapseOnSelect sticky="top" expand="md" bg="dark" variant="dark">
      <Navbar.Brand variant="light"> <Link to="/" style={styles.link}> {props.siteTitle}</Link> </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <NavItem><Link style={styles.link} activeStyle={styles.linkActive} rel="about" to="/About">About Us</Link></NavItem>
          <NavItem><Link style={styles.link} activeStyle={styles.linkActive} rel="compass" to="/Compass">Compass</Link></NavItem>
          <NavItem><Link style={styles.link} activeStyle={styles.linkActive} rel="analytics" to="/Analytics">Analytics</Link></NavItem>
          {signedIn(props)}
          {
            props.isAuthenticated ?
              (<NavItem><Link style={styles.link} rel="logout" to="/" onClick={() => { props.logOutUser(); navigate("/"); }}>Logout</Link></NavItem>)
              : (<NavItem><Link style={styles.link} activeStyle={styles.linkActive} rel="login" to="/Login">Login</Link></NavItem>)
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

const styles = {
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  linkActive: {
    textDecoration: 'underline'
  }
}

Header.propsTypes = {
  isAuthenticated: PropTypes.bool,
  authenticateUser: PropTypes.func
}

const mapStateToProps = ({ state }) => ({
  isAuthenticated: state.isAuthenticated
})
const mapDispatchToProps = dispatch => ({
  logOutUser: () => dispatch(logOutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

