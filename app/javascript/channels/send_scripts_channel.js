import consumer from "./consumer"

consumer.subscriptions.create("SendScriptsChannel", {
    // Called once when the subscription is created.
    initialized() {

    },

    connected() {
        // Called when the subscription is ready for use on the server
        console.log("SendScriptsChannel connected")
    },

    disconnected() {
        // Called when the subscription has been terminated by the server
        console.log("SendScriptsChannel disconnected")
    },

    received(data) {
        // Добраться до editor
        // и если status == success, то нужно нарисовать новый компонент:
        // editor.render(savedData)

        if (window.editor != null) {
            window.editor.save().then(savedData => {
                cleanScript(savedData)

                if ((data.status === "up_error" || data.status === "up_success") ) {
                    if (savedData.blocks[0].type !== "textResult" || savedData.blocks[0].type !== "errorResult")
                        savedData.blocks.unshift(data.result)
                } else {
                    let indexPDB
                    if ((indexPDB = savedData.blocks.findIndex(x => x.type === "progressDisplayBlock")) !== -1)
                    {
                        let pdb = savedData.blocks[indexPDB].data.progress?.split(' ')
                        let count = parseInt(pdb[2])
                        let err = parseInt(pdb[5])
                        if (data.result.type === "errorResult"){
                            err += 1
                        }
                        savedData.blocks[indexPDB].data.progress = `В очереди ${count-1} задач, ошибок ${err}`
                    }

                    savedData = addResult(savedData, data.result, data.key)
                }
                window.editor.render(savedData)
            })
        }
        /// отчищает данные скрипта от индексов строк
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

        function addResult(savedData, result, key) {
            // Находим по ключу Индекс скрипта
            const scriptId = savedData.blocks.findIndex(x => x.id === key)
            //Если скрипт последний блок, то вставляем результат в конце
            if (scriptId === savedData.blocks.length-1) {
                savedData.blocks.push( result)
            } // Иначе вставляем на место следующего полсле скрипта блока
            else {
                const deleteCount = savedData.blocks[scriptId+1].type === result.type ? 1 : 0
                savedData.blocks.splice(scriptId+1, deleteCount, result)
            }
            return savedData
        }
    }
})
