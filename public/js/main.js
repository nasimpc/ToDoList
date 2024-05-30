var body = document.getElementById('a');
body.addEventListener('click', editItem);

async function saveToStorage(e) {
    e.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;

    let data = {
        title: title,
        description: description,
    }
    todo_form.reset();
    const token = localStorage.getItem('token')
    const listDetails = await axios.post("../todo/add-list", data, { headers: { "Authorization": token } })
    showNewListOnScreen(listDetails.data.newListDetails);
}
window.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem('token');
    const getLists = await axios.get("../todo/get-lists", { headers: { "Authorization": token } })

    for (var i = 0; i < getLists.data.allLists.length; i++) {
        var list = showNewListOnScreen(getLists.data.allLists[i]);
        const getTasks = await axios.get(`../todo/get-tasks/${getLists.data.allLists[i].id}`, { headers: { "Authorization": token } });
        for (var j = 0; j < getTasks.data.allTasks.length; j++) {
            var div = document.createElement('div');
            div.id = getTasks.data.allTasks[j].id;
            div.appendChild(document.createTextNode(getTasks.data.allTasks[j].task));

            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-danger float-right delete_task';
            deleteBtn.appendChild(document.createTextNode('X'));
            div.appendChild(deleteBtn);

            if (getTasks.data.allTasks[j].done) {
                div.className = "card bg-secondary";
                list.appendChild(div);
            }
            else {
                div.className = "card bg-warning-subtle";

                var doneBtn = document.createElement('button');
                doneBtn.className = 'btn btn-sm btn-success float-right task_done';
                doneBtn.appendChild(document.createTextNode('Done'));
                div.appendChild(doneBtn);

                list.appendChild(div);
            }

        }
    }
})


function showNewListOnScreen(obj) {
    var description = document.createTextNode(obj['description']);
    var title = document.createElement('h3');
    title.innerHTML = obj['title'];

    var input = document.createElement('input');
    input.id = 'task';
    input.className = "form-control";
    var btn = document.createElement('button');
    btn.className = 'btn btn-primary add';
    btn.appendChild(document.createTextNode('create'));

    var a = document.querySelector('#a');
    var b = document.querySelector('#b');

    var div0 = document.createElement('div');
    div0.className = "card col-4 bg-info-subtle";
    var div = document.createElement('div');
    div.className = "card-body";
    div.id = obj.id;

    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(input);
    div.appendChild(btn);

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger float-right delete_list';
    deleteBtn.appendChild(document.createTextNode('X'));
    div.appendChild(deleteBtn);

    div.appendChild(document.createElement("br"));
    div0.appendChild(div);

    a.insertBefore(div0, b);
    return div
}
// Remove item
async function editItem(e) {
    if (e.target.classList.contains('add')) {
        var task = e.target.previousSibling.value;
        var listId = e.target.parentNode.id;
        let data = { task, listId }
        const token = localStorage.getItem('token')
        const taskDetails = await axios.post("../todo/add-task", data, { headers: { "Authorization": token } });
        var list = e.target.parentNode;

        var div = document.createElement('div');
        div.className = "card bg-warning-subtle";

        div.id = taskDetails.data.newTaskDetails.id;
        div.appendChild(document.createTextNode(task));

        var deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger float-right delete_task';
        deleteBtn.appendChild(document.createTextNode('X'));

        var doneBtn = document.createElement('button');
        doneBtn.className = 'btn btn-sm btn-success float-right task_done';
        doneBtn.appendChild(document.createTextNode('Done'));
        div.appendChild(doneBtn);

        div.appendChild(deleteBtn);
        list.appendChild(div);
    }
    else if (e.target.classList.contains('task_done')) {
        var div = e.target.parentElement;
        e.target.parentElement.removeChild(e.target);
        div.className = "card bg-secondary";
        var id = div.id;
        axios.post(`../todo/done-task/${id}`);

    }
    else if (e.target.classList.contains('delete_list')) {

        if (confirm('Are You Sure?')) {
            const token = localStorage.getItem('token')
            var div = e.target.parentElement.parentElement;
            body.removeChild(div);
            var id = e.target.parentElement.id;
            axios.delete(`../todo/delete-list/${id}`, { headers: { "Authorization": token } });
        }
    }
    else if (e.target.classList.contains('delete_task')) {

        if (confirm('Are You Sure?')) {
            const token = localStorage.getItem('token')
            var div = e.target.parentElement;
            div.parentElement.removeChild(div);
            var id = e.target.parentElement.id;
            axios.delete(`../todo/delete-task/${id}`, { headers: { "Authorization": token } });
        }
    }

}
