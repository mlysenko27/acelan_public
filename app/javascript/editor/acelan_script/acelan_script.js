import ace from '../../ace/ace.js'
require('../../../../vendor/assets/javascript/ace/ext-language_tools')
import {Suggestions} from '../helpers/suggestions'

class AcelanScript {

    constructor({data}){
        this.data = data;
    }
    static get toolbox() {
        return {
            title: 'Script',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">\n' +
                '  <path fill-rule="evenodd" d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" clip-rule="evenodd" />\n' +
                '</svg>'


        }
    }
    render(){

     const scriptInput = document.createElement('div');
        scriptInput.style.weight = '100em';
        scriptInput.style.zIndex = '0';
        scriptInput.classList.add('h-48');

        ace.config.set('basePath', '/vendor/ace/')
        const editor = ace.edit(scriptInput);
        editor.getSession().setMode('ace/mode/ruby');
        editor.setTheme("ace/theme/github");
        ace.require("ace/ext/language_tools");
        Suggestions().then(suggestions=>
            editor.setOptions({
                enableBasicAutocompletion:
                    [{
                    getCompletions: (editor, session, pos, prefix, callback) => {
                        callback(null, suggestions);
                    },
                }],
                enableLiveAutocompletion: true,
                showFoldedAnnotations: true,
            }));

        if (this.data.script){
            editor.setValue(this.data.script)
        }

        return scriptInput;
    }
    save(blockContent){
        return {
            script: blockContent.innerText
        }
    }
}
export {AcelanScript}

