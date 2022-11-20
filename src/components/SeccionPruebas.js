import React from 'react';

import MyComponent from './MyComponet';

class SeccionPruebas extends React.Component {
    
    // declaramos una variable de estado count
    count = 0;
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }     
    

    HolaMundo(nombre, edad) {
        var presentacion = <div>
            <h2>Hola mundo soy, {nombre}</h2>
            <h3> Tengo {edad} años</h3>
        </div>;

        return presentacion;
    }

    render() {
        var nombre = "Esteban Villamizar";
        return (
            <section id="content">
                <h2 className='subheader'>Ultimos Articulos</h2>
                <p>
                    Hola bienvenido al curso de React para Front-end Development
                </p>

                <h2 className='subheader'>Funciones y JSX basico</h2>
                {this.HolaMundo(nombre, 27)}

                <h2 className='subheader'>Componentes</h2>
                <section className='componentes'>
                    <MyComponent></MyComponent>
                    
                </section>

                <h2 className='subheader'>Estado</h2> {/* React State */}

                <p>
                    Contado: {this.state.count}
                </p>
                <p>
                    <input type='button' value="Sumar" onClick={() => this.setState({ count: this.state.count +1})}   />
                    <input type='button' value="Restar" onClick={() => this.setState({ count: this.state.count -1})} />
                </p>

            </section>
        );
    }
}

export default SeccionPruebas;