import React from "react";
import { Card, Col } from 'react-bootstrap';

function inviteCard( { groupName }) {
    return (
        <Card>
            <Card.Body style={{ width: '100%', cursor: 'pointer' }}>
                <Card.Title>{groupName}</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default inviteCard