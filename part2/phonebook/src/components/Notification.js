import React from 'react';

const clearNotification = (clearStateFunc) => {
  setTimeout(clearStateFunc, 5000);
}

const Notification = ({notificationObj}) => {
  const successStye = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  };

  const failureStyle = {...successStye, color: 'red'};
  
  if (notificationObj === null) {
    return null;
  };

  const notificationClass = notificationObj.success
    ? successStye
    : failureStyle;

  return (
    <div style={notificationClass}>
      {notificationObj.message}
    </div>
  );
}

export default Notification;
export {clearNotification}