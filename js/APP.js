import datos from "../Datos/Datos.json" with {type: "json" }; 
import{Docente} from "./Clases.js";

const cuerpotabla = document.querySelector('#Tabla');
const myModal = new bootstrap.Modal('#modalDocente')

let idupdate=null

window.mostrarModal=(id)=>{
    idupdate=id;
    let index=datos.findIndex((item)=>item.id==idupdate);
    
    document.querySelector('#Tipo_Documentomodal').value=datos[index].Tipo_Documento;
    document.querySelector('#Nombremodal').value=datos[index].Nombre;
    document.querySelector('#Apellidomodal').value=datos[index].Apellido;
    document.querySelector('#Fechamodal').value=datos[index].Fecha_Nacimiento;
    document.querySelector('#Nivel_Estudiosmodal').value=datos[index].Nivel_De_Estudios;
    document.querySelector('#Areamodal').value=datos[index].Area;
    document.querySelector('#Gradomodal').value=datos[index].Grado;
    document.querySelector('#EPSmodal').value=datos[index].EPS;
    document.querySelector('#Salariomodal').value=datos[index].salario;

    myModal.show()
}

const actualizar=(e)=>{
    e.preventDefault();
    let index=datos.findIndex((item)=>item.id==idupdate);
    datos[index].Tipo_Documento=document.querySelector('#Tipo_Documentomodal').value
    datos[index].Nombre=document.querySelector('#Nombremodal').value
    datos[index].Apellido=document.querySelector('#Apellidomodal').value
    datos[index].Fecha_Nacimiento=document.querySelector('#Fechamodal').value
    datos[index].Nivel_De_Estudios=document.querySelector('#Nivel_Estudiosmodal').value
    datos[index].Area=document.querySelector('#Areamodal').value
    datos[index].Grado=document.querySelector('#Gradomodal').value
    datos[index].EPS=document.querySelector('#EPSmodal').value
    datos[index].salario=document.querySelector('#Salariomodal').value

    cargar();

    myModal.hide();

}

const cargar=()=>{

    cuerpotabla.innerHTML='';
    datos.map((item)=>{
        const fila=document.createElement('tr')

        const celdas=`
        <th>${item.Tipo_Documento}</th>
        <td>${item.Nombre}</td>
        <td>${item.Apellido}</td>
        <td>${item.Fecha_Nacimiento}</td>
        <td>${item.Nivel_De_Estudios}</td>
        <td>${item.Area}</td>
        <td>${item.Grado}</td>
        <td>${item.EPS}</td>
        <td>$${item.salario}</td>
        <td>
        <div class="d-flex gap-2">
        <button class="btn btn-outline-warning" onclick="mostrarModal(${item.id})"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        <button class="btn btn-outline-danger" onclick="borrar(${item.id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </div>
        </td>
        `;
    
        fila.innerHTML=celdas
        cuerpotabla.append(fila)
    });
};

const agregar=(event) => {
    event.preventDefault();

let id = datos.at(-1).id + 1
let Tipo_Documento = document.querySelector('#Tipo_Documento').value
let Nombre = document.querySelector('#Nombre').value
let Apellido = document.querySelector('#Apellido').value
let Fecha_Nacimiento = document.querySelector('#Fecha').value
let Nivel_De_Estudios = document.querySelector('#Nivel_Estudios').value
let Area = document.querySelector('#Area').value
let Grado = document.querySelector('#Grado').value
let EPS = document.querySelector('#EPS').value
let salario = document.querySelector('#Salario').value

datos.push(new Docente(id, Tipo_Documento, Nombre, Apellido, Fecha_Nacimiento, Nivel_De_Estudios, Area, Grado, EPS, salario))
document.querySelector('#Formulario').reset()
cargar();

}

window.borrar=(id)=>{

    let index=datos.findIndex((item)=>item.id==id)

    let validar=confirm(
        `Desea Eliminar el registro del docente ${datos[index].Nombre}?`);

    if(validar){
        datos.splice(index, 1)
        cargar();
    }
}

cargar();

document.querySelector('#Formulario').addEventListener('submit', agregar);
document.querySelector('#formModal').addEventListener('submit', actualizar);