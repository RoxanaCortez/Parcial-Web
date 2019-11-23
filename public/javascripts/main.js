obras();

//console.log(document.forms.formRegistrar.nombre.value);
//formulario para registrar
document.querySelector("#formRegistrar").addEventListener('submit', function (e) {
    e.preventDefault();
    let data = { 
        nombre: document.querySelector("#nombre").value,    //document.forms.formRegistrar.nombre.value,
        fecha: document.querySelector("#fecha").value,    //document.forms.formRegistrar.fecha.value,
        tipo: document.querySelector("#tipo").value,    //document.forms.formRegistrar.tipo.value,
        invaluable: document.querySelector("#invaluable").value    //document.forms.formRegistrar.invaluable.value
    }
    console.log(data);
    fetch('/obra', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Tarea insertada con exito");
            obras();
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados");
            console.log(err);
        });
});
//formulario para actualizar
document.forms.formUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
        nombre: document.forms.formUpdate.nombreU.value,
        fecha: document.forms.formUpdate.fechaU.value,
        tipo: document.forms.formUpdate.tipoU.value,
        invaluable: document.forms.formUpdate.invaluableU.value
    }
    //peticion
    fetch('/obra/' + document.forms.formUpdate._id.value, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Obra Actualizada con exito");
            obras();
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados");
            console.log(err);
        });
});

//crear obras
function obras() {
    fetch('/obra',
        {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(element => {
                console.log(element);
                filas = filas + `<tr>
           <td>${element.nombre}</td>
           <td>${element.fecha}</td>
           <td>${element.tipo}</td>
           <td>${element.invaluable}</td>
           <td>
            <a href="/obra/${element._id}" class="update btn btn-warning" data-toggle="modal" data-target="#exampleModal">Actualizar</a>
            <a href="/obra/${element._id}" class="delete btn btn-danger">Eliminar</a>
           </td>
           </tr>`
            });
            document.querySelector("#tbody_id").innerHTML = filas;
            //agregando los eventos para actualizar 
            let btn_update = document.querySelectorAll('.update');
            btn_update.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    console.log(url);
                    fetch(url, {
                        method: "GET"
                    }).then(res => res.json())
                        .catch(err => console.error(err))
                        .then(response => {
                            document.forms.formUpdate._id.value = response._id;
                            document.forms.formUpdate.nombreU.value = response.nombre;
                            document.forms.formUpdate.fechaU.value = response.fecha;
                            document.forms.formUpdate.tipoU.value = response.tipo;
                            document.forms.formUpdate.invaluableU.value = response.invaluable;
                        });
                });
            });
            let btn_delete = document.querySelectorAll('.delete');
            btn_delete.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    //peticion para eliminar
                    fetch(url, {
                        method: "DELETE",
                    }).then(res => res.json())
                        .then(response => {
                            alert("Obra eliminada con exito");
                            obras();
                        })
                        .catch(err => {
                            alert("Ocurrio un error al eliminar la obra");
                            console.log(err);
                        });
                });
            })
        })
}
