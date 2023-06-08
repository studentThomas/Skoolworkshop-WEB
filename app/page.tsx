export default function HomePage() {
    return (
      <div>
    
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <div className="container" style={{ marginTop: '20px' }}/>
        <div className="container">
          <div className="row">
            <div className="col-md-3 links-section" style={{ backgroundColor: '#f8f9fa' }}>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="#" style={{ color: '#F49700' }}>Home</a>
                </li>
                <li className="list-group-item">
                  <a href="#" style={{ color: '#F49700' }}>About</a>
                </li>
                <li className="list-group-item">
                  <a href="#" style={{ color: '#F49700' }}>Services</a>
                </li>
                <li className="list-group-item">
                  <a href="#" style={{ color: '#F49700' }}>Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-md-9 notifications-section" style={{ backgroundColor: '#F49700', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
              <div className="p-4" style={{ margin: '10px' }}>
                <h3>Notifications:</h3>
                <div className="row">
                <a href="#" style={{ backgroundColor: '#fff', padding: '20px', marginBottom: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2'}}>notification text</a> 
                <a href="#"style={{backgroundColor: '#fff', padding: '20px', marginBottom: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2'}}>notification text</a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }