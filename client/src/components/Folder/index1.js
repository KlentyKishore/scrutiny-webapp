import React, { useState, useEffect } from 'react';
import './style.css';

function Folder({ name, children }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClick = () => {
    console.log('clicktest')
    setIsOpen(!isOpen);
  }

  return (
    <div className="folder">
      <div className={`folder__icon ${isOpen ? 'open' : ''}`} onClick={handleClick}></div>
      <div className="folder__name">{name}</div>
      {isOpen && <div className="folder__children">{children}</div>}
    </div>
  );
}

function File({ name }) {
  return (
    <div className="file">{name}</div>
  );
}

function FolderStructure() {
  return (
    <div>
      <Folder name="Folder 1">
        <File name="File 1.1" />
        <File name="File 1.2" />
        <Folder name="Folder 1.3">
          <File name="File 1.3.1" />
        </Folder>
      </Folder>
      <Folder name="Folder 2">
        <File name="File 2.1" />
        <File name="File 2.2" />
        <Folder name="Folder 2.3">
          <File name="File 2.3.1" />
          <File name="File 2.3.2" />
        </Folder>
      </Folder>
    </div>
  );
}

export default FolderStructure;