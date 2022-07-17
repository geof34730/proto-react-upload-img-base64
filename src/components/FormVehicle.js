import React from 'react'
import axios from 'axios';

class FormVehicle extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedImage: [],
        }
        this.handleFileChange = this.onFileChange.bind(this);
        this.handleSubmit = this.onSubmit.bind(this);
        this.upadateListeImage = this.updateListeImage.bind(this);
    }

    onFileChange(e) {
        const preview = document.querySelector('img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
        reader.addEventListener("load", this.upadateListeImage.bind(reader.result), false);
        if (file) {
            reader.readAsDataURL(file);
        }
    }

    updateListeImage (reader) {
        let imageSrcData=reader["srcElement"]['result']
        let copySelectImage=[...this.state.selectedImage];
        copySelectImage.push(imageSrcData);
        this.setState({
            selectedImage:copySelectImage
        });
    }

    onSubmit(event){
        console.log('onsubmit')
        event.preventDefault();
        const url = "http://localhost:4000/api/vehicles";
       // const url = "http://localhost:4000/api/vehicles/62d412491c81d900cbadd7dd";
        const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTgwNTk4NzIsImV4cCI6MTY1ODA3MDY3Mn0.tQlf7q1jpC9aI5DUiSFz80ULBtSaEJWUnlApe1ObwNk'
        const formData = {
            name:"geoffrey 5",
            brand: "Peugeot 5",
            color: 'jaune',
            model: "508",
            type: "break",
            year: "2016",
            price: "20000",
            statut: "stock",
            image: this.state.selectedImage
        }
        console.log(formData);


        //axios.put(url, formData, {
        axios.post(url, formData, {
            headers: {
                'Authorization': `${token}`
            },
        }).then((res) => {
            console.log(res);
        });



    }


render(){
    console.log('coucou state:   ',this.state)
    return(

        <>
            <div className="container">
                <h3 className="m-4">Création/Modification Véhicule</h3>
                <form onSubmit={this.handleSubmit} id="formVehicle">
                    <div className="form-group">
                        <label htmlFor="Marque">Marque</label>
                        <input type="text" className="form-control" id="marque" placeholder="Peugeot" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Année">Année</label>
                        <input type="text" className="form-control" id="years" placeholder="2001" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Modele">Modele</label>
                        <input type="text" className="form-control" id="modele" placeholder="Punto" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="color">Couleur</label>
                        <input type="text" className="form-control" id="color" placeholder="Blanche" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <input type="text" className="form-control" id="type" placeholder="" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Prix</label>
                        <input type="text" className="form-control" id="price" placeholder="10" />
                    </div>

                        <div className="form-group row">
                            <label htmlFor="files">Photos du véhicule</label>
                            <input type="file" name="filesVehicle" id="filesVehicle" onChange={this.handleFileChange}/>
                        </div>
                        <div className="d-flex">
                            {



                               this.state.selectedImage.map((image,imageIndex) =>
                                    <div className="p-3"><img width='200' src={image} /></div>
                                )

                            }
                        </div>
                    <button className="btn btn-success m-4" type="submit">Crée le devis</button>
                </form>
            </div>
        </>
    )
}
}


export default FormVehicle;