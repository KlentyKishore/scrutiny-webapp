import React from 'react';
import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';

import SquareLoader from '../../components/SquareLoader';

import API from '../../utils/API';
import errorHandler from '../../utils/errorHandler';

import user from '../../img/user.svg';

import './style.css';

function AccessList() {
  const [loading, setLoading] = useState(true);
  const [accessLists, setAccessLists] = useState();

  useEffect(() => {
    API.getAllAccessList().then((res) => {
      setLoading(false);
      if (res.status === 'sucess') {
        setAccessLists(res.msg);
      } else {
        errorHandler(true, res.msg);
      }
    });
  }, []);

  const giveAccess = (questionId, email) => {
    setLoading(true);
    API.giveAccess({ questionId, email }).then((res) => {
      setLoading(false);
      if (res.status === 'ok') {
        setAccessLists(
            accessLists.map((accessList) => {
            if (accessList.email === email && accessList.questionId === questionId) {
              user.acessGiven = true;
            }
            return accessList;
          })
        );
        errorHandler(false, 'User role updated');
      } else {
        errorHandler(true, res.msg);
      }
    });
  };

  const revokeAccess = (questionId, email) => {
    setLoading(true);
    API.revokeAccess({ questionId, email }).then((res) => {
      setLoading(false);
      if (res.status === 'ok') {
        setAccessLists(
            accessLists.map((accessList) => {
            if (accessList.email === email && accessList.questionId === questionId) {
              user.acessGiven = false;
            }
            return accessList;
          })
        );
        errorHandler(false, 'User role updated');
      } else {
        errorHandler(true, res.msg);
      }
    });
  };

  const deleteAccess = (accessId) => {
    setLoading(true);
    API.deleteAccess({ accessId }).then((res) => {
      setLoading(false);
      if (res.status === 'ok') {
        setAccessLists(
            accessLists.filter((accessList) => {
            // console.log(accessList._id === accessId)
            if (accessList._id === accessId) {
              return false
            }
            return true;
          })
        );
        errorHandler(false, 'Deleted');
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
            <th>Email</th>
            <th>Access Given</th>
            <th>Permission</th>
            <th>Remove</th>
            <th>Impact Region</th>
            <th>Delete</th>
          </tr>
          {accessLists &&
            accessLists.map((accessList) => {
              return (
                <tr>
                  <th>{accessList.email}</th>
                  <th>{accessList.acessGiven ? 'Yes' : 'No'}</th>
                  <th>
                    <button
                      onClick={() => {
                        giveAccess(accessList.questionId, accessList.email);
                      }}
                    >
                      Give Access
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => {
                        revokeAccess(accessList.questionId, accessList.email);
                      }}
                    >
                      Revoke Access
                    </button>
                  </th>
                  <th>
                  <Link to={`/user/edit/question/${accessList.questionId}`}>
                      Question
                  </Link>
                  </th>
                  <th>
                  <button
                      onClick={() => {
                        deleteAccess(accessList._id);
                      }}
                    >
                      Delete Access
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

export default AccessList;
