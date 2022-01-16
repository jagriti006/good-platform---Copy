import React from 'react'
import InviteUserList from "./inviteUserList";
import AdminInviteUserList from "../adminPages/inviteUser/inviteUserList";
import {ROLES} from "../../constants/strings";

const InviteUser = () => {
  const isAdmin = sessionStorage.getItem("userRole") === ROLES.ADMIN ? true : false;

  return isAdmin ? <AdminInviteUserList /> : <InviteUserList />;
}

export default InviteUser