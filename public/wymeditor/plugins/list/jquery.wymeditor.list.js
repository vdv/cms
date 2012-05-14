/**
 * Copyright (c) 2011 PolicyStat LLC.
 * MIT licensed (MIT-license.txt)
 *
 * This plugin adds the ability to use tab and shift+tab to indent/outdent
 * lists, mimicking a user's expected behavior when inside an editor.
 *
 * @author Wes Winham (winhamwr@gmail.com)
 */

function ListPlugin(options, wym) {
    this._options = jQuery.extend({}, options);
    this._wym = wym;

    this.init();
}

/**
 * Construct and return a table objects using the given options object.
 *
 * @param options The configuration object.
 */
WYMeditor.editor.prototype.list = function (options) {
    var listPlugin = new ListPlugin(options, this);
    this.listPlugin = listPlugin;

    return listPlugin;
};

ListPlugin.prototype.init = function() {
    this._wym.listPlugin = this;

    this.bindEvents();
};

ListPlugin.prototype.bindEvents = function() {
    var listPlugin = this;
    var wym = this._wym;

    // Bind a key listener so we can handle tabs
    // With jQuery 1.3, live() can be used to simplify handler logic
    $(wym._doc).bind('keydown', listPlugin.handleKeyDown);
};

/**
 * Handle any tab presses when inside list items and indent/outdent.
 */
ListPlugin.prototype.handleKeyDown = function(evt) {
   //'this' is the editor._doc
    var wym = WYMeditor.INSTANCES[this.title];
    var listPlugin = wym.listPlugin;

    var container = wym.selected();
    var name = container.tagName.toLowerCase();
    // We only care about tabs when we're inside a list
    if (name != "li") {
        return null;
    }

    // Handle tab presses
    if (evt.keyCode == WYMeditor.KEY.TAB) {
        if (evt.shiftKey) {
            wym.exec(WYMeditor.OUTDENT);
            return false; // Short-circuit normal tab behavior
        } else {
            wym.exec(WYMeditor.INDENT);
            return false;
        }
    }

    return null;
};
