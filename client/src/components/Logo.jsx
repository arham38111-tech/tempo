import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <div className={className}>
      <style>{`
        .logo-text {
          background: linear-gradient(135deg, #1565C0 0%, #FFD600 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          font-size: 1.8rem;
          letter-spacing: -0.5px;
          text-transform: uppercase;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1));
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .logo-text-small {
          font-size: 1.2rem;
        }

        .logo-text-large {
          font-size: 2.5rem;
        }
      `}</style>
      <span className="logo-text">Tempo</span>
    </div>
  );
};

export default Logo;
