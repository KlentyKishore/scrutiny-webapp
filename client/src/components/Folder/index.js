import React, { useState, useEffect } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

function FolderForm() {
  const [folderName, setFolderName] = useState('');
  const [isParent, setIsParent] = useState(false);
  const [parentFolders, setParentFolders] = useState([]);
  const [parentId, setParentId] = useState('');

  useEffect(() => {
    axios
      .get('/user/getParentFolder/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const folders = response.data.msg.map((folder) => {
          return {
            id: folder._id,
            name: folder.folderName,
          };
        });
        setParentFolders(folders);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCreateFolder = async () => {
    try {
      let requestBody = {
        folderName: folderName,
        isParent: isParent,
      };
      if (!isParent) {
        const selectedParentFolder = parentFolders.find(
          (folder) => folder.id === parentId
        );
        requestBody.parentId = selectedParentFolder.id;
      }

      await axios.post('/user/createFolder', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload()
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  return (
    <div>
      <label>
        Folder Name:
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Is Parent Folder?
        <input
          type="radio"
          value="true"
          checked={isParent}
          onChange={() => setIsParent(true)}
        />
        Yes
        <input
          type="radio"
          value="false"
          checked={!isParent}
          onChange={() => setIsParent(false)}
        />
        No
      </label>
      {!isParent && (
        <>
          <br />
          <label>
            Parent Folder:
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value="">Select parent folder</option>
              {parentFolders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </label>
        </>
      )}
      <br />
      <button onClick={handleCreateFolder}>Create Folder</button>
    </div>
  );
}

export default FolderForm;
