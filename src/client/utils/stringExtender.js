String.prototype.removeChars = function(startChar, endChar) {
    const startIndex = this.indexOf(startChar);
    if (startIndex === -1) return this;

    const endIndex = this.indexOf(endChar);
    if (endIndex === -1) return this;

    const oldString = new String(this).toString();

    return this.slice(0, startIndex) + oldString.slice(endIndex + 1);
};
