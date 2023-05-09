import React, { useEffect, useState } from 'react';
import axios from 'axios';

const token = localStorage.getItem('token');

function Dropdown({ onSelect }) {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [subOptions, setSubOptions] = useState([]);
  const [selectedSubOption, setSelectedSubOption] = useState('');

  useEffect(() => {
    axios.get('/user/getParentFolder/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      const folders = response.data.msg.map(folder => {
        return {
          id: folder._id,
          name: folder.folderName
        };
      });
      setOptions(folders);
    })
    .catch(error => console.error(error));
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedSubOption('');
    if (event.target.value !== '') {
      axios.get(`/user/getSubfolder/${event.target.value}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        const subFolders = response.data.msg.map(subFolder => {
          return {
            id: subFolder._id,
            name: subFolder.folderName
          };
        });
        setSubOptions(subFolders);
      })
      .catch(error => console.error(error));
    } else {
      setSubOptions([]);
    }
  };

  const handleSubOptionChange = (event) => {
    setSelectedSubOption(event.target.value);
    if (event.target.value !== '') {
      onSelect(selectedOption, event.target.value);
    }
  };

  return (
    <div>
      <label>Parent Folder: </label>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select a parent folder</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {subOptions.length > 0 && (
        <div>
          <label>Sub-Folder: </label>
          <select value={selectedSubOption} onChange={handleSubOptionChange}>
            <option value="">Select a sub-folder</option>
            {subOptions.map(subOption => (
              <option key={subOption.id} value={subOption.id}>
                {subOption.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
