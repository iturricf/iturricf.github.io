console.log('Loaded.');

readState();

// Avoid markers issue when dropping | cancelling drop elements outside element container
document.addEventListener('dragend', function (e) {
    e.preventDefault();
    removeMarkers();
});

function addItem(e) {
    e.preventDefault();

    let el = document.createElement('div');

    el.className = 'item';
    el.id = `div${elementsCount() + 1}`;
    el.innerHTML = `Div #${elementsCount() + 1}`;
    el.setAttribute('draggable', 'true');
    el.setAttribute('ondragstart', 'drag(event)');
    el.setAttribute('ondragenter', 'dragEnter(event)');

    getContainer().appendChild(el);

    saveState();
}

function drag(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function drop(e) {
    e.preventDefault();

    const id = e.dataTransfer.getData('text/plain');
    const el = document.getElementById(id);

    const marker = findMarker();

    if (marker) {
        getContainer().replaceChild(el, marker);
    } else {
        getContainer().appendChild(el);
    }

    saveState();

    removeMarkers();
}

function dragEnter(e) {
    // Remove existing markers as markers are not removed on dragleave
    removeMarkers();

    // Insert marker
    insertMarker(e.target);
}

function enableDrop(e) {
    e.preventDefault();
}

function readState() {
    const items = window.localStorage.getItem('items');

    if (!items) {
        console.log('Saved state not found.');
        return;
    }

    const parsedItems = JSON.parse(items);

    let container = document.createElement('div');
    container.className = 'items';
    container.setAttribute('ondragover', 'enableDrop(event)');
    container.setAttribute('ondrop', 'drop(event)');

    for (const item in parsedItems) {
        let el = unserializeElement(parsedItems[item]);
        container.appendChild(el);
    }

    let oldContainer = getContainer();

    oldContainer.parentNode.replaceChild(container, oldContainer);
}

function saveState() {
    let elements = getElements(getContainer());

    let container = [];

    for (var i = 0; i < elements.length; i++) {
        container.push(serializeElement(elements[i]));
    }

    window.localStorage.setItem('items', JSON.stringify(container));
}

function serializeElement(el) {
    let object = {};
    object.tagName = el.tagName;
    object.innerHTML = el.innerHTML;

    for (var i = 0; i < el.attributes.length; i++) {
        object[el.attributes[i].name] = el.attributes[i].value;
    }

    return object;
}

function unserializeElement(object) {
    let el = document.createElement(object.tagName);
    el.innerHTML = object.innerHTML;

    delete object.tagName;
    delete object.innerHTML;

    for (const prop in object) {
        el.setAttribute(prop, object[prop]);
    }

    return el;
}

function elementsCount() {
    return getElements(getContainer()).length;
}

function getElements(container) {
    return container.getElementsByClassName('item');
}

function getContainer() {
    let container = document.getElementsByClassName('items');

    if (container.length < 1) {
        throw new Error('Container not found');
    }

    return container[0];
}

function findMarker() {
    const markers = getContainer().getElementsByClassName('marker');

    return markers[0] || false;
}

function insertMarker(target) {
    let marker = document.createElement('span');
    marker.className = 'marker';

    getContainer().insertBefore(marker, target);
}

function removeMarkers() {
    let markers = getContainer().getElementsByClassName('marker');

    for (var i = 0; i < markers.length; i++) {
        markers[i].remove();
    }
}