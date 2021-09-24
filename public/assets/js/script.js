window.onload = function () {
    app.Count(app.tasks);
}

var app = new function () {
    var id, name, director, publishDate, category, duration;
    this.tasks = [];

    this.Ready = () => {
        id = document.getElementById("id");
        name = document.getElementById("name");
        director = document.getElementById("director");
        publishDate = document.getElementById("publishDate");
        category = document.getElementById("category");
        duration = document.getElementById("duration");
    }

    this.FetchAll = () => {
        var data = '';
        if (this.tasks.length > 0) {
            for (let i = 0; i < this.tasks.length; i++) {
                let object = this.tasks[i];
                data += '<tr>';
                data += '<td>' + (i + 1) + '</td>';
                data += '<td>' + object.name + '</td>';
                data += '<td>' + object.director + '</td>';
                data += '<td>' + object.publishDate + '</td>';
                data += '<td>' + object.category + '</td>';
                data += '<td>' + object.duration + '</td>';
                data += '<td class="text-center"><a role="button" onClick="app.Edit(' + i + ')"><i class="edit border-0 text-warning fas fa-cog"></i></a></td>';
                data += '<td class="text-center"><a role="button" onClick="app.Delete(' + i + ')"><i class="delete border-0 text-danger fas fa-trash-alt"></i></a></td>';
                data += '</tr>';
            }
        }
        this.Count(this.tasks);
        document.getElementById('task').innerHTML = data;
    };

    this.Add = () => {
        this.Ready();
        var object = {
            name: name.value.trim(),
            director: director.value.trim(),
            publishDate: publishDate.value,
            category: category.value,
            duration: duration.value.trim()
        }
        if (object) {
            if (id.value !== "") {
                this.tasks[id.value] = object;
                id.value = "";
                name.value = "";
                director.value = "";
                publishDate.value = "";
                category.value = "";
                duration.value = "";
                this.FetchAll();
            } else {
                this.tasks.push(object);
                name.value = "";
                director.value = "";
                publishDate.value = "";
                category.value = "";
                duration.value = "";
                this.FetchAll();
            }
        }
    };

    this.Edit = (idEdit) => {
        this.Ready();
        var object = this.tasks[idEdit];
        id.value = idEdit;
        name.value = object.name;
        director.value = object.director;
        publishDate.value = object.publishDate;
        category.value = object.category;
        duration.value = object.duration;
    };

    this.Delete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            var object = this.tasks[id];
            this.tasks.splice(object, 1);
        }
        this.FetchAll();
    };

    this.Count = (data) => {
        var count = document.getElementById("counter");
        // if (data.length) {
        //     count.innerHTML = data.length === 1 ? data.length + ' Record' : data.length + ' Records';
        // } else {
        //     this.count.innerHTML = "No Records";
        // }
    };
}()