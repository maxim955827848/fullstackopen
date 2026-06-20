import React from 'react'

const StatusBanner = ({ text, isAlert }) => {
  if (text === null) {
    return null
  }

  const BannerStyle = {
    color: isAlert ? '#d32f2f' : '#388e3c',
    background: '#f5f5f5',
    fontSize: '18px',
    border: `3px solid ${isAlert ? '#d32f2f' : '#388e3c'}`,
    borderRadius: '6px',
    padding: '12px',
    marginBottom: '15px',
    fontWeight: 'bold'
  }

  return (
    <div style={BannerStyle}>
      {text}
    </div>
  )
}

export default StatusBanner