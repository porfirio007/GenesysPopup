document.addEventListener('DOMContentLoaded', function () {
    loadItems();
    document.getElementById('addButton').addEventListener('click', addItem);
});

function addItem() {
    var itemInput = document.getElementById('itemInput');
    var newItem = itemInput.value;

    if (newItem.trim() !== '') {
        saveItem(newItem, function() {
            itemInput.value = '';
            loadItems();
        });
    }
}

function saveItem(item, callback) {
    chrome.storage.sync.get({ items: [] }, function (result) {
        var items = result.items;
        items.push(item);
        chrome.storage.sync.set({ items: items }, callback);
    });
}

function loadItems() {
    var itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    chrome.storage.sync.get({ items: [] }, function (result) {
        var items = result.items;
        items.forEach(function (item) {
            var li = document.createElement('li');
            li.textContent = item;

            var deleteIcon = document.createElement('span');
            deleteIcon.innerHTML = '<img src="delete-icon.png" alt="Elimina" class="delete-icon">';

            deleteIcon.addEventListener('click', function() {
                deleteItem(item);
            });

            li.appendChild(deleteIcon);
            itemList.appendChild(li);
        });
    });
}


function deleteItem(item) {
    chrome.storage.sync.get({ items: [] }, function (result) {
        var items = result.items;
        var index = items.indexOf(item);
        if (index !== -1) {
            items.splice(index, 1);
            chrome.storage.sync.set({ items: items }, loadItems);
        }
    });
}
