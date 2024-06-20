class TextResult{
    constructor({data}) {
        this.data = data
    }
    render(){
        const textResult = document.createElement('label')
        textResult.innerText = this.data?.text
        return textResult;
    }
    save(blockContent){
        return {
            text: blockContent.innerText
        }
    }
}
export {TextResult}