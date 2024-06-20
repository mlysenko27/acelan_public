import {Controller} from "@hotwired/stimulus"
import EditorJS from '@editorjs/editorjs';
import {AcelanScript} from "../editor/acelan_script/acelan_script";
import {NetworkHelper} from "../editor/helpers/network_helper";
import {GraphicResult} from "../editor/acelan_script/graphic_result";
import {ErrorResult} from "../editor/acelan_script/error_result";
import {TextResult} from "../editor/acelan_script/text_result";
import {ProgressDisplayBlock} from "../editor/acelan_script/progress_display_block";
import {DemoResult} from "../editor/acelan_script/demo_result";

export default class extends Controller {
    connect() {

    }

    initialize() {
        const configuration = {
            holder: 'editor',
            tools: {
                script: AcelanScript,
                graphicResult: GraphicResult,
                errorResult: ErrorResult,
                textResult: TextResult,
                progressDisplayBlock: ProgressDisplayBlock,
                demoResult: DemoResult
            },
            data: {
                blocks: []
            }
        }
        this.editor = new EditorJS(configuration)
        window.editor = this.editor;
    }

    run() {
        //TODO
        // 1. Some actions can be performed on client
        // 2. We may need internal data structure on client
        // 3. We don't need to send all parts of the script to the server
        this.editor.save().then(savedData => {
            // This is a demo
            // We will remove all blocks except for script blocks:
            savedData.blocks = savedData.blocks.filter(x=> x.type==='script')
            // Now we will run scripts on server
            const networkHelper = new NetworkHelper()
            const promises = savedData.blocks.map(block => {
                return networkHelper.performScript(block.data.script, block.id)
            })


            //TODO Control sections IDs
            Promise.all(promises)
                .then((results) => {
                    const count = results.length

                    this.editor.save().then(savedData => {
                        let progressDB = {
                            type: 'progressDisplayBlock',
                            data: {
                                progress: `В очереди ${count} задач, ошибок 0`
                            }
                        }
                        let indexPDB
                        if ((indexPDB = savedData.blocks.findIndex(x => x.type === "progressDisplayBlock")) === -1) {
                            savedData.blocks.unshift(progressDB)
                        } else {
                            savedData.blocks[indexPDB].data.progress = `В очереди ${count} задач, ошибок 0`
                        }
                        cleanScript(savedData)

                        this.editor.render(savedData)
                    })
                    // alert(`В работе ${count} задач`)
                })
        })
    }

}
function cleanScript(savedData) {
    let savedDataBlocksLength = savedData.blocks.length
    for (let j = 0; j < savedDataBlocksLength; j++) {
        let block = savedData.blocks.shift()
        if (block.type === 'script') {
            let a = block.data.script.split('\n')
            let z = a.length;
            for (let i = 0; i < z; i++) {
                if (parseInt(a[i])) {// Если элемент массива - целое число
                    a.splice(i, 1)//то удаляем элемент по индексу
                    i -= 1;
                }
            }
            block.data.script = a.join('\n')
            savedData.blocks.push(block)
        } else {
            savedData.blocks.push(block)
        }
    }
}