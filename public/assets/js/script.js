function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, navLink;
    
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        if (tabcontent[i].style.display == "block")
            tabcontent[i].style.display = "none";
    }
    
    navLink = document.getElementsByClassName("nav-link");
    for (i = 0; i < navLink.length; i++) {
        navLink[i].className = navLink[i].className.replace(" active", "");
    }
    
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// function clickButton(tabName) {
//     tablinks = document.getElementsByClassName("tablinks");
//     for (i = 0; i < tablinks.length; i++) {
//         if (tablinks[i].textContent == tabName) {
//             tablinks[i].click();
//         }
//     }
// }

window.onload = function() {
    app.Count(app.tasks);
}

var app = new function() {
    var id, name, director, publishDate, category, duration;
    this.el = document.getElementById('task');
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
                data += '<td><span onclick="app.Edit(' + i + ')"><i class="edit border-0 text-warning fas fa-cog"></i></span></td>';
                data += '<td><span onclick="app.Delete(' + i + ')"><i class="delete border-0 text-danger fas fa-trash-alt"></i></span></td>';
                data += '</tr>';
            }
        }
        this.Count(this.tasks);
        return this.el.innerHTML = data;
    }
    this.Add = () => {
        this.Ready();
        var object = {
            name : name.value.trim(),
            director : director.value.trim(),
            publishDate : publishDate.value,
            category : category.value,
            duration : duration.value.trim()
        }
        if (object) {
            if (id.value != "") {
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
        if (confirm('Are you sure you want to delete this record?')) {
            var object = this.tasks[id];
            this.tasks.splice(object, 1);
        }
        this.FetchAll();
    };
    this.Count = (data) => {
        var count = document.getElementById("counter");
        var name = 'Records';
        if (data.length) {
            if (data.length == 1) {
                name = 'Record';
            }
            count.innerHTML = data.length + ' ' + name;
        } else {
            count.innerHTML = 'No ' + name;
        }
    };
}