'use strict';

function menu() {
    this.selector = 'menu-section';
    this.class = 'active';
}

menu.prototype.init = function() {
    this.hideSections().addEventHandlers();

    return this;
};

menu.prototype.hideSections = function() {
    let $this = this;

    $this
        .getItems()
        .forEach(function (item, index) {
            let sectionsIdentifier = item.getAttribute($this.selector);
            let section = document.getElementById(sectionsIdentifier);
            item.classList.remove($this.class);
            if (section) {
                section.style.display = 'none';
            }
        }
    );

    return this;
};

menu.prototype.addEventHandlers = function() {
    let $this = this;

    document.querySelector('.mini-menu').addEventListener('click',
        function() {
            this.classList.toggle('active');
            document.querySelector('.toggle-btn').classList.toggle('active');
        });

    document.querySelectorAll('.item>.sub-menu, .item>.sub-menu').forEach(function(item) {
        item.parentElement.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            this.classList.toggle('active');
        });
    });

    $this
        .getItems()
        .forEach(function(item, index) {
                item.addEventListener('mouseover', function() {
                    $this.hideSections();
                    item.classList.add($this.class);
                    let sectionsIdentifier = this.getAttribute('menu-section');
                    let section = document.getElementById(sectionsIdentifier);
                    if (section) {
                        item.classList.add($this.class);
                        section.style.removeProperty('display');
                    }
                });
            }
        );

    return this;
};

menu.prototype.getItems = function() {
    return document.querySelectorAll('['+this.selector+']');
};

// init the menu
new menu().init();