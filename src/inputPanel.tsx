import * as React from "react";
import * as ReactDOM from "react-dom";
import * as utils from './utils';
import * as Visual from './visuals';
import {observable} from 'mobx'
import * as mobx from 'mobx-react'
import MonacoEditor from 'react-monaco-editor';
import {predefs} from './predefs'
import './inferium-web-fastopt'

declare namespace Inferium {
    function generateTypeDefinition(code: string): string
} 



@mobx.observer
export class InputPanel extends React.Component<{}, {}> {

    @observable
    private code: string

    @observable
    private result: string

    @observable
    private error: string | undefined = undefined

    @observable
    private example: string

    constructor() {
        super({})

        this.code = predefs[0].code
    }

    private infer(code: string) {
        this.error = ""
        try {
            this.result = Inferium.generateTypeDefinition(code)
        } catch(e) {
            this.error = e.toString()
        }
    }

    private onChangeExample(ev: React.ChangeEvent<HTMLSelectElement>) {
        const value = ev.target.value

        this.example = value
        const predef = predefs.find(p => p.name == value)

        if (predef) {
            this.code = predef.code
        }
    }

    render() {
        return (
            <div>
                <div className="panel panel-default config-panel">
                    <div className="panel-body collapse in">
                        <MonacoEditor
                                height={400}
                                width="100%"
                                language="javascript"
                                value={this.code}
                                onChange={code => this.code = code}
                                />
                    </div>
                </div>
                <div style={{textAlign: "center"}}>
                    Be careful... recursion does not work at the moment... this is an alpha version after all 
                </div>
                <div className="panel panel-default config-panel">
                    <span>
                        <button type="button" onClick={() => this.infer(this.code)}>Infer</button>
                        <span className="error-box"> {this.error? "Error: " + this.error : ""}</span>
                    </span>

                    <span style={{float: "right"}}>
                        <span>Examples: </span>
                        <select onChange={this.onChangeExample.bind(this)}>
                            {predefs.map(predef => (<option value={predef.name}>{predef.name}</option>))}
                        </select>
                    </span>
                </div>
                <div className="panel panel-default config-panel">
                    <div className="panel-body collapse in">
                        <MonacoEditor
                                height={400}
                                width="100%"
                                language="typescript"
                                value={this.result}
                                options={{
                                    readOnly: true
                                }}
                                />
                    </div>
                </div>
            </div>
        );
    }

}