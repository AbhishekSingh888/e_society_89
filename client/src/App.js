import './App.css';

function App() {
  return (
    <>
      <div className="container">
        <h1 className='display-1 text-center text-primary'>Grid System</h1>
        <div className="row">
          <div className="col-3 border mx-1">
            <h5 className='text-center text-primary'>User Details</h5>
          </div>
          <div className="col-5 border mx-1">
            <h5 className='text-center text-primary'>Feed</h5>
          </div>
          <div className="col-3 border mx-1">
            <h5 className='text-center text-primary'>Search</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
