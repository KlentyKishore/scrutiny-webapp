import React from 'react';
import { useState, useEffect } from 'react';

import SquareLoader from '../../components/SquareLoader';

import API from '../../utils/API';
import errorHandler from '../../utils/errorHandler';

import user from '../../img/user.svg';

import './style.css';

function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState();

  console.log(users, 'users');

  useEffect(() => {
    API.getAllUsers().then((users) => {
      setLoading(false);
      console.log(users, 'msgmsg');
      if (users) {
        setUsers(users.msg);
      }
    });
  }, []);

  const deleteUSer = (userId) => {};

  const changeUserRole = (email, role) => {
    setLoading(true);
    API.updateUserRole({ email, role }).then((res) => {
      setLoading(false);
      if (res.msg === 'ok') {
        setUsers(
          users.map((user) => {
            if (user.email === email) {
              user.role = role;
            }
            return user;
          })
        );
        errorHandler(false, 'User role updated');
      } else {
        errorHandler(true, res.msg);
      }
    });
  };

  return (
    <>
      <SquareLoader loading={loading} />
      <h2>All Users</h2>
      <div class="admin_container">
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>isEmailVerified</th>
            <th>Role</th>
            <th>Remove</th>
          </tr>
          {users &&
            users.map((user) => {
              return (
                <tr>
                  <th>{user.name}</th>
                  <th>{user.email}</th>
                  <th>{user.isEmailVerified ? 'yes' : 'no'}</th>
                  <th>
                    <select
                      name="role"
                      id="cars"
                      value={user.role}
                      onChange={(event) => {
                        changeUserRole(user.email, event.target.value);
                      }}
                    >
                      <option value="regular">Regular</option>
                      <option value="admin">Admin</option>
                    </select>
                  </th>
                  <th>
                    <button
                      onClick={() => {
                        deleteUSer(user._id);
                      }}
                    >
                      Remove
                    </button>
                  </th>
                </tr>
              );
            })}
        </table>
      </div>
    </>
  );
}

export default Users;
