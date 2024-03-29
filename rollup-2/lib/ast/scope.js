class Scope {
  constructor(options = {}) {
    this.name = options.name;//作用域起个名字，没有什么用，只是帮助 大家认识的
    this.parent = options.parent;//父作用域
    this.depth = this.parent ? this.parent.depth + 1 : 0 // 作用域层级
    this.names = options.params || [];//此作用内有哪些变量
  }

  add(name, isBlockDeclaration) {
    if (!isBlockDeclaration && this.isBlockScope) {
      this.parent.add(name, isBlockDeclaration)
    } else {
      this.names.push(name)
    }
  }

  findDefiningScope(name) {
    if (this.names.includes(name)) {
      return this;
    }
    if (this.parent) {
      return this.parent.findDefiningScope(name);
    }
    return null;
  }
}

module.exports = Scope;
