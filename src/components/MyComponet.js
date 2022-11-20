import React from "react";

class MyComponent extends React.Component {

    render() {
        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'QuesoVeg', 'champiñones'],
            calorias: 400
        }

        return (
            <div className="mi-componente">
                <h1>{'Receta: ' + receta.nombre}</h1>
                <h2>{'Calorias: ' + receta.calorias}</h2>

                
                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            )

                        })
                    }
                </ol>

                <hr/>

                {this.props.saludo &&
                    <React.Fragment>
                        <h1>Desde una prop:</h1>
                        <h3>{this.props.saludo}</h3>
                    </React.Fragment>
                }
            </div>


        )
    }
}

export default MyComponent;