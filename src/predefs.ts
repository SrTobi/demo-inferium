


export class Predef {
    constructor(public readonly name: string, public readonly code: string) {
    }
}


const StackCode = new Predef("Stack", `
var elements = undefined
return {
    push: (e) => {
        elements = {
            next: elements,
            item: e
        }
    },

    pop: () => {
        var result = elements.item
        elements = elements.next
        return result
    }
}
`)

const StackInnerCode = new Predef("Stack with inner", `
var elements = undefined
return {
    push: (e) => {
        elements = {
            next: elements,
            item: e
        }
    },

    pop: () => {
        var result = elements.item
        elements = elements.next
        return result
    },

    inner: () => {
        return elements
    }
}
`)

const StackInstantiationCode = new Predef("Stack instantiation", `
var createStack = () => {
    var elements = undefined
    return {
        push: (e) => {
            elements = {
                next: elements,
                item: e
            }
        },

        pop: () => {
            var result = elements.item
            elements = elements.next
            return result
        },

        top: () => {
            return elements.item
        }
    }
}

var stack = createStack()
stack.push(3)
stack.push("test")

var result = {}
result.a = stack.pop()
result.b = stack.top()
result.c = stack.pop()
return result
`)

const IdentityCode = new Predef("Identity", `
return (anything) => {
    return anything
}
`)


const ObjectFilteringCode = new Predef("Object filtering", `
var a = { cond: true, prop: "true" }
var b = { cond: false, prop: "false" }

// rand is a global variable that is either true or false
if (rand) {
  var x = a
} else {
  x = b
}

// here, x can be a or b
var cond = x.cond
if (cond) {
  // here, x can only be a
  x.prop = "haha"
}

return x.prop
`)

const FoldCode = new Predef("Fold", `
return (folder, list, init) => {
    // there are no lists :) and also no loop and no recursion (yet)
    // so do it kinda manually
    var acc = folder(init, list)
    return folder(acc, list)
}
`)

export const predefs: Predef[] = [StackCode, StackInnerCode, StackInstantiationCode, IdentityCode, ObjectFilteringCode, FoldCode]
