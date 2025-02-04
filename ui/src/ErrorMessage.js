

export function ErrorMessage({ children }) {
  return (
    <div style={{
            position: 'fixed',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'red',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid darkred',
            boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
            zIndex: 1000
        }}>
      {children}
    </div>
  );
}