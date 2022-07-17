import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ImageUpload from './components/ImageUpload'
import FormVehicle from './components/FormVehicle'

function App() {
    return (
        <div className="App container">
            <FormVehicle/>
        </div>
    );
}

export default App;