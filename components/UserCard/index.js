import React from 'react';
import SignOutButton from '../SignOut';
import { useSelector } from 'react-redux';
import { Card, Skeleton, Avatar, Button } from 'antd';
import * as ROUTES from '../../constants/routes';
import * as IMGSRC from '../../constants/imgSources'

const UserCard = ({collapse}) => {
  const userStorage = useSelector(state => (state.User))

  return userStorage.auth ? <UserCardAuth collapse={collapse}/> : <UserCardNonAuth />
}

const UserCardAuth = ({collapse}) => {
  console.log(collapse)
  return (
    <Card
      bodyStyle={{
        backgroundColor: 'black',
        border: 0
      }}
      id="UserCard"
    >
    <div style={{paddingBottom:"20px"}}>
      <Skeleton loading={false} avatar active>
        <Card.Meta
          id="Meta"
          avatar={<Avatar src={IMGSRC.TempUserProfile} />}
          title={<div id="UserCardTitle">박규영</div>}
        />
      </Skeleton>
    </div>
      {collapse ? null : <SignOutButton/>}
      <style jsx="true">{style}</style>
    </Card >
  )
}

const UserCardNonAuth = () => {
  return (
    <Card
      bodyStyle={{
        backgroundColor: 'black',
        border: 0
      }}
      id="UserCard"
    >
      <Button id="SignInButton" href={ROUTES.SIGN_IN}>
        Sign In
      </Button>
      <style jsx="true">{style}</style>
    </Card>
  )
}

const style = `
#UserCardTitle {
  font-size: 30;
  color: gray;
}
#UserCardDescription {
  font-size: 10;
  color: gray;
}
#UserCard {
  width: 200;
  margin-bottom: 40;
  margin-top: 40;
  background-color: rgba(255, 255, 255, 0.0);
  border: 0;
}
#SignInButton {
  background-color: rgba(255, 255, 255, 0.0);
  border: 0;
  margin-left: 10;
  font-size: 20;
  color: #08c;
}
#Meta {
  color: #08c;
  marginBottom: 10;
}
`


export default UserCard
