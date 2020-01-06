import React from 'react';
import { Button } from 'antd';
import { getFireAuth } from '../../helpers/firebaseHelper'
import { useDispatch } from 'react-redux'
import { userSignOut } from '../../reducers/User'

const SignOutButton = () => {
  const dispatch = useDispatch()

  const onUserSignOutButtonClick = () => {
    dispatch(userSignOut())
    getFireAuth().signOut()
  }

  return (
    <Button type="primary" onClick={onUserSignOutButtonClick}>
      Sign Out
    </Button>
  )
}

export default SignOutButton
