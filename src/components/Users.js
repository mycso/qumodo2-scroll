import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';

const User = ({ users, searchTerm, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
    <div className="card">
        {users.map(({owner}) => {
            return (
            <Card key={owner.id}>
                <Image src={owner.avatar_url} wrapped ui={false} />
                <Card.Content>
                <Card.Header>{owner.login}</Card.Header>
                <br/>
                <br/>
                <a className="title" href={owner.html_url} target="_blank" rel="noreferrer">
                    <Icon name='user' />
                    {owner.html_url}
                </a>
                </Card.Content>
            </Card>
            );
        })}
    </div>
    );
};

export default User;