import React from 'react'

const stylecardcss = () => {
  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
                  <style jsx global>{`
                      .card-gaming {
                          background: transparent;
                          transition: transform 0.3s ease, box-shadow 0.3s ease, z-index 0.3s ease;
                          z-index: 1;
                          position: relative;
                          overflow: hidden;
                      }
                      .card-gaming:hover {
                          transform: scale(1.05);
                          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
                          z-index: 10;
                      }
                      .card-content {
                          text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
                          position: absolute;
                          bottom: 0;
                          left: 0;
                          padding: 1rem;
                          color: white;
                          font-family: 'Arial', sans-serif;
                          font-weight: bold;
                          text-transform: uppercase;
                      }
                  `}</style>
    </div>
  )
}

export default stylecardcss
