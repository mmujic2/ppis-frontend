import React from 'react'
import authService from '../../../util/auth.service'
import UnauthorizedAccess from '../../shared/UnauthorizedAccess';
import Header from '../../shared/header';
import Form from './Form'

function CreateTicket() {
    const user = authService.getCurrentUser();
  return (
    <div>
    <Header></Header>
    {user.role == "sd_user" ? <Form></Form> : <UnauthorizedAccess></UnauthorizedAccess>}
    </div>
  )
}

export default CreateTicket