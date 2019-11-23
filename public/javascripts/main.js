window.onload = () => {
    app.init();
}

let app = {
    init: function () {
        this.addEvents();
        this.loadContent();
    },
    addEvents: function () {
        document.postForm.addEventListener("submit", (event) => {
            this.submitGet(event, this.addRow);
        });
    },
    addRow: function (data) {
        let tbody = document.getElementsByClassName("get")[0];
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${data.nombre} </td>
                        <td>${data.fecha}</td>
                        <td>${data.tipo}</td>
                        <td>${data.invaluable}</td>
                        <td>
                            <a href="#" class="delete"> Delete </a> 
                            <a href="#" class="update"> Update </a>
                        </td>`;
        tr.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
            this.deleteGet(event, data, tr, tbody);
        });
        tr.getElementsByClassName("update")[0].addEventListener("click", (event) => {
            this.updateGet(tr, tbody, data);
        });
        tbody.appendChild(tr);
    },
    updateGet: function(tr, tbody, data) {
        tr.innerHTML = `
                                <td colspan="3"> 
                                    <form action="/api/get">
                                        <input type="text" name="nombre" readonly value="${data.nombre}">
                                        <input type="text" name="fecha" value="${data.fecha}">
                                        <input type="text" name="tipo" value="${data.tippo}">
                                        <input type="text" name="inivaluable" value="${data.tipo}">
                                        <input type="submit" value="Save">
                                        <input type="button" value="Cancel">
                                    </form>
                                </td>`;
        let form = tr.getElementsByTagName("form")[0];
        let deleteGet = this.deleteGet;
        let update = this.updateGet;

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            let dataForm = {
                nombre: form.nombre.value,
                fecha: form.fecha.value,
                tipo: form.tipo.value,
                invaluable: form.invaluable.value
            };
            fetch('/api/get/' + data._id, {
                    method: 'PUT',
                    body: JSON.stringify(dataForm),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(resData => {
                    if (resData.ok) {
                        let trN = document.createElement("tr");
                        trN.innerHTML = `
                                            <td>${dataForm.nombre}</td>
                                            <td>${dataForm.fecha}</td>
                                            <td>${dataForm.tipo}</td>
                                            <td>${dataForm.invaluable}</td>
                                            <td>
                                                <a href="#" class="delete"> Delete </a> 
                                                <a href="#" class="update"> Update </a>
                                            </td>`;

                        tbody.replaceChild(trN, tr);
                        trN.getElementsByClassName("delete")[0].addEventListener("click", (event) => {
                            deleteGet(event, data, trN, tbody);
                        });
                        trN.getElementsByClassName("update")[0].addEventListener("click", (event) => {
                            update(trN, tbody, data);
                        });
                    } else {
                        document.getElementsByClassName("errors")[0].innerText = "No se puede actulizar";
                    }
                });
        });
    },
    deleteGet: (event, data, tr, tbody) => {
        event.preventDefault();
        fetch('/api/get/' + data._id, {
                method: 'DELETE'
            }).then(res => res.json())
            .then(res => {
                if (res.ok) {
                    tbody.removeChild(tr);
                } else {
                    document.getElementsByClassName("errors")[0].innerText = "No se pudo elminiar";
                }
            })
    },
    submitGet: (event, addRow) => {
        event.preventDefault();
        let data = {
            nombre: document.postForm.nombre.value,
            fecha: document.postForm.fecha.value,
            tipo: document.postForm.tipo.value,
            invaluable: document.postForm.invaluable.value
        };
        fetch('/api/get', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then(_data => {
                if (_data.ok) {
                    addRow(_data.guardado);
                } else {
                    document.getElementsByClassName("errors")[0].innerText = "No se pudo guardar";
                }
            });
    },
    loadContent: function () {
        fetch('/api/get', {
                method: 'GET'
            }).then(res => {
                return res.json()
            })
            .then(data => {

                if (data.ok) {
                    data.get.forEach(element => {
                        this.addRow(element);
                    });
                }
            })
    }
}