import { Button, Container, Nav, Navbar } from "react-bootstrap"

function AppNavbar() {
    return (
        <Navbar variant="dark" bg="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/">Calendar App</Navbar.Brand>

                <Nav className="ml-auto">
                    <Nav.Link href="/groups">Groups</Nav.Link>
                    
                    <Button href="/oauth2/authorization/google">Log In</Button>
                </Nav>

            </Container>
        </Navbar>
    )
}

export default AppNavbar