chrome.storage.sync.get({ items: [] }, function (result) {
    var items = result.items;
    var variabile = 'XXXX';

    if (items.includes(variabile)) {
        console.log('pippo');
    } else {
        console.log('lello');
    }
});
