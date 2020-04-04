console.log('Loaded.');

readState();

let sortable = Sortable.create(getContainer(), {
    animation: 250,
    onEnd: function (e) {
        saveState();
    }
});

function readState() {
    const items = window.localStorage.getItem('items');

    if (!items) {
        console.log('Saved state not found.');
        return;
    }

    const parsedItems = JSON.parse(items);

    let container = document.createElement('div');
    container.className = 'items';

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

function addItem(e) {
    e.preventDefault();

    let el = document.createElement('div');

    el.className = 'item';
    el.id = `div${elementsCount() + 1}`;
    el.innerHTML = `Div #${elementsCount() + 1}`;

    getContainer().appendChild(el);

    saveState();
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