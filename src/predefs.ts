


export class Predef {
    constructor(public readonly name: string, public readonly code: string) {
    }
}


const EmitterCode = new Predef("Emitter", `
function createEmitter() {
    var handlers = undefined
    return {
        subscribe: (handler) => {
            let o = {}
            o.next = handlers
            o.handler = handler
            handlers = o
        },

        emit: (e) => {
            for (let cur = handlers; cur; cur = cur.next) {
                cur.handler(e)
            }
        }
    }
}

exports.createEmitter = createEmitter
`)

const EmitterInstantiationCode = new Predef("Emitter instantiation", `
function createEmitter() {
    var handlers = undefined
    return {
        subscribe: (handler) => {
            let o = {}
            o.next = handlers
            o.handler = handler
            handlers = o
        },

        emit: (e) => {
            for (let cur = handlers; cur; cur = cur.next) {
                cur.handler(e)
            }
        }
    }
}

const emitter = createEmitter()
let result = "Hello World"
emitter.subscribe((e) => {result = e})

emitter.emit("Reset")
result = undefined
emitter.emit("Reset again")

exports.result = result
`)

const StackCode = new Predef("Stack", `
function createStack() {
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
}

exports.createStack = createStack
`)

const IdentityCode = new Predef("Identity", `
exports.id = function(anything) {
    return anything
}
`)

const FoldCode = new Predef("Fold", `
function fold(f, it, init) {
    let temp = init
    while (it.hasNext()) {
        temp = f(temp, it.next())
    }
    return temp
}

exports.fold = fold
`)

const EndlessRecursion = new Predef("Endless recursion", `
function f() {
    return f()
}
exports.noEnd = f
`)

export const predefs: Predef[] = [EmitterCode, EmitterInstantiationCode, StackCode, IdentityCode, FoldCode, EndlessRecursion]
