var body = document.getElementById('a');
body.addEventListener('click', editItem);
form_submit.addEventListener('click', shareList);
var currListId;

async function saveToStorage(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    let data = { title, description }
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
    var a = document.querySelector('#a');
    var b = document.querySelector('#b');

    var div0 = document.createElement('div');
    div0.className = "card col-4 bg-info-subtle";

    div0.innerHTML = `<div class="card-body" id="${obj.id}"> 
    <h3>${obj['title']}</h3>
    ${obj['description']}
    <button class="btn btn-primary share" data-bs-toggle="modal" data-bs-target="#group_model"
    aria-controls="group_model" >Share</button>
    <input id="task" class="form-control"></input>
    <button class="btn btn-primary add">create</button>
    <button class="btn btn-sm btn-danger float-right delete_list">X</button><br>
    </div>`;

    a.insertBefore(div0, b);
    return div0.firstChild
}
// Remove item
async function editItem(e) {
    if (e.target.classList.contains('add')) {
        var task = e.target.previousSibling.previousSibling.value;
        var listId = e.target.parentNode.id;
        let data = { task, listId }
        const token = localStorage.getItem('token')
        const taskDetails = await axios.post("../todo/add-task", data, { headers: { "Authorization": token } });
        var list = e.target.parentNode;

        var div = document.createElement('div');
        div.className = "card bg-warning-subtle";
        div.id = taskDetails.data.newTaskDetails.id;
        div.innerHTML = `${task}
        <button class="btn btn-sm btn-danger float-right delete_task">X</button>
        <button class="btn btn-sm btn-success float-right task_done">Done</button>
        `;

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
    else if (e.target.classList.contains('share')) {
        try {
            let status;
            const token = localStorage.getItem('token')
            var listId = e.target.parentNode.id;
            currListId = listId;
            user_list.parentElement.classList.remove('d-none');
            const usersResponse = await axios.get('user/get-users', { headers: { "Authorization": token } });
            const userApi = await axios(`todo/get-list-users?listId=${listId}`);
            const listUsers = userApi.data.users;
            const usersId = new Set(listUsers.map(item => item.id));
            user_list.innerHTML = "";
            const { users } = usersResponse.data;
            users.forEach((user) => {
                if (usersId.has(user.id)) { status = "checked" } else { status = "" }
                user_list.innerHTML += `                                    
                    <li class="list-group-item  d-flex  justify-content-between">
                        <div class="d-flex  align-items-center justify-content-between">
                            <img src="https://picsum.photos/seed/${Number(user.id) + 100}/200" alt="Profile Picture"
                                class="rounded-circle me-3" style="width: 35px; height: 35px;">
                            <h6><strong class="mb-1">${user.name}</strong></h6>
                        </div>
                        <input type="checkbox" class="form-check-inline" name="users" value="${user.id}" ${status}>
                    </li>`
            })


        } catch (err) {
            console.log(err);
            alert(err.response.data.message);
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
async function shareList(e) {
    try {
        const token = localStorage.getItem('token')
        let listId = currListId;
        e.preventDefault();
        const sharedUsers = Array.from(user_list.querySelectorAll('input[name="users"]:checked'))
            .map(checkbox => checkbox.value);
        const data = { sharedUsers }
        await axios.post(`todo/share-list?listId=${listId}`, data, { headers: { "Authorization": token } });
        alert("List shared")
        create_group_form.reset();
        var myModalEl = document.getElementById('group_model');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
    } catch (err) {
        console.log(err);
        alert(err.response.data.message);
    }
}

