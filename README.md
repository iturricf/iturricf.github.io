# DaD Challenge

Simple drag-and-drop challenge implemented with both, VanillaJS and [sortableJS](https://sortablejs.github.io/Sortable/) lib.

```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Drag and drop challenge</title>
  </head>

  <body>
    <div class="items">
      <div class="item" id="div1">Div #1</div>
      <div class="item" id="div2">Div #2</div>
      <div class="item" id="div3">Div #3</div>
      <div class="item" id="div4">Div #4</div>
      <div class="item" id="div5">Div #5</div>
    </div>

    <div class="actions">
      <button class="action" id="add">Add</button>
    </div>
  </body>

</html>
```

### Tasks

1. Make .item elements sortable using the drag-and-drop
2. Make the button "Add" that will add new .item elements
3. After each user action, save current application state
4. On page reload, restore saved application state

#### Bonus task:

1. Make sure that .item elements are sortable using mobile device

### Hints

1. You can use any third-party libraries
2. You can use localStorage to store application state

## Description

I've tried to implement this challenge as clean as possible without adding anything fancy.

First approach using SortableJS wich enables support for mobile devices.

Then I switched to VanillaJS and implemented sortable drag-and-drop elements with some styling improvements. Currently without mobile devices support.

1. See code with [SortableJS](https://github.com/iturricf/drag-and-drop/commits/with-sortable-js)
2. See [VanillaJS](https://github.com/iturricf/drag-and-drop/commits/master) impl.